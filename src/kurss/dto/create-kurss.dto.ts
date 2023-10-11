import { IsNotEmpty, IsInt, IsString, IsNumber, IsOptional, IsDateString, IsDecimal } from 'class-validator';

export class CreateKurssDto {
    @IsNotEmpty()
    @IsString()
    uniqueId: string;

    @IsNotEmpty()
    @IsInt()
    years: number;

    @IsNotEmpty()
    @IsDecimal()
    value: number;

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
