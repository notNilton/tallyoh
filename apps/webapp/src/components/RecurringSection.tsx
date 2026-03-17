import { Calendar } from 'lucide-react';

interface RecurringSectionProps {
  isFuel: boolean;
  totalInstallments: number;
  isRecurring: boolean;
  setIsRecurring: (value: boolean) => void;
  date: string;
}

export function RecurringSection({
  isFuel,
  totalInstallments,
  isRecurring,
  setIsRecurring,
  date,
}: RecurringSectionProps) {
  if (isFuel) return null;

  return (
    <>
      {totalInstallments === 1 && (
        <div className="col-span-2 pt-1">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 transition-smooth"
            />
            <div>
              <span className="text-xs font-bold uppercase tracking-widest group-hover:text-foreground transition-smooth">
                Lançamento Recorrente
              </span>
              <p className="text-[10px] text-muted-foreground">
                Repetir automaticamente todos os meses
              </p>
            </div>
          </label>
        </div>
      )}

      {!isFuel && isRecurring && date && (
        <div className="col-span-2 animate-in slide-in-from-top-2 duration-200 bg-primary/5 border border-primary/10 p-3 rounded-xl flex items-center gap-3 font-medium">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Agendamento Automático
            </p>
            <p className="text-xs text-muted-foreground">
              Repetir todo{' '}
              <span className="font-bold text-foreground underline underline-offset-4 decoration-primary/30 text-sm">
                dia {new Date(date + 'T12:00:00').getDate()}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
