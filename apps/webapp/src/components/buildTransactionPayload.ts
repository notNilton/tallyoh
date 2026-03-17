import type { Transaction } from './TransactionModal';

interface BuildTransactionPayloadParams {
  isEditing: boolean;
  initialData?: Transaction | null;
  classification: 'COMMON' | 'FUEL' | 'MAINTENANCE';
  vehicleFuelCategoryId: string | null;
  amountInCents: number;
  litersInMililiters: number;
  date: string;
  isExpense: boolean;
  isRecurring: boolean;
  totalInstallments: number;
  hasPaidInstallments: boolean;
  paidInstallments: number;
  categoryId: string;
  accountId: string;
  vehicleId: string;
  currentKm: number;
  fuelType: string;
  description: string;
}

export function buildTransactionPayload({
  isEditing,
  initialData,
  classification,
  vehicleFuelCategoryId,
  amountInCents,
  litersInMililiters,
  date,
  isExpense,
  isRecurring,
  totalInstallments,
  hasPaidInstallments,
  paidInstallments,
  categoryId,
  accountId,
  vehicleId,
  currentKm,
  fuelType,
  description,
}: BuildTransactionPayloadParams) {
  const actualAmount = amountInCents / 100;
  const actualLiters = litersInMililiters / 1000;

  const forcedCategoryIdForFuel = classification === 'FUEL' ? vehicleFuelCategoryId : null;

  const payload = {
    description:
      classification === 'FUEL'
        ? 'Abastecimento'
        : classification === 'MAINTENANCE'
          ? 'Manutenção veicular'
          : description,
    amount: actualAmount,
    date,
    type: isExpense ? 'EXPENSE' : 'INCOME',
    isRecurring: classification === 'FUEL' || totalInstallments > 1 ? false : isRecurring,
    categoryId:
      (classification === 'FUEL' ? (forcedCategoryIdForFuel ?? categoryId) : categoryId) ||
      undefined,
    accountId,
    classification,
    ...(!isEditing && totalInstallments > 1 && { totalInstallments }),
    ...(!isEditing && totalInstallments > 1 && hasPaidInstallments && { paidInstallments }),
    ...(classification === 'FUEL' && {
      vehicleId,
      currentKm,
      liters: actualLiters,
      pricePerLiter: actualLiters > 0 ? actualAmount / actualLiters : 0,
      fuelType,
    }),
    ...(classification === 'MAINTENANCE' && {
      vehicleId,
      currentKm,
      maintenanceType: 'OTHER',
      provider: undefined,
    }),
  };

  return {
    payload,
    transactionId: isEditing && initialData ? initialData.id : undefined,
  };
}
