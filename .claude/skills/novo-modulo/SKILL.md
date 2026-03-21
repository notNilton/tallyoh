---
name: novo-modulo
description: Scaffolda um novo módulo NestJS completo (module, controller, service, DTOs) e registra no app.module.ts
---

Crie um novo módulo NestJS no backend seguindo os padrões do projeto.

O nome do módulo é: **$ARGUMENTS**

## Padrão do projeto

Antes de criar, leia `apps/backend/src/app.module.ts` e um módulo existente (ex: `apps/backend/src/accounts/`) para seguir o mesmo padrão.

## Arquivos a criar

Para um módulo chamado `<nome>` (ex: `tags`), crie em `apps/backend/src/<nome>/`:

### `<nome>.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { <Nome>Controller } from './<nome>.controller';
import { <Nome>Service } from './<nome>.service';

@Module({
  controllers: [<Nome>Controller],
  providers: [<Nome>Service],
})
export class <Nome>Module {}
```

### `dto/create-<nome>.dto.ts`

- Use `class-validator` decorators (`@IsString`, `@IsOptional`, `@IsEnum`, `@MaxLength`, etc.)
- Derive os campos do que faz sentido para a entidade

### `dto/update-<nome>.dto.ts`

```typescript
import { PartialType } from '@nestjs/mapped-types';
import { Create<Nome>Dto } from './create-<nome>.dto';

export class Update<Nome>Dto extends PartialType(Create<Nome>Dto) {}
```

### `<nome>.service.ts`

- Injete `DatabaseService` via constructor
- Implemente: `findAll(userId)`, `findOne(id, userId)`, `create(userId, dto)`, `update(id, userId, dto)`, `remove(id, userId)`
- Soft delete: `{ isActive: false, deletedAt: new Date() }` — nunca `.delete()`

### `<nome>.controller.ts`

- Use `@UseGuards(JwtAuthGuard)` e `@ApiBearerAuth()`
- Extraia `userId` do JWT com `@Request() req`
- Rotas padrão: `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id`

## Após criar os arquivos

Registre o módulo em `apps/backend/src/app.module.ts` adicionando `<Nome>Module` ao array `imports`.

## Verificação final

Leia `apps/backend/src/app.module.ts` para confirmar que o módulo foi registrado corretamente.
