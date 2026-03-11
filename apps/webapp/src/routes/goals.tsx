import { createFileRoute } from '@tanstack/react-router';
import { Target, Plus, CheckCircle2, CircleDashed, TrendingUp } from 'lucide-react';
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
  color,
}: {
  title: string;
  current: number;
  target: number;
  deadline: string;
  icon: string;
  color: string;
}) {
  const percent = Math.min((current / target) * 100, 100);
  const isCompleted = percent >= 100;

  return (
    <div className="card-premium p-6 group cursor-pointer hover:-translate-y-1 transition-transform relative overflow-hidden">
      <div
        className={`absolute top-0 right-0 w-24 h-24 ${color}/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-125 transition-smooth`}
      />
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

        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-smooth ${isCompleted ? 'bg-emerald-500' : color}`}
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
        <div className="md:col-span-2 bg-primary/5 rounded-3xl p-8 border border-primary/10 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-primary/5 select-none pointer-events-none">
            <TrendingUp className="w-32 h-32" />
          </div>
          <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2 relative">
            Total Acumulado em Metas
          </p>
          <PrivacyAmount
            value={68500}
            className="text-5xl font-black font-display tracking-tight relative block mb-2"
          />
          <p className="text-sm font-medium text-muted-foreground relative">
            Esse valor corresponde a <span className="text-primary font-bold">65%</span> de todo o
            patrimônio planejado.
          </p>
        </div>

        <div className="card-premium p-8 flex flex-col justify-center items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Target className="w-8 h-8" />
          </div>
          <div>
            <p className="text-3xl font-bold font-display">1</p>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1">
              Meta Atingida
            </p>
          </div>
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
          color="bg-emerald-500"
        />
        <GoalCard
          title="Viagem Europa 2027"
          current={12500}
          target={35000}
          deadline="Dezembro 2026"
          icon="✈️"
          color="bg-indigo-500"
        />
        <GoalCard
          title="Entrada Apartamento"
          current={31000}
          target={150000}
          deadline="Março 2030"
          icon="🏢"
          color="bg-blue-500"
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
