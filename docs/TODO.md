# TODO: Project Budget - Status de Implementação

Com base nos documentos de design detalhados em `docs/designs/PROJECT_DESIGN.md` e `DATABASE_DESIGN.md`, bem como no estado atual da base de código (`apps/backend` e `apps/webapp`), aqui está o status macro das implementações e as próximas tarefas (TODOs) do projeto.

---

## ✅ FASE 0: Fundação e Infraestrutura (Pré-MVP)

A infraestrutura e estrutura base do monorepo estão estabelecidas.

- [x] **Backend (NestJS)**: Estrutura inicial e módulos core configurados (`app.module.ts`).
- [x] **Webapp (TanStack Start + React)**: Rotas básicas e setup inicial implementados (`router.tsx`, `index.tsx`).
- [x] **Banco de Dados (Prisma + PostgreSQL)**: Módulo de banco (`database`) presente.
- [x] **Autenticação & Segurança (WorkOS)**: Módulos de `auth` e `users` implementados no backend.

---

## 🚀 FASE 1: MVP Essencial (Mês 1-3)

A maioria dos serviços de backend e telas do frontend já foram provisionados para o MVP.

- [x] **Gestão Básica de Contas**: Módulo `accounts` (Backend) e tela `accounts.tsx` (Webapp).
- [x] **Motor de Lançamentos**: Módulo `transactions` (Backend) e tela `transactions.tsx` (Webapp).
- [x] **Categorização**: Módulo `categories` (Backend) criado.
- [x] **Importação de Dados (OFX/CSV)**: Rota de importação (`import.tsx`) presente no webapp.
- [x] **Dashboards Básicos**: Rota raiz (`index.tsx`) provisionada.
- [x] **Orçamentos Básicos (Budget)**: Módulo `budgets` (Backend) e tela `budgets.tsx` (Webapp).
- [x] **Quick Add (Mobile)**: Otimização ou UI focada em mobile ainda precisa ser verificada/refinada.
- [x] **Modo Oculto (Privacy Mode)**: Verificar suporte na UI.
- [x] **Filtros e Relatórios no Extrato**: Validar se a busca/filtros estão ativos.

---

## ✨ FASE 2: Experiência Completa & Colaboração (Mês 4-6)

Alguns recursos de backend já se adiantaram (ex: Veículos e Metas), mas requerem integração no Frontend.

- [x] **Gestão de Metas (Goals)**: Módulo `goals` provisionado no Backend. (Falta Frontend).
- [x] **Gestão de Veículos (Fleet Module)**: Módulo `vehicles` provisionado no Backend. (Falta Frontend).
- [ ] **Telas de Metas e Veículos no Webapp**: Criar rotas e interfaces (`goals.tsx` e `vehicles.tsx`).
- [ ] **Cartões de Crédito Inteligentes**: Calcular melhor data/fatura. Falta implementação da lógica de conciliação.
- [ ] **Recorrência Avançada & Parcelamentos**: Implementar desdobramento de faturas.
- [ ] **Orçamentos Elásticos (Envelope Budgeting)**: Evoluir módulo atual de budgets.
- [ ] **Central de Dashboards Avançada**: Gráficos MoM, Net Worth, Sankey.
- [ ] **Calendário Financeiro / Notificações**.
- [ ] **Colaboração Familiar (Contas Compartilhadas)** e **Split (Divisão)**.
- [ ] **Gamificação Básica (Score e Badges)**.
- [ ] **App Mobile (Offline-first)**: Iniciativa futura (React Native/Expo).
- [ ] **Exportação para Imposto de Renda e PDF**.

---

## 🧠 FASE 3: Inteligência Artificial e Predição (Mês 7-12)

_(Nenhum item iniciado)_

- [ ] **IA de Categorização Semântica**.
- [ ] **Previsão de Saldo (Cashflow Forecasting)**.
- [ ] **Detecção de Anomalias**.
- [ ] **Chatbot Consultivo**.
- [ ] **Integração Open Finance**.
- [ ] **Micro-classificação Avançada (Tags & Projetos)**.
- [ ] **Upload e OCR de Comprovantes**.

---

## 💰 FASE 4: Marketplace e Open Finance Ativo (Ano 2)

_(Nenhum item iniciado)_

- [ ] **Comparador de Investimentos**.
- [ ] **Otimização de Crédito / Renegociação**.
- [ ] **Recuperação de Cashback e Taxas**.
- [ ] **Multimoedas e Conversão Estimativa**.
- [ ] **Tracking de Ativos Variáveis (Cripto/Ações)**.
- [ ] **Planos Premium (Monetização)**.

---

## 🌐 FASE 5: B2B2C e Educação (Ano 2)

_(Nenhum item iniciado)_

- [ ] **White Label para Empresas**.
- [ ] **Módulo Kids/Teen (Contas Dependentes)**.
- [ ] **Trilhas de Aprendizado Gamificadas**.
- [ ] **APIs Públicas e Ecossistema B2B2C**.

---

## 📌 Próximos Passos (Curto Prazo)

1. **Frontend**: Desenvolver as páginas/telas listadas em Phase 2 que já possuem suporte no Backend (ex: Metas e Veículos).
2. **Integração**: Conectar o Frontend ao Backend nos fluxos de autenticação, accounts e transactions, garantindo que o básico (CRUD) esteja liso.
3. **Cartões de Crédito**: Implementar a lógica de faturas (`CreditCardStatement`) em cima do módulo `accounts` atual.
