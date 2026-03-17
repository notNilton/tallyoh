import { ArrowDownLeft, ArrowUpRight, Lock } from 'lucide-react';

interface TransactionTypeToggleProps {
  isEditing: boolean;
  isExpense: boolean;
  onChange: (isExpense: boolean) => void;
}

export function TransactionTypeToggle({
  isEditing,
  isExpense,
  onChange,
}: TransactionTypeToggleProps) {
  return (
    <div
      className={`relative flex gap-2 p-1 bg-muted rounded-2xl ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isEditing && (
        <div className="absolute -top-6 right-0 flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <Lock className="w-3 h-3" />
          Bloqueado
        </div>
      )}
      <button
        type="button"
        onClick={() => !isEditing && onChange(true)}
        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-smooth ${isExpense ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'text-muted-foreground hover:bg-muted-foreground/10'}`}
      >
        <ArrowDownLeft className="w-4 h-4" />
        Despesa
      </button>
      <button
        type="button"
        onClick={() => !isEditing && onChange(false)}
        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-smooth ${!isExpense ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-muted-foreground hover:bg-muted-foreground/10'}`}
      >
        <ArrowUpRight className="w-4 h-4" />
        Receita
      </button>
    </div>
  );
}
