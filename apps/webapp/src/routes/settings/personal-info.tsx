import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronLeft, User, Mail } from 'lucide-react';

export const Route = createFileRoute('/settings/personal-info')({
  component: PersonalInfoPage,
});

function PersonalInfoPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-4">
        <Link
          to="/settings"
          className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-smooth"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Informações Pessoais</h1>
          <p className="text-muted-foreground text-sm">Gerencie como você é identificado no app.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4 p-8 card-premium bg-muted/20">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold">
            NB
          </div>
          <button className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">
            Alterar Foto
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">
              Nome Completo
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-smooth" />
              <input
                type="text"
                defaultValue="Nilton"
                className="w-full bg-muted/40 border-border rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">
              E-mail
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-smooth" />
              <input
                type="email"
                defaultValue="nilton@example.com"
                className="w-full bg-muted/40 border-border rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-smooth"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button className="flex-1 py-3 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-smooth">
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}
