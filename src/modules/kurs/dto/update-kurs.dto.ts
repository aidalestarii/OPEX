// update-kurs.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDecimal,
} from 'class-validator';

export class UpdateKursDto {
  @IsOptional()
  @IsNumber()
  value?: number; // Nilai kurs yang ingin diperbarui

  @IsOptional()
  @IsNumber()
  years?: number; // Tahun kurs yang ingin diperbarui

  @IsNotEmpty()
  @IsString()
  updatedBy: string; // Penyunting kurs yang ingin diperbarui
}
