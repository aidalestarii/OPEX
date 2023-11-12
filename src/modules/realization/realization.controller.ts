import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
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
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { multerPdfOptions } from 'src/config/multer.config';
import { multerConfig } from 'src/config/multer-options.config';
import {
  CreateFileDto,
  CreateMDocCategoryDto,
} from '../file_upload/dto/create-file-upload.dto';

@Controller({
  version: '1',
  path: 'api/realization',
})
export class RealizationController {
  constructor(
    private readonly realizationService: RealizationService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  // @Post('/save')
  // async createRealizationWithItems3(
  //   @Body() createRealization: CreateRealization,
  // ) {
  //   return this.realizationService.createRealizationItems(createRealization);
  // }

  @Post('/save')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('files', 5, multerPdfOptions))
  async createRealizationWithItems3(
    @UploadedFiles() files: Express.Multer.File[],
    @Body(new ValidationPipe()) createRealization: CreateRealization,
  ): Promise<any> {
    const createFileDtos: CreateFileDto[] = [];
    for (const file of files) {
      const newCreateFileDto: CreateFileDto = {
        //send response
        tableName: 'Realization',
        docName: file.filename,
        docLink: file.path,
        docSize: parseFloat((file.size / 1000000).toFixed(2)),
        docType: extname(file.originalname),
        createdBy: 'createFileDto.createdBy',
        docCategoryId: 1,
      };

      createFileDtos.push(newCreateFileDto);
    }
    const createFiles = await this.fileUploadService.createFiles(
      createFileDtos,
    );
    const fromRequest = CreateRealization.fromRequest(createRealization);

    const createRealizationanditem =
      await this.realizationService.createRealizationItems(fromRequest);
    //console.log(createRealizationanditem);
    return {
      createRealizationanditem,
      createFiles,
    };
  }

  // @Post('/submit')
  // async createRealizationWithItems2(
  //   @Body() createRealization: CreateRealization,
  // ) {
  //   const createRealizationanditem =
  //     await this.realizationService.createdRealizationItems(createRealization);
  //   return createRealizationanditem;
  // }

  @Post('pdf')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('files', 5, multerPdfOptions))
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body(new ValidationPipe()) createFileDto: CreateFileDto,
  ): Promise<CreateFileDto[]> {
    const createFileDtos: CreateFileDto[] = [];
    for (const file of files) {
      const newCreateFileDto: CreateFileDto = {
        //send response
        tableName: 'Realization',
        docName: file.filename,
        docLink: file.path,
        docSize: parseFloat((file.size / 1000000).toFixed(2)),
        docType: extname(file.originalname),
        createdBy: createFileDto.createdBy,
        docCategoryId: 1,
      };

      createFileDtos.push(newCreateFileDto);
    }
    const createFiles = await this.fileUploadService.createFiles(
      createFileDtos,
    );
    return createFiles;
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
