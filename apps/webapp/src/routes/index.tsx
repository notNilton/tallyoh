import { createFileRoute } from '@tanstack/react-router';
import PrivacyAmount from '../components/PrivacyAmount';
import {
  Plus,
  ArrowUpCircle,
  ArrowDownCircle,
  CreditCard,
  PieChart,
  History as HistoryIcon,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Wallet,
  Building,
  type LucideIcon,
} from 'lucide-react';

export const Route = createFileRoute('/')({
  component: UserDashboard,
});

function MetricCard({
  title,
  value,
  detail,
  icon: Icon,
}: {
  title: string;
  value: React.ReactNode;
  detail: string;
  icon: LucideIcon;
}) {
  return (
    <div className="card-premium p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg bg-muted/50 text-muted-foreground border border-border/50`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {detail}
        </span>
      </div>
      <div>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          {title}
        </h3>
        <p className="text-2xl font-bold font-display mt-1">{value}</p>
      </div>
    </div>
  );
}

function UserDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Welcome & Quick Action */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Olá, Nilton</h1>
          <p className="text-muted-foreground mt-1">Aqui está o resumo das suas finanças hoje.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-smooth">
          <Plus className="w-4 h-4" />
          Novo Lançamento
        </button>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Saldo Total"
          value={<PrivacyAmount value={12450} className="font-display" />}
          detail="Em 4 contas"
          icon={CreditCard}
        />
        <MetricCard
          title="Receitas (Mar)"
          value={<PrivacyAmount value={8200} className="font-display" />}
          detail="+R$ 1.200 vs Fev"
          icon={ArrowUpCircle}
        />
        <MetricCard
          title="Despesas (Mar)"
          value={<PrivacyAmount value={3840.5} className="font-display" />}
          detail="46% do planejado"
          icon={ArrowDownCircle}
        />
        <MetricCard
          title="Pode Gastar"
          value={<PrivacyAmount value={2150} className="font-display" />}
          detail="Safe-to-Spend"
          icon={ShieldCheck}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Recent Transactions & Chart */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Spending Chart */}
          <div className="card-premium p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Fluxo de Caixa
              </h2>
              <select className="bg-muted text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border-none focus:ring-0 cursor-pointer">
                <option>7 dias</option>
                <option>30 dias</option>
              </select>
            </div>
            <div className="h-[250px] flex items-end gap-3 px-2">
              {[30, 45, 25, 60, 80, 55, 90].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col gap-1 items-center group">
                  <div className="w-full bg-muted/30 group-hover:bg-muted/50 rounded-t h-[180px] flex flex-col justify-end overflow-hidden">
                    <div
                      className="w-full bg-primary/40 group-hover:bg-primary/60 transition-smooth"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase mt-2">
                    Seg
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="card-premium p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <HistoryIcon className="w-4 h-4" />
                Atividade Recente
              </h2>
              <button className="text-[11px] font-bold text-primary uppercase tracking-widest hover:underline flex items-center gap-1">
                Ver Tudo
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex flex-col">
              {[
                {
                  label: 'Supermercado Silva',
                  cat: 'Alimentação',
                  val: -184.5,
                  date: 'Hoje',
                  icon: '🛒',
                },
                {
                  label: 'Salário Empresa X',
                  cat: 'Renda',
                  val: 5200.0,
                  date: 'Ontem',
                  icon: '💰',
                },
                {
                  label: 'Netflix Streaming',
                  cat: 'Lazer',
                  val: -55.9,
                  date: '02 Mar',
                  icon: '🍿',
                },
                {
                  label: 'Posto Shell',
                  cat: 'Transporte',
                  val: -220.0,
                  date: '01 Mar',
                  icon: '⛽',
                },
              ].map((t, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-4 border-b border-border last:border-0 hover:bg-muted/30 px-2 -mx-2 rounded-lg transition-smooth cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg shadow-sm">
                      {t.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.cat} • {t.date}
                      </p>
                    </div>
                  </div>
                  <PrivacyAmount
                    value={t.val}
                    showSign={true}
                    className={`font-bold text-sm ${t.val > 0 ? 'text-emerald-500' : 'text-foreground'}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Budgets & Accounts */}
        <div className="flex flex-col gap-6">
          {/* Budget Overview */}
          <div className="card-premium p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <PieChart className="w-4 h-4" />
                Orçamentos
              </h2>
            </div>
            <div className="flex flex-col gap-5">
              {[
                { label: 'Alimentação', spent: 850, limit: 1200 },
                { label: 'Transporte', spent: 420, limit: 500 },
                { label: 'Lazer', spent: 300, limit: 400 },
              ].map((b) => (
                <div key={b.label}>
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider mb-1.5">
                    <span>{b.label}</span>
                    <span className="text-muted-foreground font-mono">
                      {((b.spent / b.limit) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-primary transition-smooth`}
                      style={{ width: `${(b.spent / b.limit) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 rounded-lg border border-border text-[11px] font-bold uppercase tracking-widest hover:bg-muted transition-smooth">
              Gerenciar
            </button>
          </div>

          {/* Accounts Section */}
          <div className="card-premium p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Suas Contas
              </h2>
              <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">
                Gerenciar
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {[
                {
                  label: 'Nubank',
                  val: 4250,
                  icon: <Wallet className="w-4 h-4" />,
                  color: 'bg-indigo-500/10 text-indigo-500',
                },
                {
                  label: 'Itaú',
                  val: 8200,
                  icon: <Building className="w-4 h-4" />,
                  color: 'bg-emerald-500/10 text-emerald-500',
                },
                {
                  label: 'XP Investimentos',
                  val: 15600,
                  icon: <TrendingUp className="w-4 h-4" />,
                  color: 'bg-amber-500/10 text-amber-500',
                },
              ].map((acc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-smooth group cursor-pointer border border-transparent hover:border-border"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${acc.color}`}
                    >
                      {acc.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{acc.label}</p>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        Principal
                      </p>
                    </div>
                  </div>
                  <PrivacyAmount value={acc.val} className="text-sm font-bold" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
