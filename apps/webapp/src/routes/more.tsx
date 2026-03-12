import { createFileRoute, Link } from '@tanstack/react-router';
import { CarFront, Settings, ChevronRight, Shield, Bell, HelpCircle, LogOut } from 'lucide-react';

export const Route = createFileRoute('/more' as any)({
  component: MorePage,
});

function MoreItem({
  to,
  icon: Icon,
  label,
  desc,
}: {
  to: string;
  icon: any;
  label: string;
  desc: string;
}) {
  return (
    <Link
      to={to as any}
      className="card-premium p-6 flex items-center justify-between group hover:border-primary/40 transition-smooth"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary/10 transition-smooth">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="font-bold text-sm tracking-tight">{label}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-smooth" />
    </Link>
  );
}

function MorePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto flex flex-col gap-10">
      <div>
        <h1 className="text-3xl font-display font-bold">Mais</h1>
        <p className="text-muted-foreground mt-1">
          Configurações e serviços adicionais do sistema.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MoreItem
          to="/vehicles"
          icon={CarFront}
          label="Veículos"
          desc="Gestão de frota e manutenções."
        />
        <MoreItem
          to="/settings"
          icon={Settings}
          label="Configurações"
          desc="Preferências do sistema e conta."
        />
        <MoreItem
          to="/settings"
          icon={Shield}
          label="Segurança"
          desc="Privacidade e proteção de dados."
        />
        <MoreItem
          to="/settings"
          icon={Bell}
          label="Notificações"
          desc="Alertas e avisos financeiros."
        />
      </div>

      <div className="border-t border-border pt-10 flex flex-col gap-4">
        <button className="flex items-center gap-3 px-6 py-4 rounded-2xl hover:bg-muted text-muted-foreground transition-smooth group">
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm font-bold uppercase tracking-widest group-hover:text-foreground">
            Ajuda e Suporte
          </span>
        </button>
        <button className="flex items-center gap-3 px-6 py-4 rounded-2xl hover:bg-rose-500/10 text-rose-500 transition-smooth group">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-bold uppercase tracking-widest">Sair do Sistema</span>
        </button>
      </div>
    </div>
  );
}
