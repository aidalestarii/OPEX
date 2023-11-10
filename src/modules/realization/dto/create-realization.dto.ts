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
import { Type } from 'class-transformer';
import { IsDecimal, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class CreateRealization {
  @IsNumber()
  @Type(() => Number)
  years: number;

  @Type(() => Number)
  month: number;

  @Type(() => Number)
  costCenterId: number;

  @Type(() => Number)
  requestNumber: number;

  @Type(() => Number)
  taReff: number;

  @IsOptional()
  @IsEnum(RealizationTypeEnum)
  type: RealizationTypeEnum;

  readonly responsibleNopeg: string;
  readonly titleRequest: string;
  readonly noteRequest: string;
  statusId;
  statusToId;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusEnum;

  readonly department: string;
  readonly personalNumber: string;
  readonly departmentTo: string;
  readonly personalNumberTo: string;
  readonly createdBy: string;

  realizationItems: CreateRealizationItem[];
  // const amounts: number[] = realizationItems.map(item => item.amount);

  // static fromRequest(data: CreateRealization): CreateRealization {
  //   data.years = Number(data.years);
  //   data.month = Number(data.month);
  //   data.costCenterId = Number(data.costCenterId);
  //   data.requestNumber = Number(data.requestNumber);
  //   data.taReff = Number(data.taReff);
  //   data.realizationItems;

  //   return data;
  // }

  static fromRequest(data: CreateRealization): CreateRealization {
    data.years = Number(data.years);
    data.month = Number(data.month);
    data.costCenterId = Number(data.costCenterId);
    data.requestNumber = Number(data.requestNumber);
    data.taReff = Number(data.taReff);

    // Mendefinisikan nilai amount dari realizationItems
    if (Array.isArray(data.realizationItems)) {
      data.realizationItems = CreateRealizationItem.fromRequestArray(
        data.realizationItems,
      );
    }

    return data;
  }
}

export class CreateRealizationItem {
  @Type(() => Number)
  realizationId: number;
  @Type(() => Number)
  glAccountId: number;
  @Type(() => Number)
  amount: number;
  @Type(() => Number)
  amountSubmission: number;
  @Type(() => Number)
  amountHps?: number;
  @Type(() => Number)
  amountCorrection: number;
  readonly periodStart: Date;
  readonly periodFinish: Date;
  readonly remarkPby: string;
  readonly memo?: string;
  readonly descPby: string;
  readonly createdBy: string;

  // static fromRequest(data: CreateRealizationItem): CreateRealizationItem {
  //   data.amount = Number(data.amount);
  //   data.amountSubmission = Number(data.amountSubmission);
  //   data.amountHps = Number(data.amountHps);
  //   data.amountCorrection = Number(data.amountCorrection);
  //   return data;
  // }

  static fromRequestArray(
    data: CreateRealizationItem[],
  ): CreateRealizationItem[] {
    return data.map((item) => {
      item.amount = Number(item.amount);
      item.amountSubmission = Number(item.amountSubmission);
      item.amountHps = Number(item.amountHps);
      item.amountCorrection = Number(item.amountCorrection);
      item.glAccountId = Number(item.glAccountId);
      return item;
    });
  }
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
