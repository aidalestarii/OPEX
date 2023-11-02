import {
  IsDateString,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateBudgetDto {
  @IsNotEmpty()
  @IsString()
  uniqueId: string;

  @IsNotEmpty()
  @IsNumber()
  years: number;

  @IsNotEmpty()
  @IsNumber()
  glAccountId: number;

  @IsNotEmpty()
  @IsNumber()
  costCenterId: number;

  @IsNotEmpty()
  @IsDecimal()
  value01: number;

  @IsNotEmpty()
  @IsDecimal()
  value02: number;

  @IsNotEmpty()
  @IsDecimal()
  value03: number;

  @IsNotEmpty()
  @IsDecimal()
  value04: number;

  @IsNotEmpty()
  @IsDecimal()
  value05: number;

  @IsNotEmpty()
  @IsDecimal()
  value06: number;

  @IsNotEmpty()
  @IsDecimal()
  value07: number;

  @IsNotEmpty()
  @IsDecimal()
  value08: number;

  @IsNotEmpty()
  @IsDecimal()
  value09: number;

  @IsNotEmpty()
  @IsDecimal()
  value10: number;

  @IsNotEmpty()
  @IsDecimal()
  value11: number;

  @IsNotEmpty()
  @IsDecimal()
  value12: number;

  @IsNotEmpty()
  @IsDecimal()
  value13: number;

  @IsNotEmpty()
  @IsDecimal()
  value14: number;

  @IsNotEmpty()
  @IsDecimal()
  value15: number;

  @IsNotEmpty()
  @IsDecimal()
  value16: number;

  @IsNotEmpty()
  @IsDecimal()
  total: number;

  @IsNotEmpty()
  @IsString()
  createdBy: string;
}
