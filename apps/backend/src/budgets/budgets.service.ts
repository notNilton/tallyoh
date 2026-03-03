import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Budget } from '@project-budget/database';

export interface CreateBudgetDto {
  categoryId?: string;
  amountLimit: number;
  month: number;
  year: number;
  rolloverAmount?: number;
}

export interface UpdateBudgetDto {
  amountLimit?: number;
  rolloverAmount?: number;
}

@Injectable()
export class BudgetsService {
  constructor(private readonly db: DatabaseService) {}

  findAll(userId: string, year?: number, month?: number): Promise<Budget[]> {
    return this.db.budget.findMany({
      where: {
        userId,
        ...(year && { year }),
        ...(month && { month }),
      },
      include: { category: true },
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    });
  }

  async findOne(id: string, userId: string): Promise<Budget> {
    const budget = await this.db.budget.findFirst({
      where: { id, userId },
      include: { category: true },
    });
    if (!budget) throw new NotFoundException(`Budget ${id} not found`);
    return budget;
  }

  create(userId: string, dto: CreateBudgetDto): Promise<Budget> {
    return this.db.budget.upsert({
      where: {
        userId_categoryId_month_year: {
          userId,
          categoryId: dto.categoryId || null,
          month: dto.month,
          year: dto.year,
        },
      },
      create: {
        userId,
        categoryId: dto.categoryId,
        amountLimit: dto.amountLimit as unknown as never,
        month: dto.month,
        year: dto.year,
        rolloverAmount: (dto.rolloverAmount || 0) as unknown as never,
      },
      update: {
        amountLimit: dto.amountLimit as unknown as never,
        rolloverAmount: (dto.rolloverAmount || 0) as unknown as never,
      },
    });
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateBudgetDto,
  ): Promise<Budget> {
    await this.findOne(id, userId);
    return this.db.budget.update({
      where: { id },
      data: {
        amountLimit:
          dto.amountLimit !== undefined
            ? (dto.amountLimit as unknown as never)
            : undefined,
        rolloverAmount:
          dto.rolloverAmount !== undefined
            ? (dto.rolloverAmount as unknown as never)
            : undefined,
      },
    });
  }

  async remove(id: string, userId: string): Promise<Budget> {
    await this.findOne(id, userId);
    return this.db.budget.delete({ where: { id } });
  }
}
