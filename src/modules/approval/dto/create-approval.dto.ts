import { StatusEnum } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class ApprovalDto {
  tableName: string;
  tableId: number;
  name: string;
  jabatan: string;
  unit: string;
  @IsEnum(StatusEnum)
  status: StatusEnum;
  remark?: string;
  createdBy: string;
  statusId: number;

  @IsOptional()
  statusToId: number;

  updatedBy: string;
}
