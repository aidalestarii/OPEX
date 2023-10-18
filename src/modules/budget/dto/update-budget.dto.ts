import { PartialType } from '@nestjs/mapped-types';
import { CreateBudgetDto } from './create-budget.dto';
import { IsDateString, IsDecimal, IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";

export class UpdateBudgetDto extends PartialType(CreateBudgetDto) {

    @IsOptional()
    @IsNumber()
    years: number;

    @IsOptional()
    @IsNumber()
    idGlAccount: number;

    @IsOptional()
    @IsNumber()
    idCostCenter: number;

    @IsOptional()
    @IsDecimal()
    value01: number;

    @IsOptional()
    @IsDecimal()
    value02: number;

    @IsOptional()
    @IsDecimal()
    value03: number;

    @IsOptional()
    @IsDecimal()
    value04: number;

    @IsOptional()
    @IsDecimal()
    value05: number;

    @IsOptional()
    @IsDecimal()
    value06: number;

    @IsOptional()
    @IsDecimal()
    value07: number;

    @IsOptional()
    @IsDecimal()
    value08: number;

    @IsOptional()
    @IsDecimal()
    value09: number;

    @IsOptional()
    @IsDecimal()
    value10: number;

    @IsOptional()
    @IsDecimal()
    value11: number;

    @IsOptional()
    @IsDecimal()
    value12: number;

    @IsOptional()
    @IsDecimal()
    value13: number;

    @IsOptional()
    @IsDecimal()
    value14: number;

    @IsOptional()
    @IsDecimal()
    value15: number;

    @IsOptional()
    @IsDecimal()
    value16: number;

    @IsOptional()
    @IsDecimal()
    total: number;

    @IsNotEmpty()
    @IsString()
    updatedBy: string;
    
}
