import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMCostCenterDto {
  @IsNotEmpty()
  @IsString()
  costCenter: string;

  @IsNotEmpty()
  @IsString()
  bidang: string;

  @IsNotEmpty()
  @IsString()
  dinas: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  directorat: string;

  @IsNotEmpty()
  @IsString()
  groupDinas: string;

  @IsNotEmpty()
  @IsString()
  profitCenter: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsString()
  createdBy: string;
}
