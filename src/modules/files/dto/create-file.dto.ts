import { IsDateString, IsDecimal, IsNotEmpty, IsString } from "class-validator";

export class CreateFileDto {
    @IsNotEmpty()
    @IsString()
    uniqueId: string;

    @IsNotEmpty()
    @IsString()
    filename: string;

    @IsNotEmpty()
    @IsString()
    docName: string;

    @IsNotEmpty()
    @IsDecimal()
    docSize: string;

    @IsNotEmpty()
    @IsString()
    docType: string;

    @IsNotEmpty()
    @IsString()
    departmentBy: string;

    @IsNotEmpty()
    @IsDateString()
    createdAt: string;

    @IsNotEmpty()
    @IsString()
    createdBy: string;
}
