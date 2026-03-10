import { Plus } from 'lucide-react';

export default function QuickAddFAB() {
  return (
    <button
      className="fixed bottom-6 right-6 z-50 sm:hidden flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-transform"
      aria-label="Nova Transação"
    >
      <Plus className="w-6 h-6" />
    </button>
  );
}
