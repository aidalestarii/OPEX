import { IsBoolean, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateMCostCenterDto {
  //cost_center, description, bidang, dinas, directorat,
  //group_dinas, profit center, active
  @IsNotEmpty()
  @IsString()
  uniqueId: string;

  @IsNotEmpty()
  @IsString()
  costCenter: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  bidang: string;

  @IsNotEmpty()
  @IsString()
  dinas: string;

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
  @IsDateString()
  createdBy: string;
}
