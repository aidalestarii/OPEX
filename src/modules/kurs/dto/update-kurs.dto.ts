import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty } from 'class-validator';
import { CreateKursDto } from './create-kurs.dto';

export class UpdateKursDto extends PartialType(CreateKursDto) {
  @IsNotEmpty()
  @IsString()
  updatedBy: string;
}
