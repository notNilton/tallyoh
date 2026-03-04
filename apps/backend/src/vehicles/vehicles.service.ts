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
}
