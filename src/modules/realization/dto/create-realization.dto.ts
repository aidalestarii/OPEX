import { IsInt, IsOptional, IsString, IsEnum } from 'class-validator';
import { RealizationTypeEnum, StatusEnum } from '@prisma/client';

export class CreateRealizationDto {
  @IsOptional() // Tandai opsional jika dibutuhkan
  @IsInt()
  years: number;

  @IsOptional()
  @IsInt()
  month: number;

  //   @IsInt()
  //   idCostCenter: number;

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

  statusId;

  @IsString()
  department: string;

  personalNumber;
  statusToId;

  @IsString()
  employeeNumber: string;

  @IsString()
  departmentTo: string;

  personalNumberTo;

  @IsString()
  employeeNumberTo: string;

  @IsString()
  createdBy: string;
}
