// update-kurs.dto.ts

import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDecimal } from 'class-validator';

export class UpdateKursDto {
  @IsOptional()
  @IsNotEmpty()
  @IsDecimal()
  value?: number; // Nilai kurs yang ingin diperbarui

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  years?: number; // Tahun kurs yang ingin diperbarui

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  updatedBy: string; // Penyunting kurs yang ingin diperbarui
}
