import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Account, AccountType } from '@project-budget/database';

export interface CreateAccountDto {
  name: string;
  type: AccountType;
  color?: string;
  icon?: string;
  currencyCode?: string;
  balance?: number;
  creditLimit?: number;
  closingDay?: number;
  dueDay?: number;
  includeInTotal?: boolean;
}

export interface UpdateAccountDto {
  name?: string;
  type?: AccountType;
  color?: string;
  icon?: string;
  currencyCode?: string;
  balance?: number;
  creditLimit?: number;
  closingDay?: number;
  dueDay?: number;
  includeInTotal?: boolean;
  isActive?: boolean;
}

@Injectable()
export class AccountsService {
  constructor(private readonly db: DatabaseService) {}

  findAll(userId: string): Promise<Account[]> {
    return this.db.account.findMany({
      where: { userId, isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string, userId: string): Promise<Account> {
    const account = await this.db.account.findFirst({
      where: { id, userId, isActive: true },
    });
    if (!account) throw new NotFoundException(`Account ${id} not found`);
    return account;
  }

  create(userId: string, dto: CreateAccountDto): Promise<Account> {
    return this.db.account.create({
      data: {
        userId,
        name: dto.name,
        type: dto.type,
        color: dto.color,
        icon: dto.icon,
        currencyCode: dto.currencyCode || 'BRL',
        balance: (dto.balance || 0) as unknown as never,
        creditLimit: dto.creditLimit as unknown as never,
        closingDay: dto.closingDay,
        dueDay: dto.dueDay,
        includeInTotal: dto.includeInTotal ?? true,
      },
    });
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateAccountDto,
  ): Promise<Account> {
    await this.findOne(id, userId);
    return this.db.account.update({
      where: { id },
      data: {
        ...dto,
        balance:
          dto.balance !== undefined
            ? (dto.balance as unknown as never)
            : undefined,
        creditLimit:
          dto.creditLimit !== undefined
            ? (dto.creditLimit as unknown as never)
            : undefined,
      },
    });
  }

  async remove(id: string, userId: string): Promise<Account> {
    await this.findOne(id, userId);
    return this.db.account.update({
      where: { id },
      data: { isActive: false, deletedAt: new Date() },
    });
  }
}
