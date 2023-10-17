import { PartialType } from '@nestjs/mapped-types';
import { CreateMCostCenterDto } from './create-m_cost_center.dto';
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class UpdateMCostCenterDto extends PartialType(CreateMCostCenterDto) {

    @IsNotEmpty()
    @IsString()
    costCenter: string;

    @IsNotEmpty()
    @IsString()
    unit: string;

    @IsNotEmpty()
    @IsString()
    bidang: string;

    @IsNotEmpty()
    @IsString()
    dinas: string;

    @IsNotEmpty()
    @IsString()
    groupDinas: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    profitCenter: string;

    @IsNotEmpty()
    @IsDateString()
    createdAt: string;

    @IsNotEmpty()
    @IsString()
    createdBy: string;

    @IsString()
    updatedBy: string;
}
