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

  // @Post('/save')
  // async createRealizationWithItems3(
  //   @Body() createRealization: CreateRealization,
  // ) {
  //   return this.realizationService.createRealizationItems(createRealization);
  // }

  @Post('/test')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    //console.log('Received files:', files);
    // Process uploaded files here
  }

  // @Post('/save')
  // @UsePipes(new ValidationPipe())
  // @UseInterceptors(AnyFilesInterceptor(multerPdfOptions))
  // async createRealizationWithItems3(
  //   @UploadedFiles() files: Express.Multer.File[],
  //   @Body(new ValidationPipe()) createRealization: CreateRealization,
  // ): Promise<any> {
  //   const createFileDtos: CreateFileDto[] = [];
  //   for (const file of files) {
  //     const newCreateFileDto: CreateFileDto = {
  //       //send response
  //       tableName: 'Realization',
  //       docName: file.filename,
  //       docLink: file.path,
  //       docSize: parseFloat((file.size / 1000000).toFixed(2)),
  //       docType: extname(file.originalname),
  //       createdBy: 'createFileDto.createdBy',
  //       docCategoryId: 1,
  //     };

  //     createFileDtos.push(newCreateFileDto);
  //   }
  //   const createFiles = await this.fileUploadService.createFiles(
  //     createFileDtos,
  //   );
  //   const fromRequest = CreateRealization.fromRequest(createRealization);

  //   const createRealizationanditem =
  //     await this.realizationService.createRealizationItems(fromRequest);
  //   //console.log(createRealizationanditem);
  //   return {
  //     createRealizationanditem,
  //     createFiles,
  //   };
  // }

  @Post('/save')
  @UseInterceptors(AnyFilesInterceptor(multerPdfOptions))
  async createdRealizationWithItems(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: Request,
    @Body(new ValidationPipe()) createRealization: CreateRealization,
    @Body() createFileDto: CreateFileDto,
  ): Promise<any> {
    // console.log(req.body, req.files);
    const createFileDtos: CreateFileDto[] = files.map((file, index) => ({
      tableName: 'Realization',
      docName: file.filename,
      docLink: file.path,
      docSize: parseFloat((file.size / 1000000).toFixed(2)),
      docType: extname(file.originalname),
      createdBy: '',
      docCategoryId: createFileDto.docCategoryId[index], // Access the corresponding docCategoryId
    }));

    const fromRequest2 = createFileDtos.map(CreateFileDto.fromRequest);
    const fromRequest = CreateRealization.fromRequest(createRealization);

    const items = await this.realizationService.createRealizationItems(
      fromRequest,
    );
    const rows: CreateFileDto[] = await this.fileUploadService.createFiles(
      fromRequest2,
    );

    return {
      data: {
        ...items,
        rows,
      },
      message: 'File uploaded successfully',
      status: HttpStatus.CREATED,
      time: new Date(),
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
