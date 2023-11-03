import {
  IsNumber,
  IsNotEmpty,
  IsDate,
  IsString,
  IsOptional,
} from 'class-validator';
import { StringNumberBigintObject } from 'src/core/types/string-number-bigint-object.types';

export class ItemsBudgetUploadDto {
  @IsNotEmpty()
  @IsNumber()
  years: number;

  // @IsNotEmpty()
  @IsNumber()
  idGlAccount: number;

  // @IsNotEmpty()
  @IsNumber()
  idCostCenter: number;

  @IsOptional()
  @IsNumber()
  value01: number;

  @IsOptional()
  @IsNumber()
  value02: number;

  @IsOptional()
  @IsNumber()
  value03: number;

  @IsOptional()
  @IsNumber()
  value04: number;

  @IsOptional()
  @IsNumber()
  value05: number;

  @IsOptional()
  @IsNumber()
  value06: number;

  @IsOptional()
  @IsNumber()
  value07: number;

  @IsOptional()
  @IsNumber()
  value08: number;

  @IsOptional()
  @IsNumber()
  value09: number;

  @IsOptional()
  @IsNumber()
  value10: number;

  @IsOptional()
  @IsNumber()
  value11: number;

  @IsOptional()
  @IsNumber()
  value12: number;

  @IsOptional()
  @IsNumber()
  value13: number;

  @IsOptional()
  @IsNumber()
  value14: number;

  @IsOptional()
  @IsNumber()
  value15: number;

  @IsOptional()
  @IsNumber()
  value16: number;

  @IsOptional()
  @IsNumber()
  total: number;

  static propertyConfig: Partial<
    Record<
      keyof ItemsBudgetUploadDto,
      { dataType: StringNumberBigintObject; maxLength?: number }
    >
  > = {
    years: { dataType: 'number', maxLength: 300 },
    idCostCenter: { dataType: 'string', maxLength: 300 },
    idGlAccount: { dataType: 'number', maxLength: 300 },
    value01: { dataType: 'decimal', maxLength: 300 },
    value02: { dataType: 'decimal', maxLength: 300 },
    value03: { dataType: 'decimal', maxLength: 300 },
    value04: { dataType: 'decimal', maxLength: 300 },
    value05: { dataType: 'decimal', maxLength: 300 },
    value06: { dataType: 'decimal', maxLength: 300 },
    value07: { dataType: 'decimal', maxLength: 300 },
    value08: { dataType: 'decimal', maxLength: 300 },
    value09: { dataType: 'decimal', maxLength: 300 },
    value10: { dataType: 'decimal', maxLength: 300 },
    value11: { dataType: 'decimal', maxLength: 300 },
    value12: { dataType: 'decimal', maxLength: 300 },
    value13: { dataType: 'decimal', maxLength: 300 },
    value14: { dataType: 'decimal', maxLength: 300 },
    value15: { dataType: 'decimal', maxLength: 300 },
    value16: { dataType: 'decimal', maxLength: 300 },
  };

  static propertyNames: (keyof ItemsBudgetUploadDto)[] = [
    'years',
    'idCostCenter',
    'idGlAccount',
    'value01',
    'value02',
    'value03',
    'value04',
    'value05',
    'value06',
    'value07',
    'value08',
    'value09',
    'value10',
    'value11',
    'value12',
    'value13',
    'value14',
    'value15',
    'value16',
  ];
}
