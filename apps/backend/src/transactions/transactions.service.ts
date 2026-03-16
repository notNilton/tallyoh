import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Transaction, Prisma } from '@project-budget/database';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ListTransactionsQuery } from './dto/list-transactions.query';

@Injectable()
export class TransactionsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(
    userId: string,
    query: ListTransactionsQuery,
  ): Promise<Transaction[]> {
    const {
      accountId,
      categoryId,
      search,
      type,
      classification,
      status,
      from,
      to,
      page = 1,
      limit = 20,
    } = query;

    return this.db.transaction.findMany({
      where: {
        userId,
        isActive: true,
        ...(accountId && { accountId }),
        ...(categoryId && { categoryId }),
        ...(classification && { classification }),
        ...(type && { type }),
        ...(status && { status }),
        ...(search && {
          description: { contains: search, mode: 'insensitive' },
        }),
        ...(from || to
          ? {
              date: {
                ...(from && { gte: from }),
                ...(to && { lte: to }),
              },
            }
          : {}),
      },
      include: {
        category: true,
        tags: true,
        account: true,
        refuelingLog: true,
      },
      orderBy: { date: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: string, userId: string): Promise<Transaction> {
    const transaction = await this.db.transaction.findFirst({
      where: { id, userId, isActive: true },
      include: {
        category: true,
        tags: true,
        account: true,
        refuelingLog: true,
      },
    });
    if (!transaction)
      throw new NotFoundException(`Transaction ${id} not found`);
    return transaction;
  }

  async create(
    userId: string,
    dto: CreateTransactionDto,
  ): Promise<Transaction> {
    const {
      accountId,
      categoryId,
      type,
      classification,
      isRecurring,
      amount,
      totalInstallments,
      date,
      description,
      notes,
      currencyCode,
      vehicleId,
      station,
      fuelType,
      currentKm,
      liters,
      pricePerLiter,
      maintenanceType,
      provider,
    } = dto;

    const parts =
      totalInstallments && totalInstallments > 1 ? totalInstallments : 1;
    const amountPerPart = Number(amount) / parts;

    if (parts > 1) {
      const firstDate = new Date(date);
      const created = await this.db.$transaction(async (tx) => {
        const inst = await tx.installment.create({
          data: {
            userId,
            totalAmount: new Prisma.Decimal(amount),
            totalParts: parts,
            description,
            date: firstDate,
          },
        });

        let firstTx: Transaction | null = null;
        for (let i = 1; i <= parts; i++) {
          const installmentDate = new Date(firstDate);
          installmentDate.setMonth(installmentDate.getMonth() + (i - 1));

          const isFirst = i === 1;
          const txData = {
            userId,
            accountId,
            categoryId,
            type,
            classification: classification ?? 'COMMON',
            isRecurring: isRecurring ?? false,
            amount: new Prisma.Decimal(amountPerPart),
            date: installmentDate,
            description:
              parts > 1 ? `${description} (${i}/${parts})` : description,
            notes,
            currencyCode: currencyCode ?? 'BRL',
            installmentId: inst.id,
            installmentNum: i,
            totalInstallments: parts,
            refuelingLog:
              isFirst && classification === 'FUEL' && vehicleId
                ? {
                    create: {
                      vehicleId,
                      fuelType: fuelType ?? undefined,
                      station,
                      odometer: new Prisma.Decimal(currentKm ?? 0),
                      fuelLiters: new Prisma.Decimal(liters ?? 0),
                      pricePerLiter: new Prisma.Decimal(pricePerLiter ?? 0),
                      isFullTank: true,
                    },
                  }
                : undefined,
            maintenanceLog:
              isFirst &&
              classification === 'MAINTENANCE' &&
              vehicleId &&
              maintenanceType
                ? {
                    create: {
                      vehicleId,
                      type: maintenanceType,
                      provider,
                      odometer:
                        typeof currentKm === 'number'
                          ? new Prisma.Decimal(currentKm)
                          : undefined,
                      description: notes,
                    },
                  }
                : undefined,
          };
          const t = await tx.transaction.create({
            data: txData,
            include: {
              category: true,
              tags: true,
              refuelingLog: true,
              maintenanceLog: true,
            },
          });
          if (i === 1) firstTx = t;
        }
        return firstTx!;
      });
      return created;
    }

    return this.db.transaction.create({
      data: {
        userId,
        accountId,
        categoryId,
        type,
        classification: classification ?? 'COMMON',
        isRecurring: isRecurring ?? false,
        amount: new Prisma.Decimal(amount),
        date: new Date(date),
        description,
        notes,
        currencyCode: currencyCode ?? 'BRL',
        refuelingLog:
          classification === 'FUEL' && vehicleId
            ? {
                create: {
                  vehicleId,
                  fuelType: fuelType ?? undefined,
                  station,
                  odometer: new Prisma.Decimal(currentKm ?? 0),
                  fuelLiters: new Prisma.Decimal(liters ?? 0),
                  pricePerLiter: new Prisma.Decimal(pricePerLiter ?? 0),
                  isFullTank: true,
                },
              }
            : undefined,
        maintenanceLog:
          classification === 'MAINTENANCE' && vehicleId && maintenanceType
            ? {
                create: {
                  vehicleId,
                  type: maintenanceType,
                  provider,
                  odometer:
                    typeof currentKm === 'number'
                      ? new Prisma.Decimal(currentKm)
                      : undefined,
                  description: notes,
                },
              }
            : undefined,
      },
      include: {
        category: true,
        tags: true,
        refuelingLog: true,
        maintenanceLog: true,
      },
    });
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const {
      accountId,
      categoryId,
      vehicleId,
      fuelType,
      currentKm,
      liters,
      pricePerLiter,
      station,
      maintenanceType,
      provider,
      classification,
      amount,
      date,
      ...rest
    } = dto;

    await this.findOne(id, userId);

    return this.db.transaction.update({
      where: { id },
      data: {
        ...rest,
        classification,
        amount: amount ? new Prisma.Decimal(amount) : undefined,
        date: date ? new Date(date) : undefined,
        account: accountId ? { connect: { id: accountId } } : undefined,
        category: categoryId ? { connect: { id: categoryId } } : undefined,
        refuelingLog:
          classification === 'FUEL' && vehicleId
            ? {
                upsert: {
                  create: {
                    vehicleId,
                    fuelType: fuelType ?? undefined,
                    station,
                    odometer: new Prisma.Decimal(currentKm ?? 0),
                    fuelLiters: new Prisma.Decimal(liters ?? 0),
                    pricePerLiter: new Prisma.Decimal(pricePerLiter ?? 0),
                    isFullTank: true,
                  },
                  update: {
                    vehicleId,
                    fuelType: fuelType ?? undefined,
                    station,
                    odometer: new Prisma.Decimal(currentKm ?? 0),
                    fuelLiters: new Prisma.Decimal(liters ?? 0),
                    pricePerLiter: new Prisma.Decimal(pricePerLiter ?? 0),
                  },
                },
              }
            : undefined,
        maintenanceLog:
          classification === 'MAINTENANCE' && vehicleId && maintenanceType
            ? {
                upsert: {
                  create: {
                    vehicleId,
                    type: maintenanceType,
                    provider,
                    odometer:
                      typeof currentKm === 'number'
                        ? new Prisma.Decimal(currentKm)
                        : undefined,
                    description: rest.notes,
                  },
                  update: {
                    vehicleId,
                    type: maintenanceType,
                    provider,
                    odometer:
                      typeof currentKm === 'number'
                        ? new Prisma.Decimal(currentKm)
                        : undefined,
                    description: rest.notes,
                  },
                },
              }
            : undefined,
      },
      include: {
        category: true,
        tags: true,
        refuelingLog: true,
        maintenanceLog: true,
      },
    });
  }

  async remove(id: string, userId: string): Promise<Transaction> {
    await this.findOne(id, userId);
    return this.db.transaction.update({
      where: { id },
      data: { isActive: false, deletedAt: new Date() },
    });
  }
}
