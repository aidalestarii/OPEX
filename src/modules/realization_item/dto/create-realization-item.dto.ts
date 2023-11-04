import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRealizationItemDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  amountSubmission: number;

  @IsOptional()
  amountHps: number;

  @IsOptional()
  amountCorrection: number;

  periodStart: number;

  periodFinish: number;

  @IsNotEmpty()
  @IsString()
  descPby: string;

  @IsNotEmpty()
  @IsString()
  remarkPby: string;

  @IsOptional()
  @IsString()
  memo: string;

  @IsNotEmpty()
  @IsString()
  createdBy: string;
}