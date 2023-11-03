import { IsInt, IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';
import { Prisma, RealizationTypeEnum, StatusEnum } from '@prisma/client';

export class CreateRealizationDto {
  @IsOptional() // Tandai opsional jika dibutuhkan
  @IsInt()
  years: number;

  @IsOptional()
  @IsInt()
  month: number;

  @IsInt()
  costCenterId: number;

  @IsInt()
  draftNumber: number;

  @IsOptional()
  @IsInt()
  requestNumber: number;

  @IsOptional()
  @IsInt()
  taReff: number;

  @IsEnum(RealizationTypeEnum)
  type: RealizationTypeEnum;

  @IsString()
  responsibleNopeg: string;

  @IsString()
  titleRequest: string;

  @IsString()
  noteRequest: string;

  @IsEnum(StatusEnum)
  status: StatusEnum;

  @IsInt()
  statusId: number;

  @IsString()
  department: string;

  personalNumber;
  statusToId;

  @IsString()
  departmentTo: string;

  personalNumberTo: string;

  @IsString()
  createdBy: string;

  realization_item: Prisma.RealizationItemCreateManyRealizationInput[];
}
