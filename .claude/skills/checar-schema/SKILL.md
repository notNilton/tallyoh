---
name: checar-schema
description: Verifica se os DTOs do backend e os serviços estão alinhados com o schema.prisma atual, identificando campos ausentes, tipos errados ou modelos removidos ainda referenciados
---

Faça uma auditoria de consistência entre o schema Prisma e o código do backend.

## O que verificar

### 1. Enums

Leia `packages/database/prisma/schema.prisma` e liste todos os enums.
Compare com os imports nos DTOs em `apps/backend/src/**/dto/*.ts`.

Verifique:

- Enums importados que não existem mais no schema (ex: `CREDIT_CARD` removido de `AccountType`)
- Enums que existem no schema mas não são usados em nenhum DTO

### 2. Campos dos models principais

Para cada model relevante no schema (`Account`, `Transaction`, `Card`, `Vehicle`, etc.):

- Liste os campos obrigatórios e opcionais
- Compare com os DTOs correspondentes (`create-account.dto.ts`, etc.)
- Identifique campos no schema que estão faltando no DTO (se forem relevantes para a API)
- Identifique campos nos DTOs que não existem mais no schema

### 3. Referências a modelos removidos

Procure nos serviços por referências a:

- `prisma.creditCardStatement` — modelo removido
- `AccountType.CREDIT_CARD` — enum value removido
- `closingDay` / `dueDay` na Account — campos removidos
- `statementId` na Transaction — campo removido
- `prisma.goal` / `prisma.budget` — modelos removidos

```bash
grep -r "creditCardStatement\|CREDIT_CARD\|closingDay\|dueDay\|statementId\|prisma\.goal\|prisma\.budget" apps/backend/src/ --include="*.ts"
```

### 4. Relatório final

Apresente um relatório com:

- ✅ O que está correto e alinhado
- ⚠️ O que está desatualizado ou inconsistente
- 🔧 Sugestões de correção para cada problema encontrado
