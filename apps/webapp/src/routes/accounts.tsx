import { createFileRoute } from '@tanstack/react-router';
import PrivacyAmount from '../components/PrivacyAmount';
import {
  Plus,
  Wallet,
  Building,
  PiggyBank,
  CreditCard,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

export const Route = createFileRoute('/accounts')({
  component: AccountsPage,
});

function AccountCard({
  name,
  balance,
  type,
  color,
  icon: Icon,
}: {
  name: string;
  balance: React.ReactNode;
  type: string;
  color: string;
  icon: LucideIcon;
}) {
  return (
    <div className="card-premium p-6 group cursor-pointer relative overflow-hidden">
      <div className="relative flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className={`p-2.5 rounded-xl ${color}/10 text-${color} border border-${color}/10`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted/50 px-2 py-1 rounded">
            {type}
          </span>
        </div>
        <div>
          <h3 className="text-muted-foreground text-xs font-medium">{name}</h3>
          <p className="text-2xl font-bold font-display mt-0.5 tracking-tight">{balance}</p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-smooth translate-y-1 group-hover:translate-y-0 text-right justify-end mt-1">
          <span>Detalhes</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}

function AccountsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Suas Contas</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie suas carteiras, contas bancárias e investimentos.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-smooth">
          <Plus className="w-4 h-4" />
          Adicionar Conta
        </button>
      </div>

      {/* Net Worth Summary */}
      <div className="bg-muted/30 rounded-2xl p-8 border border-border flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative">
          <p className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest mb-1.5">
            Patrimônio Líquido
          </p>
          <PrivacyAmount
            value={42850}
            className="text-4xl font-bold font-display tracking-tight block"
          />
        </div>
        <div className="flex gap-8 relative">
          <div className="text-left px-4">
            <p className="text-muted-foreground text-[10px] font-bold uppercase mb-1">Ativos</p>
            <PrivacyAmount value={48000} className="text-emerald-600 font-bold text-lg block" />
          </div>
          <div className="text-left px-4 border-l border-border">
            <p className="text-muted-foreground text-[10px] font-bold uppercase mb-1">Passivos</p>
            <PrivacyAmount value={5150} className="text-rose-600 font-bold text-lg block" />
          </div>
        </div>
      </div>

      {/* Accounts Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AccountCard
          name="Nubank Principal"
          balance={<PrivacyAmount value={4250} />}
          type="Corrente"
          color="indigo-500"
          icon={Wallet}
        />
        <AccountCard
          name="Conta Salário Itaú"
          balance={<PrivacyAmount value={8200} />}
          type="Corrente"
          color="emerald-500"
          icon={Building}
        />
        <AccountCard
          name="Reserva de Emergência"
          balance={<PrivacyAmount value={25000} />}
          type="Investimento"
          color="blue-500"
          icon={PiggyBank}
        />
        <AccountCard
          name="Cartão Infinite"
          balance={<PrivacyAmount value={-3840.5} />}
          type="Cartão"
          color="violet-500"
          icon={CreditCard}
        />
      </div>
    </div>
  );
}
