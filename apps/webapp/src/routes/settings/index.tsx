import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import {
  User,
  Shield,
  ChevronRight,
  LogOut,
  CarFront,
  Wallet,
  Tags,
  Activity,
  Fuel,
  Loader2,
  type LucideIcon,
} from 'lucide-react';
import { api } from '../../lib/api';
import { auth } from '../../lib/auth';
import PrivacyAmount from '../../components/PrivacyAmount';

export const Route = createFileRoute('/settings/')({
  component: SettingsPage,
});

interface UserProfile {
  id: string;
  name?: string;
  email: string;
  avatarUrl?: string;
  privacyModeEnabled?: boolean;
}

interface Account {
  id: string;
  name: string;
  balance: number | string;
  type: string;
  color?: string;
}

function SettingItem({
  icon: Icon,
  title,
  description,
  to,
  iconColor = 'text-primary',
  iconBg = 'bg-primary/10',
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  iconColor?: string;
  iconBg?: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between p-4 hover:bg-muted/50 transition-smooth cursor-pointer group"
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-2 rounded-xl ${iconBg} ${iconColor} group-hover:bg-primary group-hover:text-primary-foreground transition-smooth`}
        >
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

function QuickLinkCard({
  icon: Icon,
  title,
  detail,
  to,
  value,
}: {
  icon: LucideIcon;
  title: string;
  detail: string;
  to: string;
  value?: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="card-premium p-4 flex items-center gap-4 hover:border-primary/30 transition-smooth group"
    >
      <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm truncate">{title}</p>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{detail}</p>
      </div>
      {value != null && <div className="text-sm font-bold font-display shrink-0">{value}</div>}
      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
    </Link>
  );
}

function getInitials(name?: string, email?: string): string {
  if (name) {
    return name
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();
  }
  return (email?.[0] ?? 'U').toUpperCase();
}

function SettingsPage() {
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['settings-profile'],
    queryFn: () => api.get<UserProfile>('/settings/profile'),
    staleTime: 1000 * 60 * 5,
  });

  const { data: accounts = [], isLoading: accountsLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => api.get<Account[]>('/accounts'),
    staleTime: 1000 * 60,
  });

  const { data: vehicles = [] } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => api.get<{ id: string }[]>('/vehicles'),
    staleTime: 1000 * 60,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get<{ id: string }[]>('/categories'),
    staleTime: 1000 * 60 * 5,
  });

  const totalBalance = accounts.reduce((acc, a) => acc + Number(a.balance), 0);

  return (
    <div className="p-8 max-w-2xl mx-auto flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie seu perfil, dados e atalhos para as principais telas.
        </p>
      </div>

      {/* Profile summary */}
      {profileLoading ? (
        <div className="card-premium p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-muted animate-pulse shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
            <div className="h-3 w-48 bg-muted rounded animate-pulse" />
          </div>
        </div>
      ) : profile ? (
        <div className="card-premium p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold shrink-0">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              getInitials(profile.name, profile.email)
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-base truncate">{profile.name ?? 'Usuário'}</p>
            <p className="text-sm text-muted-foreground truncate">{profile.email}</p>
          </div>
          <Link
            to="/settings/personal-info"
            className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline shrink-0"
          >
            Editar
          </Link>
        </div>
      ) : (
        <div className="card-premium p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-2xl font-bold shrink-0">
            ?
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-base">Usuário</p>
            <p className="text-sm text-muted-foreground">
              Carregue seu perfil nas informações pessoais.
            </p>
          </div>
          <Link
            to="/settings/personal-info"
            className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline shrink-0"
          >
            Configurar
          </Link>
        </div>
      )}

      {/* Acesso rápido com dados reais */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-4">
          Acesso Rápido
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <QuickLinkCard
            icon={Wallet}
            title="Contas"
            detail={accountsLoading ? '...' : `${accounts.length} conta(s)`}
            to="/accounts"
            value={
              accountsLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <PrivacyAmount value={totalBalance} />
              )
            }
          />
          <QuickLinkCard
            icon={Activity}
            title="Transações"
            detail="Histórico completo"
            to="/transactions"
          />
          <QuickLinkCard
            icon={CarFront}
            title="Veículos"
            detail={`${vehicles.length} cadastrado(s)`}
            to="/settings/vehicles"
          />
          <QuickLinkCard
            icon={Tags}
            title="Categorias"
            detail={`${categories.length} categoria(s)`}
            to="/settings/categories"
          />
          <QuickLinkCard
            icon={Fuel}
            title="Resumos Veículos"
            detail="Abastecimentos e manutenções"
            to="/fuel"
          />
        </div>
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
          <SettingItem
            icon={CarFront}
            to="/settings/vehicles"
            title="Gerenciar Frota"
            description="Cadastre seus veículos e acompanhe o consumo."
          />
          <SettingItem
            icon={Wallet}
            to="/accounts"
            title="Gerenciar Contas Bancárias"
            description="Gerencie seus saldos e instituições financeiras."
          />
          <SettingItem
            icon={Tags}
            to="/settings/categories"
            title="Categorias e Etiquetas"
            description="Organize categorias de gastos e receitas."
          />
        </div>
      </div>

      <div className="flex justify-center pt-8 border-t border-border mt-4">
        <button
          onClick={() => auth.logout()}
          className="flex items-center gap-2 text-rose-500 font-bold text-sm hover:underline transition-smooth"
        >
          <LogOut className="w-4 h-4" />
          Sair da conta
        </button>
      </div>
    </div>
  );
}
