import {
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateRefuelingLogDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  odometer: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  fuelLiters: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  pricePerLiter: number;

  @IsBoolean()
  @IsOptional()
  isFullTank?: boolean;
}
