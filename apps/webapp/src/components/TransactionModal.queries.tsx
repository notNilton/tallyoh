import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { api } from '../lib/api';
import type {
  Account,
  Category,
  Transaction,
  TransactionModalProps,
  Vehicle,
} from './TransactionModal';

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

type Classification = 'COMMON' | 'FUEL' | 'MAINTENANCE';

function inferClassificationFromCategory({
  isExpense,
  filteredCategories,
  categoryId,
  currentClassification,
}: {
  isExpense: boolean;
  filteredCategories: Category[];
  categoryId: string;
  currentClassification: Classification;
}): Classification {
  if (!isExpense || filteredCategories.length === 0) {
    return 'COMMON';
  }

  const currentCat = filteredCategories.find((c) => c.id === categoryId);
  if (!currentCat) {
    return 'COMMON';
  }

  const norm = normalize(currentCat.name);

  if (norm === 'veiculo-combustivel' || norm.includes('abastecimento')) {
    return 'FUEL';
  }

  if (norm === 'veiculo-manutencao' || norm.includes('manutencao')) {
    return 'MAINTENANCE';
  }

  return currentClassification !== 'COMMON' ? 'COMMON' : currentClassification;
}

function buildTransactionPayload({
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
}: {
  isEditing: boolean;
  initialData?: Transaction | null;
  classification: Classification;
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
}) {
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

function useTransactionModalQueries({
  isOpen,
  isExpense,
}: {
  isOpen: boolean;
  isExpense: boolean;
}) {
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get<Category[]>('/categories'),
    staleTime: 1000 * 60 * 5,
    enabled: isOpen,
  });

  const filteredCategories = categories.filter(
    (cat) => cat.type === (isExpense ? 'EXPENSE' : 'INCOME'),
  );

  const { data: accounts = [] } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => api.get<Account[]>('/accounts'),
    staleTime: 1000 * 60 * 5,
    enabled: isOpen,
  });

  const { data: vehicles = [] } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => api.get<Vehicle[]>('/vehicles'),
    staleTime: 1000 * 60 * 5,
    enabled: isOpen,
  });

  const vehicleFuelCategoryId =
    filteredCategories.find((c) => normalize(c.name) === 'veiculo-combustivel')?.id ?? null;

  return {
    filteredCategories,
    accounts,
    vehicles,
    vehicleFuelCategoryId,
  };
}

function useTransactionModalFormState({
  initialData,
  defaultVehicleId,
  defaultClassification,
  isOpen,
}: {
  initialData?: Transaction | null;
  defaultVehicleId?: string;
  defaultClassification?: Classification;
  isOpen: boolean;
}) {
  const fuelData = initialData?.refuelingLog;

  const [isExpense, setIsExpense] = useState(initialData ? initialData.type === 'EXPENSE' : true);
  const [isRecurring, setIsRecurring] = useState(initialData?.isRecurring ?? false);
  const [date, setDate] = useState(
    initialData?.date
      ? new Date(initialData.date).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
  );
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [amount, setAmount] = useState(
    initialData ? Math.floor(Math.abs(Number(initialData.amount)) * 100).toString() : '0',
  );
  const [categoryId, setCategoryId] = useState(initialData?.categoryId ?? '');
  const [accountId, setAccountId] = useState(
    initialData?.accountId ?? initialData?.account?.id ?? '',
  );
  const [totalInstallments, setTotalInstallments] = useState(1);
  const [hasPaidInstallments, setHasPaidInstallments] = useState(false);
  const [paidInstallments, setPaidInstallments] = useState(1);

  const [classification, setClassification] = useState<Classification>(
    (initialData?.classification as Classification | undefined) ??
      defaultClassification ??
      'COMMON',
  );

  const [vehicleId, setVehicleId] = useState(
    fuelData?.vehicleId ?? initialData?.vehicleId ?? defaultVehicleId ?? '',
  );
  const [currentKm, setCurrentKm] = useState(
    fuelData?.odometer
      ? Math.floor(Number(fuelData.odometer)).toString()
      : initialData?.currentKm
        ? Math.floor(Number(initialData.currentKm)).toString()
        : '0',
  );
  const [liters, setLiters] = useState(
    fuelData?.fuelLiters
      ? Math.floor(Number(fuelData.fuelLiters) * 1000).toString()
      : initialData?.liters
        ? Math.floor(Number(initialData.liters) * 1000).toString()
        : '0',
  );
  const [fuelType, setFuelType] = useState(
    fuelData?.fuelType ?? initialData?.fuelType ?? 'GASOLINA_COMUM',
  );

  useEffect(() => {
    if (!isOpen) return;
    if (!initialData) {
      setTotalInstallments(1);
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    if (totalInstallments > 1) {
      setIsRecurring(false);
    }
  }, [totalInstallments]);

  useEffect(() => {
    if (totalInstallments <= 1) {
      setHasPaidInstallments(false);
      setPaidInstallments(1);
      return;
    }
    setPaidInstallments((prev) => Math.min(prev, totalInstallments));
  }, [totalInstallments]);

  useEffect(() => {
    if (!hasPaidInstallments) {
      setPaidInstallments(1);
    }
  }, [hasPaidInstallments]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setAmount(value);
  };

  const handleKmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCurrentKm(value);
  };

  const handleLitersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setLiters(value);
  };

  const formattedAmount = (Number(amount) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const amountValue = Number(amount) / 100;
  const installmentValue = totalInstallments > 1 ? amountValue / totalInstallments : amountValue;

  const formattedInstallment = installmentValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const formattedKm = Number(currentKm).toLocaleString('pt-BR');

  const formattedLiters = (Number(liters) / 1000).toLocaleString('pt-BR', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });

  return {
    // state
    isExpense,
    setIsExpense,
    isRecurring,
    setIsRecurring,
    date,
    setDate,
    description,
    setDescription,
    amount,
    setAmount,
    categoryId,
    setCategoryId,
    accountId,
    setAccountId,
    totalInstallments,
    setTotalInstallments,
    hasPaidInstallments,
    setHasPaidInstallments,
    paidInstallments,
    setPaidInstallments,
    classification,
    setClassification,
    vehicleId,
    setVehicleId,
    currentKm,
    setCurrentKm,
    liters,
    setLiters,
    fuelType,
    setFuelType,
    // handlers
    handleAmountChange,
    handleKmChange,
    handleLitersChange,
    // derived
    formattedAmount,
    amountValue,
    installmentValue,
    formattedInstallment,
    formattedKm,
    formattedLiters,
  };
}

