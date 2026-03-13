import { useState, useEffect } from 'react';
import { X, Loader2, Target, Calendar, Sparkles, Trash2 } from 'lucide-react';
import { api } from '../lib/api';
import type { Goal } from '../routes/evolution/_types';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode?: 'create' | 'edit';
  initialData?: Goal | null;
}

export function GoalModal({
  isOpen,
  onClose,
  onSuccess,
  mode = 'create',
  initialData,
}: GoalModalProps) {
  const isEditing = mode === 'edit';
  const [name, setName] = useState(initialData?.name ?? '');
  const [targetAmount, setTargetAmount] = useState(
    initialData ? Math.floor(Number(initialData.targetAmount) * 100).toString() : '0',
  );
  const [currentAmount, setCurrentAmount] = useState(
    initialData ? Math.floor(Number(initialData.currentAmount) * 100).toString() : '0',
  );
  const [deadline, setDeadline] = useState(
    initialData?.deadline ? new Date(initialData.deadline).toISOString().split('T')[0] : '',
  );
  const [notes, setNotes] = useState(initialData?.color ?? '');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAmountChange =
    (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, '');
      setter(value);
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
        name,
        targetAmount: Number(targetAmount) / 100,
        currentAmount: Number(currentAmount) / 100,
        deadline: deadline ? new Date(deadline).toISOString() : undefined,
        color: notes || undefined,
      };

      if (isEditing && initialData) {
        await api.patch(`/goals/${initialData.id}`, payload);
      } else {
        await api.post('/goals', payload);
      }

      onSuccess();
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao salvar meta.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!initialData || !window.confirm('Tem certeza que deseja excluir esta meta?')) return;

    setIsLoading(true);
    setError(null);

    try {
      await api.delete(`/goals/${initialData.id}`);
      onSuccess();
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao excluir meta.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border border-border w-full max-w-xl rounded-3xl shadow-2xl shadow-primary/5 p-8 animate-in zoom-in-95 duration-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 text-primary opacity-[0.03] -mr-8 -mt-8">
          <Target className="w-32 h-32" />
        </div>

        <div className="flex items-center justify-between mb-8 relative z-10">
          <div>
            <h2 className="text-xl font-bold font-display tracking-tight">
              {isEditing ? 'Editar Meta' : 'Nova Meta Financeira'}
            </h2>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">
              {isEditing
                ? 'Atualize os detalhes do seu objetivo'
                : 'Defina seus objetivos e acompanhe seu progresso'}
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
                Descrição do Objetivo
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Reserva de Emergência, Viagem..."
                className="w-full bg-muted/40 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth"
              />
            </div>

            <div className="col-span-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                Valor Alvo
              </label>
              <input
                required
                type="text"
                inputMode="numeric"
                value={formatCurrency(targetAmount)}
                onChange={handleAmountChange(setTargetAmount)}
                className="w-full bg-muted/40 border border-border rounded-xl px-4 py-2.5 text-sm font-bold text-primary focus:ring-2 focus:ring-primary/20 outline-none transition-smooth"
              />
            </div>

            <div className="col-span-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                Valor Acumulado
              </label>
              <input
                required
                type="text"
                inputMode="numeric"
                value={formatCurrency(currentAmount)}
                onChange={handleAmountChange(setCurrentAmount)}
                className="w-full bg-muted/40 border border-border rounded-xl px-4 py-2.5 text-sm font-bold text-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-smooth"
              />
            </div>

            <div className="col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                Prazo Estimado
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-muted/40 border border-border rounded-xl pl-12 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth"
                />
              </div>
            </div>

            <div className="col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                Notas / Observações
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Detalhes sobre este objetivo..."
                className="w-full bg-muted/40 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth resize-none"
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
                title="Excluir Meta"
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
                  {isEditing ? 'Salvar Alterações' : 'Criar Meta'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
