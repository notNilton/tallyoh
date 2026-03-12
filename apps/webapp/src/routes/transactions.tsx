import { createFileRoute } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import PrivacyAmount from '../components/PrivacyAmount';
import {
  Plus,
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Tag,
  CreditCard,
  FileUp,
} from 'lucide-react';

export const Route = createFileRoute('/transactions')({
  component: TransactionsPage,
});

const INITIAL_TRANSACTIONS = [
  {
    date: '05 Mar 2026',
    desc: 'Supermercado Silva',
    cat: 'Alimentação',
    account: 'Nubank',
    val: -184.5,
    type: 'expense',
  },
  {
    date: '04 Mar 2026',
    desc: 'Salário Março',
    cat: 'Renda',
    account: 'Itaú',
    val: 5200.0,
    type: 'income',
  },
  {
    date: '02 Mar 2026',
    desc: 'Assinatura Netflix',
    cat: 'Lazer',
    account: 'Nubank',
    val: -55.9,
    type: 'expense',
  },
  {
    date: '01 Mar 2026',
    desc: 'Posto Shell Jabaquara',
    cat: 'Transporte',
    account: 'PicPay',
    val: -220.0,
    type: 'expense',
  },
  {
    date: '28 Fev 2026',
    desc: 'Aluguel Apartamento',
    cat: 'Moradia',
    account: 'Itaú',
    val: -2100.0,
    type: 'expense',
  },
  {
    date: '25 Fev 2026',
    desc: 'Transferência Recebida',
    cat: 'Outros',
    account: 'Nubank',
    val: 150.0,
    type: 'income',
  },
];

function TransactionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [type, setType] = useState<'common' | 'fuel'>('common');
  const [isExpense, setIsExpense] = useState(true);
  const [isRecurring, setIsRecurring] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border border-border w-full max-w-lg rounded-3xl shadow-2xl shadow-primary/5 p-8 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold font-display tracking-tight">Novo Lançamento</h2>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">
              Registro de atividade financeira
            </p>
          </div>
          <div className="flex bg-muted p-1 rounded-xl">
            <button
              onClick={() => setType('common')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-smooth ${type === 'common' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Comum
            </button>
            <button
              onClick={() => setType('fuel')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-smooth ${type === 'fuel' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Combustível
            </button>
          </div>
        </div>

        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          {type === 'common' && (
            <div className="flex gap-2 p-1 bg-muted rounded-2xl mb-2">
              <button
                type="button"
                onClick={() => setIsExpense(true)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-smooth ${isExpense ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'text-muted-foreground hover:bg-muted-foreground/10'}`}
              >
                <ArrowDownLeft className="w-4 h-4" />
                Despesa
              </button>
              <button
                type="button"
                onClick={() => setIsExpense(false)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-smooth ${!isExpense ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-muted-foreground hover:bg-muted-foreground/10'}`}
              >
                <ArrowUpRight className="w-4 h-4" />
                Receita
              </button>
            </div>
          )}

          {type === 'common' ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                  Descrição
                </label>
                <input
                  type="text"
                  placeholder="Ex: Salário Mensal"
                  className="w-full bg-muted/40 border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                  Valor (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className={`w-full bg-muted/40 border-border rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-2 outline-none transition-smooth ${isExpense ? 'text-rose-500 focus:ring-rose-500/20' : 'text-emerald-500 focus:ring-emerald-500/20'}`}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                  Data
                </label>
                <input
                  type="date"
                  className="w-full bg-muted/40 border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                  Categoria
                </label>
                <select className="w-full bg-muted/40 border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth appearance-none">
                  {isExpense ? (
                    <>
                      <option>Alimentação</option>
                      <option>Lazer</option>
                      <option>Transporte</option>
                      <option>Moradia</option>
                    </>
                  ) : (
                    <>
                      <option>Salário</option>
                      <option>Freelancer</option>
                      <option>Investimentos</option>
                      <option>Vendas</option>
                    </>
                  )}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                  Conta
                </label>
                <select className="w-full bg-muted/40 border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth appearance-none">
                  <option>Nubank</option>
                  <option>Itaú</option>
                  <option>XP Investimentos</option>
                </select>
              </div>

              <div className="col-span-2 pt-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 transition-smooth"
                  />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest group-hover:text-foreground transition-smooth">
                      Lançamento Recorrente
                    </span>
                    <p className="text-[10px] text-muted-foreground">
                      Repetir automaticamente todos os meses
                    </p>
                  </div>
                </label>
              </div>

              {isRecurring && (
                <div className="col-span-2 animate-in slide-in-from-top-2 duration-200">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                    Repetir todo dia
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[1, 5, 10, 15, 20, 25, 30].map((day) => (
                      <button
                        key={day}
                        type="button"
                        className="w-10 h-10 rounded-lg border border-border text-xs font-bold hover:bg-muted transition-smooth"
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!isRecurring && isExpense && (
                <div className="col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                    Parcelas
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 6, 12].map((n) => (
                      <button
                        key={n}
                        type="button"
                        className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-smooth ${n === 1 ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-muted'}`}
                      >
                        {n}x
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                  Veículo
                </label>
                <select className="w-full bg-muted/40 border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth appearance-none">
                  <option>Toyota Corolla (ABC-1234)</option>
                  <option>Honda CB 500X</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                  KM Atual
                </label>
                <input
                  type="number"
                  className="w-full bg-muted/40 border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                  Data
                </label>
                <input
                  type="date"
                  className="w-full bg-muted/40 border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                  Valor Total
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full bg-muted/40 border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                  Litros
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full bg-muted/40 border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth"
                />
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-2xl border border-border font-bold text-sm hover:bg-muted transition-smooth"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`flex-3 px-6 py-3 rounded-2xl text-white font-bold text-sm shadow-lg transition-smooth hover:scale-[1.02] active:scale-95 ${isExpense ? 'bg-rose-500 shadow-rose-500/20' : 'bg-emerald-500 shadow-emerald-500/20'}`}
            >
              Salvar {isExpense ? 'Despesa' : 'Receita'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TransactionsPage() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTransactions = useMemo(() => {
    return INITIAL_TRANSACTIONS.filter((t) => {
      const matchesSearch = t.desc.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType === 'all' || t.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [search, filterType]);

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Atividade</h1>
          <p className="text-muted-foreground mt-1">Histórico completo e importação de extratos.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border font-semibold hover:bg-muted transition-smooth">
            <FileUp className="w-4 h-4" />
            Importar
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-smooth"
          >
            <Plus className="w-4 h-4" />
            Novo Lançamento
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por descrição..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-card border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none w-[300px]"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-sm font-medium hover:bg-muted transition-smooth outline-none cursor-pointer"
          >
            <option value="all">Todas as transações</option>
            <option value="income">Apenas Entradas</option>
            <option value="expense">Apenas Saídas</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-muted text-xs font-bold rounded-lg uppercase tracking-wider">
            Este Mês
          </button>
          <button className="px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider text-muted-foreground hover:bg-muted">
            Personalizado
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="card-premium overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Data
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Descrição
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Categoria
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Conta
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">
                Valor
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredTransactions.map((t, i) => (
              <tr key={i} className="hover:bg-muted/20 transition-smooth group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    {t.date}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-sm">{t.desc}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/10">
                    <Tag className="w-3 h-3" />
                    {t.cat}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                    <CreditCard className="w-3.5 h-3.5" />
                    {t.account}
                  </div>
                </td>
                <td
                  className={`px-6 py-4 text-right font-bold text-sm ${t.type === 'income' ? 'text-emerald-500' : 'text-foreground'}`}
                >
                  {t.type === 'income' ? (
                    <ArrowUpRight className="inline w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDownLeft className="inline w-3 h-3 mr-1" />
                  )}
                  <PrivacyAmount value={t.val} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
