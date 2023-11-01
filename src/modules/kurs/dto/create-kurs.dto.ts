import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDecimal,
  IsUUID,
} from 'class-validator';
import { randomUUID } from 'crypto';

export class CreateKursDto {
  //@IsNotEmpty()
  //@IsString()
  // @IsUUID()
  // Tidak ada processing di dto
  // uniqueId: string = randomUUID();

  @IsNotEmpty()
  @IsNumber()
  years: number;

  @IsNotEmpty()
  @IsDecimal()
  value: number;

  @IsNotEmpty()
  @IsString()
  createdBy: string;
}
