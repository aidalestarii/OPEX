import {
  Bind,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
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
  MStatusDto,
} from './dto/create-realization.dto';
import {
  UpdateRealization,
  UpdateRealizationItem,
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
import { validate } from 'class-validator';
import { RealizationTypeEnum } from '@prisma/client';

@Controller({
  version: '1',
  path: 'api/realization',
})
export class RealizationController {
  constructor(private readonly realizationService: RealizationService) {}

  // @Post('/save')
  // @UseInterceptors(AnyFilesInterceptor(multerPdfOptions))
  // async createdRealizationWithItems(
  //   @UploadedFiles() files: Express.Multer.File[],
  //   @Req() req: Request,
  //   @Body(new ValidationPipe()) createRealizationDto: CreateRealizationDto,
  //   @Body() createFileDto: CreateFileDto,
  // ): Promise<any> {
  //   //const { uploadfile,} = createRealizationDto;

  //   const createFileDtos: CreateFileDto[] = (files ?? []).map((file, index) => ({
  //     tableName: 'Realization',
  //     docName: file.filename,
  //     docLink: file.path,
  //     docSize: parseFloat((file.size / 1000000).toFixed(2)),
  //     docType: extname(file.originalname),
  //     createdBy: '',
  //     docCategoryId: createFileDto.docCategoryId[index], // Access the corresponding docCategoryId
  //   }));

  //   const fromRequest = CreateRealizationDto.fromRequest(createRealizationDto);
  //   const fromRequest2 = createFileDtos.map(CreateFileDto.fromRequest);

  //   const realization = await this.realizationService.createRealizationItems(
  //     fromRequest,
  //   );
  //   const filesUpload: CreateFileDto[] =
  //     await this.fileUploadService.createFiles(fromRequest2);
  //   return {
  //     data: {
  //       ...realization,
  //       //filesUpload,
  //     },
  //     message: 'Create new request successfully created',
  //     status: HttpStatus.CREATED,
  //     time: new Date(),
  //   };
  // }
  @Post('/save')
  @UseInterceptors(AnyFilesInterceptor(multerPdfOptions))
  async createdRealizationWithItems(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: Request,
    @Body(new ValidationPipe()) dto: CreateRealizationDto,
    @Body() dtoFile: CreateFileDto,
  ) {
    try {
      const createFileDtos: CreateFileDto[] = (files ?? []).map(
        (file, index) => ({
          tableName: 'Realization',
          docName: dtoFile.docName[index],
          docLink: file.path,
          docSize: parseFloat((file.size / 1000000).toFixed(2)),
          docType: extname(file.originalname),
          createdBy: '',
          docCategoryId: parseInt(dtoFile.docCategoryId[index]),
        }),
      );

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
      ];
      for (const field of requiredFields) {
        if (!dto[field]) {
          throw new HttpException(
            `Field ${field} is required`,
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      const typeValidations = {
        titleRequest: 'string',
        noteRequest: 'string',
        costCenterId: 'number',
        createdBy: 'string',
      };
      for (const field in typeValidations) {
        if (typeof dto[field] !== typeValidations[field]) {
          throw new HttpException(
            `Field ${field} must be a ${typeValidations[field]}`,
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      const realization = await this.realizationService.createRealizationItems(
        fromRequest,
        realizationItems,
        createFileDtos,
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

  private async validateRealizationDto(
    data: CreateRealizationDto,
  ): Promise<void> {
    const requiredFields = ['createdBy'];

    for (const field of requiredFields) {
      if (!data[field]) {
        throw new HttpException(
          `Field ${field} is required`,
          HttpStatus.BAD_REQUEST,
        );
      }
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

  @Post('/status')
  createMStatus(@Body() mStatus: MStatusDto) {
    return this.realizationService.createMStatus(mStatus);
  }
}
