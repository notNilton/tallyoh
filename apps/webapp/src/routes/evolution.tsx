import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Plus, CheckCircle2, Flame } from 'lucide-react';
import PrivacyAmount from '../components/PrivacyAmount';

export const Route = createFileRoute('/evolution' as any)({
  component: EvolutionPage,
});

function BudgetProgress({ label, spent, limit }: { label: string; spent: number; limit: number }) {
  const percent = Math.min((spent / limit) * 100, 100);
  const isOver = spent > limit;

  return (
    <div className="card-premium p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[11px] uppercase tracking-widest text-muted-foreground">
          {label}
        </h3>
        <span
          className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${isOver ? 'bg-rose-500/10 text-rose-500' : 'bg-muted text-muted-foreground'}`}
        >
          {isOver ? 'Estourado' : 'No Limite'}
        </span>
      </div>
      <div>
        <div className="flex items-end justify-between mb-2">
          <p className="text-xl font-bold font-display tracking-tight">
            <PrivacyAmount value={spent} />
            <span className="text-muted-foreground text-[10px] ml-1 uppercase font-bold">
              de <PrivacyAmount value={limit} />
            </span>
          </p>
          <p className={`text-xs font-bold ${isOver ? 'text-rose-500' : 'text-primary'}`}>
            {percent.toFixed(0)}%
          </p>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-smooth ${isOver ? 'bg-rose-500' : 'bg-primary'}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function GoalCard({
  title,
  current,
  target,
  icon,
}: {
  title: string;
  current: number;
  target: number;
  icon: string;
}) {
  const percent = Math.min((current / target) * 100, 100);
  const isCompleted = percent >= 100;

  return (
    <div className="card-premium p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between text-2xl">
        <span>{icon}</span>
        {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
      </div>
      <div>
        <h3 className="font-bold text-sm mb-1">{title}</h3>
        <div className="flex items-end justify-between mb-2">
          <p className="text-lg font-bold font-display tracking-tight">
            <PrivacyAmount value={current} />
          </p>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            {percent.toFixed(0)}%
          </p>
        </div>
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-smooth ${isCompleted ? 'bg-emerald-500' : 'bg-indigo-500'}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function EvolutionPage() {
  const [activeTab, setActiveTab] = useState<'budgets' | 'goals'>('budgets');

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Evolução</h1>
          <p className="text-muted-foreground mt-1">Planejamento e metas de longo prazo.</p>
        </div>
        <div className="flex bg-muted p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('budgets')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-smooth ${activeTab === 'budgets' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Orçamentos
          </button>
          <button
            onClick={() => setActiveTab('goals')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-smooth ${activeTab === 'goals' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Metas
          </button>
        </div>
      </div>

      {activeTab === 'budgets' ? (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-premium p-6 bg-primary text-primary-foreground">
              <p className="text-[10px] uppercase font-bold tracking-widest opacity-80 mb-2">
                Reserva Mensal
              </p>
              <div className="text-3xl font-bold font-display mb-2">
                <PrivacyAmount value={2500} />
              </div>
              <p className="text-xs opacity-80">80% da sua meta de economia atingida este mês.</p>
            </div>
            <div className="card-premium p-6 flex flex-col justify-center">
              <h2 className="text-sm font-bold flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-amber-500" />
                Insights
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Seus gastos com <span className="text-foreground font-bold italic">Lazer</span>{' '}
                estão 15% acima da média.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BudgetProgress label="Alimentação" spent={950} limit={1200} />
            <BudgetProgress label="Transporte" spent={480} limit={500} />
            <BudgetProgress label="Lazer" spent={520} limit={400} />
            <BudgetProgress label="Saúde" spent={150} limit={600} />
            <BudgetProgress label="Outros" spent={240} limit={300} />
            <div className="card-premium border-dashed border-2 flex flex-col items-center justify-center p-6 text-muted-foreground hover:bg-muted/30 cursor-pointer transition-smooth">
              <Plus className="w-5 h-5 mb-2" />
              <span className="text-xs font-bold uppercase tracking-widest">Novo Orçamento</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-muted/40 rounded-2xl p-8 border border-border">
            <p className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest mb-2">
              Total Acumulado
            </p>
            <PrivacyAmount
              value={68500}
              className="text-4xl font-bold font-display tracking-tight block mb-2"
            />
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              EQUIVALE A <span className="text-primary">65%</span> DO PLANEJADO
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GoalCard title="Reserva de Emergência" current={25000} target={25000} icon="🛡️" />
            <GoalCard title="Viagem Europa" current={12500} target={35000} icon="✈️" />
            <GoalCard title="Entrada Apartamento" current={31000} target={150000} icon="🏢" />
            <div className="card-premium border-dashed border-2 flex flex-col items-center justify-center p-6 text-muted-foreground hover:bg-muted/30 cursor-pointer transition-smooth">
              <Plus className="w-5 h-5 mb-2" />
              <span className="text-xs font-bold uppercase tracking-widest">Nova Meta</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
