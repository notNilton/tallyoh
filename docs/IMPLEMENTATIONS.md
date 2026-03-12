# Análise de Implementação do Backend (Integração com Webapp)

Com base nas recentes alterações do frontend (`apps/webapp`) para as telas de Contas, Metas (Goals) e Veículos (Fleet), foi identificada a necessidade de evoluir o backend (`apps/backend`) para suportar as operações solicitadas pelas novas interfaces visuais.

## 1. Módulo Accounts e Patrimônio Líquido

A tela `accounts.tsx` introduziu um resumo rico de contas agrupadas (Corrente, Investimento, Cartão) e um bloco de "Net Worth Summary". O atual controller (`AccountsController`) fornece apenas o CRUD básico.

**O que precisa ser implementado:**

- **Endpoint Analítico (`GET /accounts/summary` ou `GET /dashboard/net-worth`)**:
  - Realizar o cálculo do **Patrimônio Líquido** (Net Worth).
  - Retornar detalhadamente o **Total Ativos** (soma de saldos positivos e investimentos) e o **Total Passivos** (soma de faturas em aberto e saldos devedores).
- **Lógica de Cartões / Faturas (`CreditCardStatement`)**:
  - Implementar todo o core de cartões. O frontend já exibe o balanço negativo e limites dos cartões. O backend precisa ler do model `CreditCardStatement` já existente no banco e associar transações de tipo "despesa" à fatura em aberto corretamente (baseado no dia de fechamento).

## 2. Módulo de Veículos (Fleet Management)

A tela `vehicles.tsx` possui um dashboard focado no acompanhamento macro de cada veículo, o que ultrapassa o atual foco puramente no abastecimento (`RefuelingLog`).

**O que precisa ser implementado:**

- **Atualização do Schema de Banco de Dados**:
  - O schema atual foca apenas em abastecimentos (`RefuelingLog`). O frontend necessita mapear manutenções, trocas de óleo e despesas do tipo alerta (IPVA), exibidos como `MaintenanceItem` (com tipos `fuel`, `service`, `alert`). É imperativo criar um model `VehicleMaintenanceLog` no Prisma, ou refatorar o `RefuelingLog` para suportar as manutenções e despesas genéricas de frota apontando para uma `Transaction` base.
- **Endpoint Analítico (`GET /vehicles/:id/dashboard`)**:
  - Fornecer o **Odômetro Total** atual.
  - Calcular o **Custo Médio / Mês** do veículo, agregando as transações vinculadas e dividindo pelo período de histórico.
  - Retornar o timeline de últimos lançamentos unificado e a prévia da **Revisão Agendada**.

## 3. Módulo de Metas Financeiras (Goals)

A tela `goals.tsx` exige cálculos comparativos (status da meta) e um totalizador macro que envolve todo o portfólio de metas do usuário.

**O que precisa ser implementado:**

- **Endpoint Analítico (`GET /goals/summary`)**:
  - Total Acumulado em Metas (soma de todos os `currentAmount`).
  - Representatividade total (Percentual ou fatia comparada ao patrimônio líquido total do usuário).
- **Endpoint de Progresso (`POST /goals/:id/deposit` e `POST /goals/:id/withdraw`)**:
  - A interface gráfica sugere movimentar o dinheiro das metas. O backend deve receber esse input e atualizar não somente o campo numérico, mas potencialmente gerar a `Transaction` correspondente associando o `goalId` (conforme especificado no Prisma) para garantir rastreabilidade contábil.

---

**Conclusão**: O backend provisionou corretamente os recuros básicos de CRUDs no NestJS, mas falta a camada analítica de dados (`Aggregations`) e os serviços orquestradores que mesclam recursos transacionais (ex: registrar avanço numa meta enquanto cria uma transação no ledger) para suportar a rica e densa experiência da interface gráfica desenvolvida.
