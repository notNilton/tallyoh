import { createFileRoute, Link } from '@tanstack/react-router';
import { User, Shield, ChevronRight, type LucideIcon } from 'lucide-react';

export const Route = createFileRoute('/settings/')({
  component: SettingsPage,
});

function SettingItem({
  icon: Icon,
  title,
  description,
  to,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between p-4 hover:bg-muted/50 transition-smooth cursor-pointer group"
    >
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="font-bold text-sm tracking-tight">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-smooth" />
    </Link>
  );
}

function SettingsPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie seu perfil e as preferências de segurança da sua conta.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-4">
          Conta e Segurança
        </h3>
        <div className="card-premium overflow-hidden divide-y divide-border">
          <SettingItem
            icon={User}
            to="/settings/personal-info"
            title="Informações Pessoais"
            description="Nome, email e foto de perfil."
          />
          <SettingItem
            icon={Shield}
            to="/settings/data-privacy"
            title="Privacidade e Dados"
            description="Controle de dados e configurações de privacidade."
          />
        </div>
      </div>

      <div className="flex justify-center pt-8 border-t border-border mt-4">
        <button className="text-rose-500 font-bold text-sm hover:underline transition-smooth">
          Sair da conta
        </button>
      </div>
    </div>
  );
}
