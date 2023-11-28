import { PartialType } from '@nestjs/mapped-types';
import { CreateMasterStatusDto } from './create-master_status.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMasterStatusDto extends PartialType(CreateMasterStatusDto) {
  @IsNotEmpty()
  @IsString()
  updatedBy: string;
}
