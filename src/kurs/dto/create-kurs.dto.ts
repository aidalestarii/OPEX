import { IsNotEmpty, IsString, IsNumber, IsDateString, IsDecimal } from 'class-validator';

export class CreateKursDto {
    @IsNotEmpty()
    @IsString()
    uniqueId: string;

    @IsNotEmpty()
    @IsNumber()
    years: number;

    @IsNotEmpty()
    @IsDecimal()
    value: number;

    @IsNotEmpty()
    @IsString()
    createdBy: string;
}
