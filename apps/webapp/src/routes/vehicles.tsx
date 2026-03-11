import { createFileRoute } from '@tanstack/react-router';
import { CarFront, Plus, Wrench, Fuel, AlertCircle, History } from 'lucide-react';
import PrivacyAmount from '../components/PrivacyAmount';

export const Route = createFileRoute('/vehicles')({
  component: VehiclesPage,
});

function VehicleCard({
  plate,
  model,
  year,
  km,
  colorStr,
}: {
  plate: string;
  model: string;
  year: number;
  km: number;
  colorStr: string;
}) {
  return (
    <div className="card-premium p-6 group cursor-pointer flex flex-col gap-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-110 transition-smooth" />

      <div className="relative flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center border border-border">
            <CarFront className="w-7 h-7 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl tracking-tight">{model}</h3>
            <p className="text-sm text-muted-foreground font-medium flex gap-2">
              <span>{year}</span> • <span>{colorStr}</span>
            </p>
          </div>
        </div>
        <div className="px-3 py-1 rounded border border-border bg-card shadow-sm">
          <span className="font-mono font-bold text-sm tracking-widest">{plate}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
        <div>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">
            Odômetro Total
          </p>
          <p className="font-bold">{km.toLocaleString('pt-BR')} km</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">
            Custo Médio / Mês
          </p>
          <PrivacyAmount value={850} className="font-bold text-rose-500 block" />
        </div>
      </div>
    </div>
  );
}

function MaintenanceItem({
  date,
  title,
  cost,
  type,
}: {
  date: string;
  title: string;
  cost: number;
  type: 'fuel' | 'service' | 'alert';
}) {
  const Icon = type === 'fuel' ? Fuel : type === 'service' ? Wrench : AlertCircle;
  const color =
    type === 'fuel'
      ? 'text-blue-500 bg-blue-500/10'
      : type === 'service'
        ? 'text-amber-500 bg-amber-500/10'
        : 'text-rose-500 bg-rose-500/10';

  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0 hover:bg-muted/30 px-2 -mx-2 rounded-lg transition-smooth cursor-pointer">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="font-semibold text-sm">{title}</p>
          <p className="text-xs text-muted-foreground font-medium">{date}</p>
        </div>
      </div>
      <PrivacyAmount value={-cost} className="font-bold text-sm text-foreground" />
    </div>
  );
}

function VehiclesPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Meus Veículos</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie frota, abastecimentos e manutenções preventivas.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-smooth">
          <Plus className="w-4 h-4" />
          Adicionar Veículo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VehicleCard
          model="Toyota Corolla"
          plate="ABC-1234"
          year={2022}
          colorStr="Prata"
          km={45200}
        />
        <div className="rounded-3xl border-2 border-dashed border-border flex flex-col items-center justify-center p-6 text-muted-foreground hover:bg-muted/30 transition-smooth cursor-pointer group min-h-[200px]">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-3 group-hover:scale-110 transition-smooth">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-bold">Cadastrar novo veículo</span>
          <span className="text-xs">Motos ou carros particulares</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card-premium p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              Últimos Lançamentos
            </h2>
            <button className="text-sm font-medium text-primary hover:underline">
              Ver histórico
            </button>
          </div>
          <div className="flex flex-col">
            <MaintenanceItem
              title="Posto Ipiranga — Gasolina Comum"
              date="09 Mar 2026"
              cost={220.5}
              type="fuel"
            />
            <MaintenanceItem
              title="Troca de Óleo + Filtro"
              date="15 Fev 2026"
              cost={380.0}
              type="service"
            />
            <MaintenanceItem
              title="IPVA 2026 (Cota Única)"
              date="10 Jan 2026"
              cost={2100.0}
              type="alert"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="card-premium p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="font-bold mb-1">Revisão Agendada</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Aos 50.000km <br />
              (Faltam ~4.800km)
            </p>
            <button className="w-full py-2.5 rounded-xl border border-amber-500/30 text-amber-500 font-semibold text-sm hover:bg-amber-500/10 transition-smooth">
              Marcar na Oficina
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
