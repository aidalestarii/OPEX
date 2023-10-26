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

  @IsString()
  indikatorKeuangan: string;

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
    value01: { dataType: 'Object', maxLength: 300 },
    value02: { dataType: 'string', maxLength: 300 },
    value03: { dataType: 'Object', maxLength: 300 },
    value04: { dataType: 'Object', maxLength: 300 },
    value05: { dataType: 'Object', maxLength: 300 },
    value06: { dataType: 'Object', maxLength: 300 },
    value07: { dataType: 'Object', maxLength: 300 },
    value08: { dataType: 'Object', maxLength: 300 },
    value09: { dataType: 'Object', maxLength: 300 },
    value10: { dataType: 'Object', maxLength: 300 },
    value11: { dataType: 'Object', maxLength: 300 },
    value12: { dataType: 'Object', maxLength: 300 },
    value13: { dataType: 'Object', maxLength: 300 },
    value14: { dataType: 'Object', maxLength: 300 },
    value15: { dataType: 'Object', maxLength: 300 },
    value16: { dataType: 'Object', maxLength: 300 },
  };

  static propertyNames: (keyof ItemsBudgetUploadDto)[] = [
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
