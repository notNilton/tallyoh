import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpsertUserDto {
  @IsString()
  @IsNotEmpty()
  workosId: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsUrl()
  @IsOptional()
  avatarUrl?: string;
}
