import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  MaxLength,
} from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  licensePlate?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  make?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  model?: string;

  @IsInt()
  @IsOptional()
  year?: number;
}
