# 🗄️ Project Budget - Database Package (`@project-budget/database`)

Este pacote é o Single Source of Truth para todas as regras de esquema (Schema) tabulares, orquestração de banco de dados e tipagens inferíveis exportadas para todo o monorepo do **Project Budget**.

Nós utilizamos o **Prisma ORM** como motor principal de relacionamento e queries sob um banco **PostgreSQL**. A infraestrutura acessória também abriga o cache/filas através do **Redis**.

## 📑 Responsabilidades do Pacote

- **Modelagem Centralizada**: Manter a estabilidade das tabelas relacionais do banco que refletem a lógica de "Partidas Dobradas" (Double-entry Bookkeeping).
- **Tipagem Automática Estrita**: Todo o esquema do Prisma repassa seus `Models` e `Enums` para a stack de consumo (incluindo o `apps/backend`). Se uma coluna muda aqui, toda a DTO no backend se atualiza (ou aponta erros) automaticamente após geração.
- **Convenção de Nomeação (Snake_Case)**: Na modelagem do `@prisma/client`, os modelos JS em Nivel de Aplicação usam `camelCase/PascalCase`, porém o Banco de Dados físico será _estritamente_ mapeado com colunas e tabelas `snake_case` (Configurados com os decorators `@@map` e `@map`).
- **Orquestração Containerizada**: O provisionamento da infraestrutura local de dev via `docker-compose.yml`.

---

## 🚀 Uso e Comandos (Dentro deste Pacote)

Normalmente recomenda-se utilizar as macros disponíveis no _Root_ do Monorepo. No entanto, em caso de manutenção estrita neste pacote, aqui estão os atalhos e utilidades.

### Pré-requisitos

> Garanta possuir um arquivo `.env` mapeado contendo sua `DATABASE_URL` (Vide `.env.example`). O arquivo `.env` não é empurrado via git.

### Infraestrutura

Para subir dinamicamente os containers PostgreSQL 18 e Redis 7 associados a este Workspace:

```bash
npm run docker:up    # Inicia e deixa rodando em background (-d)
npm run docker:down  # Tira a infraestrutura do ar
```

### Prisma e Migrations

Comandos para manipulação dos schemas (requer que a _Infraestrutura_ esteja online nas portas exportadas):

- **`npm run db:migrate`** (Recomendado):
  Lê o seu `schema.prisma`, deduz se ele está diferente do estado do banco, compila o histórico e dispara uma migração real (como se atualizaria em Prod). Exigirá que você dê um nome descritivo para cada migração via cli.

- **`npm run db:generate`**:
  Não escreve no Banco e não confere portas, ela apenas lê sua estrutura local `schema.prisma` mais atualizada e transpila para TypeScript, inferindo novas tipagens estritas globalmente na pasta `/dist` ou `/node_modules/@prisma/client` para os projetos que acessam as Models.

- **`npm run db:reset`**:
  Destrói os dados das tabelas, executa drop forçado em tudo e reconstroi limpo. Usado quando o histórico corrompe durante fases iniciais de debug local.

- **`npm run db:studio`**:
  Abre um Editor/Grid web para navegação, adição e visualização CRUD rápida dentro do seu banco (`localhost:5555`).

## 🧱 Como Importar a Base

Para projetos que compõem a workspace lerem o Prisma Client construído aqui, basta acessar as instâncias importando do escopo exportado em `@project-budget/database`.

```typescript
import { PrismaClient, TransactionStatus } from '@project-budget/database';

const prisma = new PrismaClient();
// Tipagens globais limpas acessiveis fora da pasta packages/database
```
