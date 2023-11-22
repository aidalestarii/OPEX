import { RealizationTypeEnum, StatusEnum } from '@prisma/client';
import { IsDecimal, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class UpdateRealizationDto {
  readonly years: number;
  readonly month: number;
  readonly costCenterId: number;
  readonly draftNumber: number;
  readonly requestNumber: number;
  readonly taReff: number;

  @IsOptional()
  @IsEnum(RealizationTypeEnum)
  type: RealizationTypeEnum;

  readonly responsibleNopeg: string;
  readonly titleRequest: string;
  readonly noteRequest: string;
  // readonly statusId: number;
  // readonly StatusToId: number;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusEnum;

  readonly department: string;
  readonly personalNumber: string;
  readonly departmentTo: string;
  readonly personalNumberTo: string;
  readonly createdBy: string;
  readonly realizationItems: UpdateRealizationItemDto[];
}

export class UpdateRealizationItemDto {
  readonly realizationId: number;
  readonly glAccountId: number;
  readonly amount: number;
  readonly amountSubmission: number;
  readonly amountHps?: number;
  readonly amountCorrection: number;
  readonly periodStart: Date;
  readonly periodFinish: Date;
  readonly remarkPby: string;
  readonly memo?: string;
  readonly descPby: string;
  readonly createdBy: string;
}
