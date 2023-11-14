import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVariableDto {
  @IsNumber()
  value1: Number;
  @IsNumber()
  value2: Number;
  @IsNumber()
  value3: Number;
  @IsString()
  @IsOptional()
  createdBy: string;
}
