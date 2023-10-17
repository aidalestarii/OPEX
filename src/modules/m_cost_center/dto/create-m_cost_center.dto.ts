import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateMCostCenterDto {
    @IsNotEmpty()
    @IsString()
    uniqueId: string;

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
