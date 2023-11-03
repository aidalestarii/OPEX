import { IsInt, IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';
import { Prisma, RealizationTypeEnum, StatusEnum } from '@prisma/client';

//

export class CreateRealizationDto {
  readonly years: number;
  readonly month: number;
  readonly costCenterId: number;
  readonly draftNumber: number;
  readonly requestNumber?: number;
  readonly taReff?: number;
  readonly type?: string;
  readonly responsibleNopeg: string;
  readonly titleRequest: string;
  readonly noteRequest: string;
  readonly status?: string;
  readonly statusId: number;
  readonly department: string;
  readonly personalNumber: string;
  readonly statusToId: number;
  readonly departmentTo: string;
  readonly personalNumberTo: string;
  readonly createdBy: string;
  readonly realizationItems: CreateRealizationItemDto[];
}

export class CreateRealizationItemDto {
  readonly glAccountId: number;
  readonly amount: number;
  readonly amountSubmission: number;
  readonly amountHps?: number;
  readonly amountCorrection?: number;
  readonly periodStart: Date;
  readonly periodFinish: Date;
  readonly descPby: string;
  readonly remarkPby: string;
  readonly memo?: string;
}
