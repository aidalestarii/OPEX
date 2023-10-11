import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMGlAccountDto {

    @IsNotEmpty()
    @IsString()
    uniqueId: string;

    @IsNotEmpty()
    @IsString()
    group: string;

    @IsNotEmpty()
    @IsString()
    groupDetail: string;

    @IsNotEmpty()
    @IsNumber()
    glAccount: number;

    @IsNotEmpty()
    @IsBoolean()
    sap: boolean;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsDateString()
    createdAt: string;

    @IsNotEmpty()
    @IsString()
    createdBy: string;

    @IsDateString()
    updatedAt: string;

    @IsString()
    updatedBy: string;

}
