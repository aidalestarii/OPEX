import { PartialType } from '@nestjs/mapped-types';
import { CreateMGlAccountDto } from './create-m_gl_account.dto';
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateMGlAccountDto extends PartialType(CreateMGlAccountDto) {
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

    @IsString()
    updatedBy: string;
}
