import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { X, Loader2, Sparkles, Trash2, Wallet } from 'lucide-react';
import { api } from '../lib/api';
import type { Budget } from '../routes/evolution/_types';

interface Category {
  id: string;
  name: string;
  icon?: string;
}

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode?: 'create' | 'edit';
  initialData?: Budget | null;
}

export function BudgetModal({
  isOpen,
  onClose,
  onSuccess,
  mode = 'create',
  initialData,
}: BudgetModalProps) {
  const isEditing = mode === 'edit';
  const now = new Date();

  const [categoryId, setCategoryId] = useState(initialData?.categoryId ?? '');
  const [amountLimit, setAmountLimit] = useState(
    initialData ? Math.floor(Number(initialData.amountLimit) * 100).toString() : '0',
  );
  const [month, setMonth] = useState(initialData?.month ?? now.getMonth() + 1);
  const [year, setYear] = useState(initialData?.year ?? now.getFullYear());

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get<Category[]>('/categories'),
    enabled: isOpen,
  });

  useEffect(() => {
    if (isOpen) {
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setAmountLimit(value);
  };

  const formatCurrency = (val: string) => {
    return (Number(val) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        categoryId: categoryId || undefined,
        amountLimit: Number(amountLimit) / 100,
        month,
        year,
      };

      if (isEditing && initialData) {
        await api.patch(`/budgets/${initialData.id}`, payload);
      } else {
        await api.post('/budgets', payload);
      }

      onSuccess();
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao salvar orçamento.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!initialData || !window.confirm('Tem certeza que deseja excluir este orçamento?')) return;

    setIsLoading(true);
    setError(null);

    try {
      await api.delete(`/budgets/${initialData.id}`);
      onSuccess();
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao excluir orçamento.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const months = [
    { value: 1, label: 'Janeiro' },
    { value: 2, label: 'Fevereiro' },
    { value: 3, label: 'Março' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Maio' },
    { value: 6, label: 'Junho' },
    { value: 7, label: 'Julho' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Setembro' },
    { value: 10, label: 'Outubro' },
    { value: 11, label: 'Novembro' },
    { value: 12, label: 'Dezembro' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border border-border w-full max-w-xl rounded-3xl shadow-2xl shadow-primary/5 p-8 animate-in zoom-in-95 duration-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 text-primary opacity-[0.03] -mr-8 -mt-8">
          <Wallet className="w-32 h-32" />
        </div>

        <div className="flex items-center justify-between mb-8 relative z-10">
          <div>
            <h2 className="text-xl font-bold font-display tracking-tight">
              {isEditing ? 'Editar Orçamento' : 'Novo Orçamento'}
            </h2>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">
              {isEditing
                ? 'Atualize o limite de gastos para esta categoria'
                : 'Defina um limite de gastos para suas categorias'}
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-xl hover:bg-muted transition-smooth text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form className="flex flex-col gap-6 relative z-10" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                Categoria
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-muted/40 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth appearance-none"
              >
                <option value="">Geral</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                Limite Mensal
              </label>
              <input
                required
                type="text"
                inputMode="numeric"
                value={formatCurrency(amountLimit)}
                onChange={handleAmountChange}
                className="w-full bg-muted/40 border border-border rounded-xl px-4 py-2.5 text-sm font-bold text-primary focus:ring-2 focus:ring-primary/20 outline-none transition-smooth"
              />
            </div>

            <div className="col-span-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                Mês
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="w-full bg-muted/40 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth appearance-none"
              >
                {months.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                Ano
              </label>
              <input
                required
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full bg-muted/40 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {isEditing && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={isLoading}
                className="p-3 rounded-2xl border border-border text-rose-500 hover:bg-rose-500/5 transition-smooth"
                title="Excluir Orçamento"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
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
              className="flex-[3] flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:scale-100 transition-smooth"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {isEditing ? 'Salvar Alterações' : 'Criar Orçamento'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
