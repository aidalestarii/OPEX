import {
    IsInt,
    IsOptional,
    IsString,
    IsEnum,
    IsNumber,
    IsNotEmpty,
  } from 'class-validator';
  import { Prisma, RealizationTypeEnum, StatusEnum } from '@prisma/client';
  
  export class CreateRealizationDto {
    years: number;
  
    month: number;
  
    costCenterId: number;
  
    draftNumber: number;
  
    @IsOptional()
    requestNumber: number;
  
    @IsOptional()
    taReff: number;
  
    @IsOptional()
    type: string;
  
    responsibleNopeg: string;
  
    titleRequest: string;
  
    noteRequest: string;
  
    @IsOptional()
    status: string;
  
    statusId: number;
  
    department: string;
  
    personalNumber: string;
  
    statusToId: number;
  
    departmentTo: string;
  
    personalNumberTo: string;
  
    @IsNotEmpty()
    @IsString()
    createdBy: string;
  }