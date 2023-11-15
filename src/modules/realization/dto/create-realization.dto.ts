import { RealizationTypeEnum, StatusEnum } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDecimal, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { CreateFileDto } from 'src/modules/file_upload/dto/create-file-upload.dto';

export class CreateRealizationDto {
  // @IsNumber()
  // @Type(() => Number)
  years: number;

  // @Type(() => Number)
  month: number;

  // @Type(() => Number)
  costCenter: String;

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

  uploadfile: CreateFileDto[];

  realizationItems: CreateRealizationItem[];

  static fromRequest(data: CreateRealizationDto): CreateRealizationDto {
    data.years = Number(data.years);
    data.month = Number(data.month);
    data.costCenter = String(data.costCenter);
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

export class BudgetReallocation {
  years;
  glAccountId;
  costCenterId;
  plus;
  minus;
  createdAt;
  createdBy;
  updatedAt;
  updatedBy;
}
