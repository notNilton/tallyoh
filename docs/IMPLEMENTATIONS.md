# Backend Implementation Guide

Este documento detalha as rotas de API e estruturas de dados necessárias no backend para suportar as funcionalidades implementadas no frontend (`webapp`).

## 1. Módulo de Transações

### Listagem de Transações

**Rota:** `GET /transactions`
**Parâmetros de Query:**

- `search` (string): Busca no campo de descrição.
- `type` (enum: `income`, `expense`): Filtro por tipo.
- `cat` (string): Filtro por categoria.
- `startDate` (ISO Date): Início do período.
- `endDate` (ISO Date): Fim do período.

**Resposta Esperada:**

```json
[
  {
    "id": "uuid",
    "date": "2026-03-12",
    "desc": "Supermercado Silva",
    "cat": "Alimentação",
    "account": "Nubank",
    "val": -184.5,
    "type": "expense",
    "isRecurring": false
  }
]
```

### Criar/Editar Transação

**Rota:** `POST /transactions` | `PUT /transactions/:id`
**Campos Base:**

- `type` (enum: `common`, `fuel`)
- `isExpense` (boolean)
- `description` (string)
- `value` (decimal)
- `date` (date)
- `categoryId` (uuid)
- `accountId` (uuid)
- `isRecurring` (boolean)
- `notes` (text)
- `attachments` (multipart/form-data - placeholder)

**Campos Específicos para `type: fuel`:**

- `vehicleId` (uuid)
- `station` (string)
- `fuelType` (enum: `Gasolina`, `Etanol`, etc)
- `currentKm` (integer)
- `liters` (decimal)

---

## 2. Módulo de Veículos (Evolução)

### Estatísticas de Performance

**Rota:** `GET /vehicles/:id/stats`
**Campos no JSON:**

- `avgConsumption`: km/L médio.
- `avgCost`: Custo médio por abastecimento.
- `autonomy`: KM estimado com tanque atual.

### Histórico de Abastecimento

**Rota:** `GET /vehicles/:id/fuel-history`
**Filtro sugerido:** Últimos 6 meses por padrão.

---

## 3. Configurações e Perfil

### Perfil do Usuário

- `GET /user/me`: Retorna nome, email e URL do avatar.
- `PATCH /user/me`: Atualiza nome e email.
- `POST /user/avatar`: Upload de nova foto de perfil.

### Segurança e Dados

- `POST /user/change-password`: Payload `{ currentPassword, newPassword }`.
- `PATCH /user/preferences`: Payload `{ privacyModeEnabled: boolean }`.
- `DELETE /user/purge`: Apaga todos os dados do usuário (LGPD/GDPR compliance).

## Próximos Passos (Backend)

1. Definir Schema do Prisma (ou DB de escolha).
2. Implementar Middlewares de Autenticação (JWT sugerido).
3. Criar Controllers para cada entidade acima.
