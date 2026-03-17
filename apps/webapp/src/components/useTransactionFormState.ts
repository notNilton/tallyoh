import { useEffect, useState } from 'react';
import type { Transaction } from './TransactionModal';

interface UseTransactionFormStateParams {
  initialData?: Transaction | null;
  defaultVehicleId?: string;
  defaultClassification?: 'COMMON' | 'FUEL' | 'MAINTENANCE';
  isOpen: boolean;
}

export function useTransactionFormState({
  initialData,
  defaultVehicleId,
  defaultClassification,
  isOpen,
}: UseTransactionFormStateParams) {
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

  const [classification, setClassification] = useState<string>(
    initialData?.classification ?? defaultClassification ?? 'COMMON',
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
    if (isOpen) {
      if (!initialData) {
        setTotalInstallments(1);
      }
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
