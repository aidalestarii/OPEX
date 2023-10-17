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

function filename(req, file, callback) {
  const filename = `${file.originalname}`;
  callback(null, filename);
}

function fileFilter(req, file, callback) {
  if (file.mimetype !== 'application/pdf') {
    return callback(new BadRequestException('pdf aja'), false);
  }
  if (file.size > 100000000) {
    return callback(new BadRequestException('mb lebih'), false);
  }
  callback(null, true);
}

@Controller({
  version: '1',
  path: 'api/upload',
})
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename,
      }),
      fileFilter,
    }),
  )
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
