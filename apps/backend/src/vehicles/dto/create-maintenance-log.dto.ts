import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  Min,
} from 'class-validator';
import { MaintenanceType } from '@project-budget/database';

export class CreateMaintenanceLogDto {
  @IsEnum(MaintenanceType)
  @IsNotEmpty()
  type: MaintenanceType;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  odometer?: number;

  @IsString()
  @IsOptional()
  provider?: string;
}
