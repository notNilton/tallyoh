import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { CreateRefuelingLogDto } from './dto/create-refueling-log.dto';
import { Vehicle, RefuelingLog } from '@project-budget/database';

@Injectable()
export class VehiclesService {
  constructor(private readonly database: DatabaseService) {}

  async findAll(userId: string): Promise<Vehicle[]> {
    return this.database.vehicle.findMany({
      where: { userId, isActive: true },
    });
  }

  async findOne(id: string, userId: string): Promise<Vehicle> {
    const vehicle = await this.database.vehicle.findFirst({
      where: { id, userId, isActive: true },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    return vehicle;
  }

  async create(userId: string, dto: CreateVehicleDto): Promise<Vehicle> {
    return this.database.vehicle.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    await this.findOne(id, userId);

    return this.database.vehicle.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string, userId: string): Promise<Vehicle> {
    await this.findOne(id, userId);

    return this.database.vehicle.update({
      where: { id },
      data: { isActive: false, deletedAt: new Date() },
    });
  }

  async addRefueling(
    vehicleId: string,
    transactionId: string,
    dto: CreateRefuelingLogDto,
  ): Promise<RefuelingLog> {
    return this.database.refuelingLog.create({
      data: {
        ...dto,
        vehicleId,
        transactionId,
      },
    });
  }

  async getRefuelings(
    vehicleId: string,
    userId: string,
  ): Promise<RefuelingLog[]> {
    await this.findOne(vehicleId, userId);

    return this.database.refuelingLog.findMany({
      where: { vehicleId },
      include: { transaction: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getStats(vehicleId: string, userId: string) {
    await this.findOne(vehicleId, userId);

    const logs = await this.database.refuelingLog.findMany({
      where: { vehicleId },
      orderBy: { odometer: 'desc' },
      take: 4, // Need 4 logs to get 3 consumption intervals
      include: { transaction: true },
    });

    if (logs.length < 2) {
      return {
        avgConsumption: 0,
        avgCost: 0,
        autonomy: 0,
      };
    }

    // Average Consumption (KM/L)
    let totalKm = 0;
    let totalLiters = 0;
    for (let i = 0; i < logs.length - 1; i++) {
      const diff = Number(logs[i].odometer) - Number(logs[i + 1].odometer);
      if (diff > 0) {
        totalKm += diff;
        totalLiters += Number(logs[i].fuelLiters);
      }
    }
    const avgConsumption = totalLiters > 0 ? totalKm / totalLiters : 0;

    // Average Cost
    const last3Logs = logs.slice(0, 3);
    const avgCost =
      last3Logs.reduce((acc, log) => acc + Number(log.transaction.amount), 0) /
      last3Logs.length;

    // Autonomy (Estimated with 50L tank if not specified, placeholder logic)
    const autonomy = avgConsumption * 50;

    return {
      avgConsumption: parseFloat(avgConsumption.toFixed(2)),
      avgCost: parseFloat(avgCost.toFixed(2)),
      autonomy: Math.round(autonomy),
    };
  }
}
