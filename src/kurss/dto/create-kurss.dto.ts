import { IsNotEmpty, IsString, IsNumber, IsDateString, IsDecimal } from 'class-validator';

export class CreateKurssDto {
    @IsNotEmpty()
    @IsString()
    uniqueId: string;

    @IsNotEmpty()
    @IsNumber()
    years: number;

    @IsNotEmpty()
    @IsDecimal()
    value: number;

    @IsDateString()
    createdAt: string;

    @IsNotEmpty()
    @IsString()
    createdBy: string;

}
