// import {
//   IsInt,
//   IsOptional,
//   IsString,
//   IsEnum,
//   IsNumber,
//   IsNotEmpty,
// } from 'class-validator';
// import { Prisma, RealizationTypeEnum, StatusEnum } from '@prisma/client';

import { integer } from '@elastic/elasticsearch/lib/api/types';
import { RealizationTypeEnum, StatusEnum } from '@prisma/client';
import { IsDecimal, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class CreateRealization {
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
  statusId: number = 1;
  statusToId: number = 1;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusEnum;

  readonly department: string;
  readonly personalNumber: string;
  readonly departmentTo: string;
  readonly personalNumberTo: string;
  readonly createdBy: string;
  readonly realizationItems: CreateRealizationItem[];
}

export class CreateRealizationItem {
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

export class MStatus {
  readonly type: string;
  readonly status: string;
  readonly step: number;
  readonly department: string;
  readonly level: number;
  readonly function: string;
  readonly createdBy: string;
}
