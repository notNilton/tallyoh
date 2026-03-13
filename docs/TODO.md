# TODO: Project Budget - Status de Implementação

Com base nos documentos de design detalhados e no estado atual da base de código (`apps/backend` e `apps/webapp`), aqui está o status macro das implementações e as próximas tarefas (TODOs) do projeto.

---

## ✅ FASE 0: Fundação e Infraestrutura (Concluído)

A infraestrutura e estrutura base do monorepo foram estabelecidas com sucesso.

- [x] **Backend (NestJS)**: Estrutura inicial e módulos core configurados (`app.module.ts`).
- [x] **Webapp (TanStack Start + Vite)**: Setup inicial extremamente otimizado com rotas baseadas em arquivos e UI Premium.
- [x] **Banco de Dados (Prisma + PostgreSQL)**: Módulo de banco (`database`) presente e configurado.
- [x] **Autenticação & Segurança (WorkOS)**: Módulos de `auth` e `users` implementados no backend.

---

## 🚀 FASE 1: MVP Essencial & UI Premium (Concluído)

O webapp foi simplificado e tornado mais prático, com todas as funcionalidades essenciais de interface prontas.

- [x] **Gestão de Contas**: Módulo `accounts` (Backend) e tela `accounts.tsx` funcional no Webapp.
- [x] **Motor de Lançamentos**: Módulo `transactions` (Backend) e tela `transactions.tsx` completa com filtros avançados.
- [x] **Categorização**: Módulo `categories` (Backend) criado e suporte na UI.
- [x] **Importação de Dados (OFX/CSV)**: Fluxo de importação (`import.tsx`) implementado.
- [x] **Dashboards**: Rota raiz (`index.tsx`) com resumo financeiro completo (Net Worth, Safe-to-Spend).
- [x] **Quick Add**: Modal de transação rápido e FAB funcional em todas as telas.
- [x] **Modo Oculto (Privacy Mode)**: Suporte global via componente `PrivacyAmount`.

---

## ✨ FASE 2: Experiência Completa & Evolução (Em Produção)

A fase de evolução foi integrada em uma interface centralizada e prática, facilitando o acompanhamento de metas e veículos.

- [x] **Evolução Financeira**: Tela `evolution.tsx` consolidando Orçamentos, Metas e Combustível.
- [x] **Gestão de Metas (Goals)**: Interface de acompanhamento de sonhos e reserva de emergência concluída.
- [x] **Módulo de Veículos (Fleet)**: Gestão de abastecimentos e eficiência integrada na aba de Evolução.
- [x] **Orçamentos Avançados**: Visualização de limites por categoria e insights de gasto.
- [ ] **Integração Real (Backend)**: Conectar todos os mocks da UI aos serviços reais do NestJS.
- [ ] **Cartões de Crédito Inteligentes**: Implementar lógica de faturas e conciliação.
- [ ] **Recorrência & Parcelamentos**: Implementar desdobramento automático no backend.

---

## 💰 FASE 4: Recursos Avançados (Planejado)

- [ ] **Colaboração Familiar**: Contas compartilhadas e divisão de gastos (Split).
- [ ] **Calendário Financeiro**: Notificações e visão mensal de vencimentos.

---
