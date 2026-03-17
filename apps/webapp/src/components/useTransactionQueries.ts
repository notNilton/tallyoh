import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { normalize } from './transaction-helpers';
import type { Category, Account, Vehicle } from './TransactionModal';

interface UseTransactionQueriesParams {
  isOpen: boolean;
  isExpense: boolean;
}

export function useTransactionQueries({ isOpen, isExpense }: UseTransactionQueriesParams) {
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get<Category[]>('/categories'),
    staleTime: 1000 * 60 * 5,
    enabled: isOpen,
  });

  const filteredCategories = categories.filter(
    (cat) => cat.type === (isExpense ? 'EXPENSE' : 'INCOME'),
  );

  const { data: accounts = [] } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => api.get<Account[]>('/accounts'),
    staleTime: 1000 * 60 * 5,
    enabled: isOpen,
  });

  const { data: vehicles = [] } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => api.get<Vehicle[]>('/vehicles'),
    staleTime: 1000 * 60 * 5,
    enabled: isOpen,
  });

  const vehicleFuelCategoryId =
    filteredCategories.find((c) => normalize(c.name) === 'veiculo-combustivel')?.id ?? null;

  return {
    categories,
    filteredCategories,
    accounts,
    vehicles,
    vehicleFuelCategoryId,
  };
}
