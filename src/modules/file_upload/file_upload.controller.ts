import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FileUploadService } from './file_upload.service';
import { CreateFileDto } from './dto/create-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { ApiResponseDto } from 'src/core/dto/api-response.dto';
import { multerOptions } from 'src/config/multer.config';

function filename(req, file, callback) {
  const filename = `${file.originalname}`;
  callback(null, filename);
}

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

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async upload(@UploadedFile() file) {
    console.log(file);
  }

  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateFileDto,
    @Res() res: Response,
  ): Promise<Response> {
    console.log('file:', file);

    const result = {
      data: body,
      meta: {
        fileName: file.originalname,
      },
      time: new Date(),
    };

    const resultDto = plainToInstance(ApiResponseDto, result, {
      excludeExtraneousValues: true,
    });

    return res.status(HttpStatus.OK).send();
  }
}
