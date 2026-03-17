import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { api } from '../lib/api';
import { useTransactionFormState } from './useTransactionFormState';
import { useTransactionQueries } from './useTransactionQueries';
import { inferClassificationFromCategory } from './transaction-helpers';
import { buildTransactionPayload } from './buildTransactionPayload';
import { TransactionTypeToggle } from './TransactionTypeToggle';
import { InstallmentsSection } from './InstallmentsSection';
import { VehicleSection } from './VehicleSection';
import { RecurringSection } from './RecurringSection';

export interface Category {
  id: string;
  name: string;
  icon?: string;
  type: 'INCOME' | 'EXPENSE';
}

export interface Account {
  id: string;
  name: string;
}

export interface Vehicle {
  id: string;
  name: string;
  brand?: string;
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode?: 'create' | 'edit';
  initialData?: Transaction | null;
  /** opcional: contexto de veículo atual (ex: vindo da tela de evolução) */
  defaultVehicleId?: string;
  /** opcional: tipo de gasto sugerido ao abrir o modal */
  defaultClassification?: 'COMMON' | 'FUEL' | 'MAINTENANCE';
}

export interface Transaction {
  id: string;
  description: string;
  amount: number | string;
  date: string;
  type: 'INCOME' | 'EXPENSE';
  classification?: string;
  isRecurring?: boolean;
  categoryId?: string;
  accountId?: string;
  category?: Category;
  account?: Account;
  vehicleId?: string;
  currentKm?: number;
  liters?: number;
  pricePerLiter?: number;
  fuelType?: string;
  refuelingLog?: {
    vehicleId: string;
    odometer: number;
    fuelLiters: number;
    fuelType: string;
    pricePerLiter: number;
  };
}

export function TransactionModal({
  isOpen,
  onClose,
  onSuccess,
  mode = 'create',
  initialData,
  defaultVehicleId,
  defaultClassification,
}: TransactionModalProps) {
  const isEditing = mode === 'edit';
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
    liters,
    fuelType,
    setFuelType,
    handleAmountChange,
    handleKmChange,
    handleLitersChange,
    formattedAmount,
    installmentValue,
    formattedInstallment,
    formattedKm,
    formattedLiters,
  } = useTransactionFormState({
    initialData,
    defaultVehicleId,
    defaultClassification,
    isOpen,
  });

  const { filteredCategories, accounts, vehicles, vehicleFuelCategoryId } = useTransactionQueries({
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
      currentClassification: (classification as 'COMMON' | 'FUEL' | 'MAINTENANCE') ?? 'COMMON',
    });

    if (nextClassification !== classification) {
      setClassification(nextClassification);
    }
  }, [isExpense, filteredCategories, categoryId, classification, setClassification]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { payload, transactionId } = buildTransactionPayload({
        isEditing,
        initialData,
        classification: classification as 'COMMON' | 'FUEL' | 'MAINTENANCE',
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

  const isFuel = classification === 'FUEL';
  const isMaintenance = classification === 'MAINTENANCE';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border border-border w-full max-w-xl rounded-3xl shadow-2xl shadow-primary/5 p-8 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold font-display tracking-tight">
              {isEditing ? 'Editar Lançamento' : 'Nova Transação'}
            </h2>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">
              {isEditing ? 'Atualize os detalhes da transação' : 'Registro de atividade financeira'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-muted transition-smooth text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <TransactionTypeToggle
            isEditing={isEditing}
            isExpense={isExpense}
            onChange={setIsExpense}
          />

          <div className="grid grid-cols-2 gap-4">
            {/* Valor Total */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                Valor Total
              </label>
              <div className="relative">
                <input
                  required
                  type="text"
                  inputMode="numeric"
                  value={formattedAmount}
                  onChange={handleAmountChange}
                  className={`w-full bg-muted/40 border border-border rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-2 outline-none transition-smooth ${isExpense ? 'text-rose-500 focus:ring-rose-500/20' : 'text-emerald-500 focus:ring-emerald-500/20'}`}
                />
              </div>
            </div>

            <InstallmentsSection
              isEditing={isEditing}
              totalInstallments={totalInstallments}
              setTotalInstallments={setTotalInstallments}
              formattedInstallment={formattedInstallment}
              hasPaidInstallments={hasPaidInstallments}
              setHasPaidInstallments={setHasPaidInstallments}
              paidInstallments={paidInstallments}
              setPaidInstallments={setPaidInstallments}
              installmentValue={installmentValue}
            />

            {/* Date */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                Data
              </label>
              <input
                required
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-muted/40 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                Categoria
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-muted/40 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth appearance-none"
              >
                <option value="">Sem categoria</option>
                {filteredCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Account */}
            <div className="col-span-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                Pagamento via
              </label>
              <select
                required
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="w-full bg-muted/40 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth appearance-none"
              >
                <option value="">Selecione uma conta</option>
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name}
                  </option>
                ))}
              </select>
            </div>

            <VehicleSection
              isFuel={isFuel}
              isMaintenance={isMaintenance}
              vehicleId={vehicleId}
              setVehicleId={setVehicleId}
              vehicles={vehicles}
              fuelType={fuelType}
              setFuelType={setFuelType}
              formattedKm={formattedKm}
              handleKmChange={handleKmChange}
              formattedLiters={formattedLiters}
              handleLitersChange={handleLitersChange}
              liters={liters}
              amount={amount}
            />

            <RecurringSection
              isFuel={isFuel}
              totalInstallments={totalInstallments}
              isRecurring={isRecurring}
              setIsRecurring={setIsRecurring}
              date={date}
            />

            {/* Descrição (renomeada para Observações) */}
            {!isFuel && !isMaintenance && (
              <div className="col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                  Observações
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: Supermercado, posto, etc..."
                  className="w-full bg-muted/40 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth resize-none"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-2xl border border-border font-bold text-sm hover:bg-muted transition-smooth"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-[3] flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-white font-bold text-sm shadow-lg transition-smooth hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:scale-100 ${isExpense ? 'bg-rose-500 shadow-rose-500/20' : 'bg-emerald-500 shadow-emerald-500/20'}`}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {isEditing
                    ? 'Salvar Alterações'
                    : `Confirmar ${isFuel ? 'Abastecimento' : isExpense ? 'Despesa' : 'Receita'}`}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
