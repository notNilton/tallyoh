import { IsOptional, IsString, IsUUID, ValidateIf } from 'class-validator';

export class ImportTransactionsDto {
  @IsUUID()
  @ValidateIf((o: ImportTransactionsDto) => !o.cardId)
  accountId?: string;

  @IsUUID()
  @IsOptional()
  cardId?: string;

  @IsString()
  @IsOptional()
  currencyCode?: string;
}
