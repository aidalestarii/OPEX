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
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { ApiResponseDto } from 'src/core/dto/api-response.dto';
import { multerOptions } from 'src/modules/files/multer.config';

@Controller({
  version: '1',
  path: 'api/upload',
})
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  /**
   * Upload docs
   *
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
