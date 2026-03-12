import { createFileRoute } from '@tanstack/react-router';
import { Plus, CheckCircle2, CircleDashed } from 'lucide-react';
import PrivacyAmount from '../components/PrivacyAmount';

export const Route = createFileRoute('/goals')({
  component: GoalsPage,
});

function GoalCard({
  title,
  current,
  target,
  deadline,
  icon,
}: {
  title: string;
  current: number;
  target: number;
  deadline: string;
  icon: string;
}) {
  const percent = Math.min((current / target) * 100, 100);
  const isCompleted = percent >= 100;

  return (
    <div className="card-premium p-6 group cursor-pointer hover:-translate-y-0.5 transition-transform relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-muted/50 border border-border shadow-sm`}
        >
          {icon}
        </div>
        {isCompleted ? (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" /> Atingida
          </span>
        ) : (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <CircleDashed className="w-3.5 h-3.5" /> Em andamento
          </span>
        )}
      </div>

      <div>
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground font-medium mb-4 flex items-center gap-1">
          Alvo: {deadline}
        </p>

        <div className="flex items-end justify-between mb-2">
          <p className="text-2xl font-bold font-display tracking-tight flex items-center gap-1">
            <PrivacyAmount value={current} />
          </p>
          <div className="text-right">
            <p className="text-xs font-bold text-primary">{percent.toFixed(0)}%</p>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-1">
              DE <PrivacyAmount value={target} />
            </p>
          </div>
        </div>

        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-smooth ${isCompleted ? 'bg-emerald-600' : 'bg-primary'}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function GoalsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Metas Financeiras</h1>
          <p className="text-muted-foreground mt-1">
            Acompanhe a evolução dos seus sonhos e projetos de longo prazo.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-smooth">
          <Plus className="w-4 h-4" />
          Nova Meta
        </button>
      </div>

      {/* Overview Block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-muted/40 rounded-2xl p-8 border border-border flex flex-col justify-center relative overflow-hidden">
          <p className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest mb-2 relative">
            Total Acumulado
          </p>
          <PrivacyAmount
            value={68500}
            className="text-4xl font-bold font-display tracking-tight relative block mb-2"
          />
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider relative">
            EQUIVALE A <span className="text-primary">65%</span> DO PLANEJADO
          </p>
        </div>

        <div className="card-premium p-8 flex flex-col justify-center items-center text-center gap-2">
          <p className="text-3xl font-bold font-display">1</p>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            Meta Atingida
          </p>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GoalCard
          title="Reserva de Emergência"
          current={25000}
          target={25000}
          deadline="Concluído"
          icon="🛡️"
        />
        <GoalCard
          title="Viagem Europa 2027"
          current={12500}
          target={35000}
          deadline="Dezembro 2026"
          icon="✈️"
        />
        <GoalCard
          title="Entrada Apartamento"
          current={31000}
          target={150000}
          deadline="Março 2030"
          icon="🏢"
        />

        <div className="rounded-2xl border-2 border-dashed border-border flex items-center justify-center p-6 text-muted-foreground hover:bg-muted/30 transition-smooth cursor-pointer group min-h-[250px]">
          <div className="flex flex-col items-center gap-3 group-hover:scale-105 transition-smooth">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium">Criar nova meta</span>
          </div>
        </div>
      </div>
    </div>
  );
}
