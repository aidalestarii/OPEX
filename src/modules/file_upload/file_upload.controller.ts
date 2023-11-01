import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { FileUploadService } from './file_upload.service';
import { CreateFileDto } from './dto/create-file-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Express } from 'express';
import { plainToInstance } from 'class-transformer';
import { ApiResponseDto } from 'src/core/dto/api-response.dto';
import { multerPdfOptions } from 'src/config/multer.config';
import { multerConfig } from 'src/config/multer-options.config';
import { extname } from 'path';

@Controller({
  version: '1',
  path: 'api/uploadfile',
})
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  /**
   * Upload docs
   * JSDoc
   * @param file
   * @param body
   * @returns
   */

  @Post('/postpdf')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file', multerPdfOptions))
  async uploadpdf(
    @UploadedFile() file: Express.Multer.File,
    @Body(new ValidationPipe())
    createFileDto: CreateFileDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      createFileDto.idTable = 10;
      createFileDto.idDocCategory = 20;
      createFileDto.tableName = 'nama table';
      createFileDto.docSize = file.size;
      createFileDto.docType = extname(file.originalname);
      createFileDto.docLink = file.path;
      createFileDto.docName = file.filename;
      const data = await this.fileUploadService.create(createFileDto);

      const response = {
        data: data.uploadedFileInfo,
        meta: {
          data,
          file,
        },
        time: new Date(),
      };

      console.log(file);
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Internal server error' });
    }
  }

  @Post('/postexcel')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadexcel(
    @UploadedFile() file: Express.Multer.File,
    @Body(new ValidationPipe())
    createFileDto: CreateFileDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      createFileDto.docSize = file.size;
      const data = await this.fileUploadService.create(createFileDto);

      const response = {
        data: data.uploadedFileInfo,
        meta: {
          data,
          file,
        },
        time: new Date(),
      };

      console.log(file);
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Internal server error' });
    }
  }
}
