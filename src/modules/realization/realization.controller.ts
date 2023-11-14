import {
  Bind,
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { RealizationService } from './realization.service';
import {
  CreateRealization,
  CreateRealizationItem,
  MStatus,
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
} from '../file_upload/dto/create-file-upload.dto';
import { IndexName } from '@elastic/elasticsearch/lib/api/typesWithBodyKey';
import { IndexAlias } from '@elastic/elasticsearch/lib/api/types';
import { Request } from 'express';
@Controller({
  version: '1',
  path: 'api/realization',
})
export class RealizationController {
  constructor(
    private readonly realizationService: RealizationService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Post('/save')
  @UseInterceptors(AnyFilesInterceptor(multerPdfOptions))
  async createRealizationWithItems(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: Request,
    @Body(new ValidationPipe()) createRealization: CreateRealization,
    @Body() createFileDto: CreateFileDto,
  ): Promise<any> {
    console.log(req.body, req.files);
    const createFileDtos: CreateFileDto[] = files.map((file, index) => ({
      tableName: 'Realization',
      docName: createFileDto.docName[index],
      docLink: file.path,
      docSize: parseFloat((file.size / 1000000).toFixed(2)),
      docType: extname(file.originalname),
      createdBy: '',
      docCategoryId: createFileDto.docCategoryId[index], // Access the corresponding docCategoryId
    }));

    const fromRequest2 = createFileDtos.map(CreateFileDto.fromRequest);

    const createFiles = await this.fileUploadService.createFiles(fromRequest2);
    const fromRequest = CreateRealization.fromRequest(createRealization);

    const createRealizationanditem =
      await this.realizationService.createRealizationItems(fromRequest);

    return {
      createRealizationanditem,
      createFiles: [
        {
          createFiles,
        },
      ],
    };
  }

  @Post('/submit')
  @UseInterceptors(AnyFilesInterceptor(multerPdfOptions))
  async createdRealizationWithItems(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: Request,
    @Body(new ValidationPipe()) createRealization: CreateRealization,
    @Body() createFileDto: CreateFileDto,
  ): Promise<any> {
    console.log(req.body, req.files);
    const createFileDtos: CreateFileDto[] = files.map((file, index) => ({
      tableName: 'Realization',
      docName: file.filename,
      docLink: file.path,
      docSize: parseFloat((file.size / 1000000).toFixed(2)),
      docType: extname(file.originalname),
      createdBy: 'createFileDto.createdBy',
      docCategoryId: createFileDto.docCategoryId[index], // Access the corresponding docCategoryId
    }));

    const fromRequest2 = createFileDtos.map(CreateFileDto.fromRequest);

    const createFiles = await this.fileUploadService.createFiles(fromRequest2);
    const fromRequest = CreateRealization.fromRequest(createRealization);

    const createRealizationanditem =
      await this.realizationService.createRealizationItems(fromRequest);

    return {
      createRealizationanditem,
      createFiles,
    };
  }

  @Get()
  findRealization() {
    return this.realizationService.findRealization();
  }

  @Post('/mstatus')
  createMStatus(@Body() mStatus: MStatus) {
    return this.realizationService.createMStatus(mStatus);
  }
}
