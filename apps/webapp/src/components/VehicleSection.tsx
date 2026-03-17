import { getBrandIcon } from '../lib/vehicle-brands';
import type { Vehicle } from './TransactionModal';

interface VehicleSectionProps {
  isFuel: boolean;
  isMaintenance: boolean;
  vehicleId: string;
  setVehicleId: (value: string) => void;
  vehicles: Vehicle[];
  fuelType: string;
  setFuelType: (value: string) => void;
  formattedKm: string;
  handleKmChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formattedLiters: string;
  handleLitersChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  liters: string;
  amount: string;
}

export function VehicleSection({
  isFuel,
  isMaintenance,
  vehicleId,
  setVehicleId,
  vehicles,
  fuelType,
  setFuelType,
  formattedKm,
  handleKmChange,
  formattedLiters,
  handleLitersChange,
  liters,
  amount,
}: VehicleSectionProps) {
  if (!isFuel && !isMaintenance) {
    return null;
  }

  return (
    <div className="col-span-2 grid grid-cols-2 gap-4">
      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
          Veículo
        </label>
        <div className="relative">
          <select
            required={isFuel || isMaintenance}
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            className="w-full bg-muted/40 border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none appearance-none transition-smooth"
          >
            <option value="">Selecione</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
          {vehicleId && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <img
                src={getBrandIcon(vehicles.find((v) => v.id === vehicleId)?.brand)}
                className="w-4 h-4 grayscale opacity-70"
                alt=""
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
          )}
        </div>
      </div>

      {isFuel && (
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
            Tipo de Combustível
          </label>
          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className="w-full bg-muted/40 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none appearance-none transition-smooth"
          >
            <option value="GASOLINA_COMUM">Gasolina Comum</option>
            <option value="GASOLINA_ADITIVADA">Gasolina Aditivada</option>
            <option value="ETANOL">Etanol</option>
            <option value="DIESEL">Diesel</option>
            <option value="GNV">GNV</option>
          </select>
        </div>
      )}

      <div className={isFuel ? '' : 'col-span-1'}>
        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
          Odômetro (KM)
        </label>
        <input
          type="text"
          inputMode="numeric"
          value={formattedKm}
          onChange={handleKmChange}
          placeholder="Ex: 160.148"
          className="w-full bg-muted/40 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth"
        />
      </div>

      {isFuel && (
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
            Litros
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={formattedLiters}
              onChange={handleLitersChange}
              placeholder="Ex: 45,234"
              className="w-full bg-muted/40 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth"
            />
            {Number(liters) > 0 && Number(amount) > 0 && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-primary">
                {(Number(amount) / 100 / (Number(liters) / 1000)).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
                /L
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
