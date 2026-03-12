import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronLeft, Lock, Trash2, Eye } from 'lucide-react';

export const Route = createFileRoute('/settings/data-privacy')({
  component: DataPrivacyPage,
});

function DataPrivacyPage() {
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
          <h1 className="text-3xl font-display font-bold tracking-tight">Privacidade e Dados</h1>
          <p className="text-muted-foreground text-sm">
            Controle como seus dados são tratados e protegidos.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-4">
            Segurança
          </h3>
          <div className="card-premium divide-y divide-border overflow-hidden">
            <div className="p-4 flex items-center justify-between hover:bg-muted/30 transition-smooth cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm tracking-tight">Alterar Senha</p>
                  <p className="text-xs text-muted-foreground">Última alteração há 3 meses.</p>
                </div>
              </div>
              <ChevronLeft className="w-4 h-4 rotate-180 text-muted-foreground" />
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-muted/30 transition-smooth cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm tracking-tight">Modo Visibilidade</p>
                  <p className="text-xs text-muted-foreground">
                    Ocultar valores por padrão ao iniciar o app.
                  </p>
                </div>
              </div>
              <div className="w-10 h-5 bg-primary rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 px-4">
            Zona de Risco
          </h3>
          <div className="card-premium border-rose-500/20 bg-rose-500/5 p-4 flex items-center justify-between group cursor-pointer hover:bg-rose-500/10 transition-smooth">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-smooth">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm tracking-tight text-rose-500">
                  Excluir todos os dados
                </p>
                <p className="text-xs text-rose-500/70">Esta ação é irreversível.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
