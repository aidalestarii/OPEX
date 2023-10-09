import { IsNotEmpty, IsInt, IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateKurssDto {
    @IsNotEmpty()
    @IsString()
    uniqueId: string;

    @IsNotEmpty()
    @IsInt()
    years: number;

    @IsNotEmpty()
    @IsNumber()
    value: number;

    @IsNotEmpty()
    @IsDateString()
    createdAt: string;

  @IsNotEmpty()
  @IsString()
  createdBy: string;
}
