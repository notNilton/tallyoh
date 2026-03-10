import { createFileRoute } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import PrivacyAmount from '../components/PrivacyAmount';
import { Plus, Search, ArrowUpRight, ArrowDownLeft, Calendar, Tag, CreditCard } from 'lucide-react';

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

function TransactionsPage() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

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
          <h1 className="text-3xl font-display font-bold">Transações</h1>
          <p className="text-muted-foreground mt-1">
            Histórico completo de toda a sua movimentação financeira.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-smooth">
          <Plus className="w-4 h-4" />
          Nova Transação
        </button>
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
    </div>
  );
}
