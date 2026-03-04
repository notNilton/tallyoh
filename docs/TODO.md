# TODO: Project Budget

## Fase 0: Fundação Técnica (Setup & Backend Core)

- [x] Configurar Workspace Monorepo (Turborepo + NestJS + Pacotes Isolados)
- [x] Mapear `DATABASE_DESIGN.md` para o Schema do Prisma
- [x] Criar pacotes base de conexão (`@project-budget/database`)
- [x] Construir CRUDs iniciais (`accounts`, `budgets`, `categories`, `goals`, `transactions`, `users`)
- [x] Implementar tipagem rígida e validação de payloads (`class-validator`, `class-transformer`)
- [x] **Segurança Total (WorkOS JWT Guard)**
  - [x] Implementar `AuthGuard` global lendo `Authorization: Bearer <token>`
  - [x] Remover `@Query('userId')` usando decorador `@CurrentUser()`
- [x] Modelagem de Frota/Veículos (`Vehicle`, `RefuelingLog`)

## Fase 1: MVP Essencial (Motor e Regras de Negócio)

- [ ] **Lógica de Partidas Dobradas (Transferências)**
  - [ ] Adaptar `TransactionsService` para `TransactionType.TRANSFER` usando chamadas atômicas (`Prisma.$transaction`) para 2 contas
- [ ] **Motor de Reconciliação Automática (Triggers/Middlewares)**
  - [ ] Garantir recálculo on-the-fly do `balance` (Saldo da Conta) ao criar/editar/remover transações
- [ ] **Módulo da Frota (Veículos)**
  - [ ] Criar CRUD em Node.js (`apps/backend/src/vehicles`) para gerir hodômetro e acoplar com `Transaction`
- [ ] **Importação Massiva Assíncrona (OFX/CSV)**
  - [ ] Configuração de Redis + BullMQ
  - [ ] Endpoint de Upload c/ Parser
  - [ ] Job em background para salvar e não travar o HTTP Request
- [ ] **Dashboards & Analytics (CQRS Base)**
  - [ ] Endpoints agregados (Sum, Group By) para renderizar Saldo Mensal, Despesas por Categoria, Progresso do Budget
- [ ] **Frontend (Web/Mobile)**
  - [ ] Criar interface inicial React/Vite
  - [ ] Telas Principais: Dashboard, Lançamentos (Extrato), Contas, Orçamento

## Fase 2: Experiência Premium (Opcionais Futuros)

- [ ] **Mobile Offline-First:** WatermelonDB / SQLite local e Sync em Fila
- [ ] **Cartões de Crédito:** Lógica complexa de fechamento (data de corte, limite atrelado, juros rotativo)
- [ ] **Contas Grupo Familiar:** Lógica Role-based Access (Leitor/Editor) com pivot `AccountAccess`
- [ ] **Gamificação Básico:** Score Financeiro e Badges

## Fase 3+: Inteligência e Expansão

- [ ] **IA de Semântica:** Uso de LLM minificado (ou Regex Forte inicial) para auto-categorizar transações
- [ ] **Open Finance:** Importação plug-and-play leitura constante via Belvo/Pluggy
- [ ] **Dashboards Preditivos:** Simulador de Furo de Caixa (Forecast) em +3 meses