export function useTransactionModalModel({
  isOpen,
  onClose,
  onSuccess,
  mode = 'create',
  initialData,
  defaultVehicleId,
  defaultClassification,
}: TransactionModalProps) {
  const isEditing = mode === 'edit';

  const form = useTransactionModalFormState({
    initialData,
    defaultVehicleId,
    defaultClassification: defaultClassification as Classification | undefined,
    isOpen,
  });

  const {
    isExpense,
    setIsExpense,
    isRecurring,
    setIsRecurring,
    date,
    setDate,
    description,
    setDescription,
    amount,
    categoryId,
    setCategoryId,
    accountId,
    setAccountId,
    totalInstallments,
    setTotalInstallments,
    hasPaidInstallments,
    setHasPaidInstallments,
    paidInstallments,
    setPaidInstallments,
    classification,
    setClassification,
    vehicleId,
    setVehicleId,
    currentKm,
    handleKmChange,
    liters,
    handleLitersChange,
    fuelType,
    setFuelType,
    handleAmountChange,
    formattedAmount,
    installmentValue,
    formattedInstallment,
    formattedKm,
    formattedLiters,
  } = form;

  const { filteredCategories, accounts, vehicles, vehicleFuelCategoryId } =
    useTransactionModalQueries({
      isOpen,
      isExpense,
    });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const nextClassification = inferClassificationFromCategory({
      isExpense,
      filteredCategories,
      categoryId,
      currentClassification: (classification as Classification) ?? 'COMMON',
    });

    if (nextClassification !== classification) {
      setClassification(nextClassification);
    }
  }, [isExpense, filteredCategories, categoryId, classification, setClassification]);

  const isFuel = classification === 'FUEL';
  const isMaintenance = classification === 'MAINTENANCE';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { payload, transactionId } = buildTransactionPayload({
        isEditing,
        initialData,
        classification: classification as Classification,
        vehicleFuelCategoryId,
        amountInCents: Number(amount),
        litersInMililiters: Number(liters),
        date,
        isExpense,
        isRecurring,
        totalInstallments,
        hasPaidInstallments,
        paidInstallments,
        categoryId,
        accountId,
        vehicleId,
        currentKm: Number(currentKm),
        fuelType,
        description,
      });

      if (isEditing && transactionId) {
        await api.patch(`/transactions/${transactionId}`, payload);
      } else {
        await api.post('/transactions', payload);
      }

      onSuccess();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar transação.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // view helpers
    isEditing,
    isFuel,
    isMaintenance,
    // form state
    isExpense,
    setIsExpense,
    isRecurring,
    setIsRecurring,
    date,
    setDate,
    description,
    setDescription,
    amount,
    handleAmountChange,
    categoryId,
    setCategoryId,
    accountId,
    setAccountId,
    totalInstallments,
    setTotalInstallments,
    hasPaidInstallments,
    setHasPaidInstallments,
    paidInstallments,
    setPaidInstallments,
    classification,
    setClassification,
    vehicleId,
    setVehicleId,
    currentKm,
    handleKmChange,
    liters,
    handleLitersChange,
    fuelType,
    setFuelType,
    // derived / formatting
    formattedAmount,
    installmentValue,
    formattedInstallment,
    formattedKm,
    formattedLiters,
    // queries
    filteredCategories,
    accounts,
    vehicles,
    // submission
    isLoading,
    error,
    handleSubmit,
  };
}
