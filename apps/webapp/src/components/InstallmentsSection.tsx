interface InstallmentsSectionProps {
  isEditing: boolean;
  totalInstallments: number;
  setTotalInstallments: (value: number) => void;
  formattedInstallment: string;
  hasPaidInstallments: boolean;
  setHasPaidInstallments: (value: boolean) => void;
  paidInstallments: number;
  setPaidInstallments: (value: number) => void;
  installmentValue: number;
}

export function InstallmentsSection({
  isEditing,
  totalInstallments,
  setTotalInstallments,
  formattedInstallment,
  hasPaidInstallments,
  setHasPaidInstallments,
  paidInstallments,
  setPaidInstallments,
  installmentValue,
}: InstallmentsSectionProps) {
  return (
    <>
      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
          Parcelas
        </label>
        <select
          value={totalInstallments}
          onChange={(e) => setTotalInstallments(Number(e.target.value))}
          disabled={isEditing}
          className="w-full bg-muted/40 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth appearance-none disabled:opacity-50"
        >
          {Array.from({ length: 21 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n === 1 ? 'À vista (1x)' : `${n}x`}
            </option>
          ))}
        </select>
        {totalInstallments > 1 && (
          <p className="text-[10px] font-bold text-muted-foreground mt-1.5">
            Valor por parcela: {formattedInstallment}
          </p>
        )}
      </div>

      {!isEditing && totalInstallments > 1 && (
        <div className="col-span-2 bg-muted/30 border border-border rounded-2xl p-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hasPaidInstallments}
              onChange={(e) => setHasPaidInstallments(e.target.checked)}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 transition-smooth"
            />
            <div>
              <span className="text-xs font-bold uppercase tracking-widest">
                já pagou algumas parcelas?
              </span>
              <p className="text-[10px] text-muted-foreground">
                Marca as primeiras parcelas como pagas
              </p>
            </div>
          </label>

          {hasPaidInstallments && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                  quantas parcelas?
                </label>
                <select
                  value={paidInstallments}
                  onChange={(e) => setPaidInstallments(Number(e.target.value))}
                  className="w-full bg-muted/40 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth appearance-none"
                >
                  {Array.from({ length: totalInstallments }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} de {totalInstallments}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                  valor já pago
                </label>
                <div className="w-full bg-muted/40 border border-border rounded-xl px-4 py-2.5 text-sm font-bold">
                  {(installmentValue * paidInstallments).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
