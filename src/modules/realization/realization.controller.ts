import {
  Bind,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { RealizationService } from './realization.service';
import {
  // CreateRealization,
  CreateRealizationDto,
  CreateRealizationItemDto,
} from './dto/create-realization.dto';
import {
  UpdateRealizationDto,
  UpdateRealizationItemDto,
} from './dto/update-realization.dto';
import {
  AnyFilesInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { extname } from 'path';
import { multerPdfOptions } from 'src/config/multer.config';
import { multerConfig } from 'src/config/multer-options.config';
import {
  CreateFileDto,
  CreateMDocCategoryDto,
} from './dto/create-file-upload.dto';
import { Request } from 'express';
import { validate, validateOrReject } from 'class-validator';
import { RealizationTypeEnum, StatusEnum } from '@prisma/client';
import { UpdateFileDto } from './dto/update-file-upload.dto';

@Controller({
  version: '1',
  path: 'api/realization',
})
export class RealizationController {
  constructor(private readonly realizationService: RealizationService) {}

  @Post(':status?')
  @UseInterceptors(AnyFilesInterceptor(multerPdfOptions))
  async saveRealization(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: Request,
    @Body(new ValidationPipe()) dto: CreateRealizationDto,
    @Body() dtoFile: CreateFileDto,
    @Param('status') status?: StatusEnum,
  ) {
    try {
      if (!dto.realizationItems || dto.realizationItems.length === 0) {
        throw new HttpException(
          'At least one realization item must be provided',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!files || files.length === 0) {
        throw new HttpException(
          'At least one file must be uploaded',
          HttpStatus.BAD_REQUEST,
        );
      }
      const fromRequest = CreateRealizationDto.fromRequest(dto);

      const realizationItems: CreateRealizationItemDto[] =
        fromRequest.realizationItems;

      const requiredFields = [
        'type',
        'responsibleNopeg',
        'titleRequest',
        'noteRequest',
        'personalNumber',
        'costCenterId',
        'createdBy',
        'amountSubmission',
        'periodStart',
        'periodFinish',
        'descPby',
        'remarkPby',
        'glAccountId',
        'docName',
        'docCategoryId',
      ];

      // const typeValidations = {
      //   responsibleNopeg: 'string',
      //   titleRequest: 'string',
      //   noteRequest: 'string',
      //   costCenterId: 'number',
      //   createdBy: 'string',
      //   descPby: 'string',
      //   remarkPby: 'string',
      //   docName: 'string',
      // };

      for (const field of requiredFields) {
        if (
          !dto[field] &&
          !(
            dto.realizationItems &&
            dto.realizationItems.every((item) => item[field])
          )
        ) {
          throw new HttpException(
            `Field ${field} is required`,
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      // for (const field in typeValidations) {
      //   if (
      //     !dto[field] &&
      //     !(
      //       dto.realizationItems &&
      //       dto.realizationItems.every(
      //         (item) => typeof item[field] === typeValidations[field],
      //       )
      //     )
      //   ) {
      //     throw new HttpException(
      //       `Field ${field} in realizationItems must be a ${typeValidations[field]}`,
      //       HttpStatus.BAD_REQUEST,
      //     );
      //   }
      // }

      const createFileDtos: CreateFileDto[] = (files ?? []).map(
        (file, index) => ({
          tableName: 'Realization',
          docName: dtoFile.docName[index],
          docLink: file.path,
          docSize: parseFloat((file.size / 1000000).toFixed(2)),
          docType: extname(file.originalname),
          createdBy: '',
          tableId: 1,
          docCategoryId: parseInt(dtoFile.docCategoryId[index]),
        }),
      );

      const realization = await this.realizationService.createRealization(
        fromRequest,
        realizationItems,
        createFileDtos,
        status,
      );

      return {
        data: realization,
        message: 'Create new request successfully created',
        status: HttpStatus.CREATED,
        time: new Date(),
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  findRealization() {
    return this.realizationService.findAllRealization();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.realizationService.findOneRealization(+id);
  }
}
