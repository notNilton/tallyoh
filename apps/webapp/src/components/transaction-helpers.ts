import type { Category } from './TransactionModal';

export function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

interface InferClassificationParams {
  isExpense: boolean;
  filteredCategories: Category[];
  categoryId: string;
  currentClassification: 'COMMON' | 'FUEL' | 'MAINTENANCE';
}

export function inferClassificationFromCategory({
  isExpense,
  filteredCategories,
  categoryId,
  currentClassification,
}: InferClassificationParams): 'COMMON' | 'FUEL' | 'MAINTENANCE' {
  if (!isExpense || filteredCategories.length === 0) {
    return 'COMMON';
  }

  const currentCat = filteredCategories.find((c) => c.id === categoryId);
  if (!currentCat) {
    return 'COMMON';
  }

  const norm = normalize(currentCat.name);

  if (norm === 'veiculo-combustivel' || norm.includes('abastecimento')) {
    return 'FUEL';
  }

  if (norm === 'veiculo-manutencao' || norm.includes('manutencao')) {
    return 'MAINTENANCE';
  }

  return currentClassification !== 'COMMON' ? 'COMMON' : currentClassification;
}
