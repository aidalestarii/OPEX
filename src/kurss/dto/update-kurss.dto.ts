import { PartialType } from '@nestjs/mapped-types';
import { CreateKurssDto } from './create-kurss.dto';
import { IsNotEmpty, IsString, IsNumber, IsDateString, IsDecimal } from 'class-validator';

export class UpdateKurssDto extends PartialType(CreateKurssDto) {
    @IsNotEmpty()
    @IsNumber()
    years: number;

    @IsNotEmpty()
    @IsDecimal()
    value: number;

    @IsDateString()
    updatedAt: string;

    @IsString()
    updatedBy: string;
}
