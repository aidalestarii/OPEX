import { RealizationTypeEnum, StatusEnum } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateRealizationDto {
  years: number;

  month: number;

  costCenterId: number;

  requestNumber: String;

  taReff: string;

  @IsOptional()
  @IsEnum(RealizationTypeEnum)
  type: RealizationTypeEnum;

  @IsString()
  @IsNotEmpty()
  responsibleNopeg: string;

  // @IsString()
  // @IsNotEmpty()
  titleRequest: string;

  // @IsString()
  // @IsNotEmpty()
  noteRequest: string;

  statusId: number;

  @IsOptional()
  statusToId: number;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusEnum;

  updatedBy: string;
  roleAssignment: JSON;

  department: string;

  personalNumber: string;

  departmentTo: string;

  personalNumberTo: string;
  contributors;

  realizationItems: UpdateRealizationItemDto[];

  // @IsString()
  // @IsNotEmpty()
  // createdBy: string;

  // uploadfile: UpdateFileDto[];

  // realizationItems: UpdateRealizationItemDto[];

  // static fromRequest(data: UpdateRealizationDto): UpdateRealizationDto {
  //   data.years = Number(data.years);
  //   data.month = Number(data.month);
  //   data.requestNumber = String(data.requestNumber);
  //   data.taReff = Number(data.taReff);

  //   if (Array.isArray(data.realizationItems)) {
  //     data.realizationItems = UpdateRealizationItemDto.fromRequestArray(
  //       data.realizationItems,
  //     );
  //   }

  //   if (Array.isArray(data.uploadfile)) {
  //     data.uploadfile = UpdateFileDto.fromRequest(data.uploadfile);
  //   }

  //   return data;
  // }
}

export class UpdateRealizationItemDto {
  idRealizationItem: number;
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

  @Type(() => Number)
  amountApprove: number;

  periodStart: Date;

  periodFinish: Date;

  remarkPby: string;

  readonly memo?: string;

  @IsString()
  descPby: string;

  @IsString()
  createdBy: string;

  static fromRequestArray(
    data: UpdateRealizationItemDto[],
  ): UpdateRealizationItemDto[] {
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
