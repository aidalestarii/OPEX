import {
  BadRequestException,
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFileDto } from './dto/create-file.dto';
import { Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { diskStorage } from 'multer';
import { FileUploadService } from './file_upload.service';
import { ApiResponseDto } from 'src/core/dto/api-response.dto';
import { multerOptions } from 'src/config/multer.config';

@Controller({
  version: '1',
  path: 'api/upload',
})
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateFileDto,
    @Res() res: Response,
  ): Promise<Response> {
    const result = {
      data: body,
      meta: {
        fileName: file.originalname,
      },
      time: new Date(),
    };

    // const resultDto = plainToInstance(ApiResponseDto, result, {
    //   excludeExtraneousValues: true,
    // });
    return res.status(HttpStatus.OK).send(result);
  }
}
