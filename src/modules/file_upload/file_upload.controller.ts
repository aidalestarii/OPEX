import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FileUploadService } from './file_upload.service';
import { CreateFileDto } from './dto/create-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { ApiResponseDto } from 'src/core/dto/api-response.dto';
import { multerOptions } from 'src/config/multer.config';
import { UpdateFileDto } from './dto/update-file.dto';

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
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateFileDto,
    @Res() res: Response,
  ): Promise<Response> {
    console.log(file);
    const result = {
      data: {
        fileName: file.originalname,
        size: file.size,
        doctype: file.mimetype,
      },
      meta: {
        HttpStatus,
      },
      time: new Date(),
    };

    // const response: ApiResponseDto<CreateFileDto[], {personalNumber: string}> = {
    //   data: [{
    //     uniqueId: ''
    //   }],
    //   meta: {
    //     personalNumber: '',
    //   }
    // }

    // const response2: ApiResponseDto<UpdateFileDto> = {
    //   data: {
    //     uni
    //   }
    // }

    const resultDto = plainToInstance(ApiResponseDto, result, {
      excludeExtraneousValues: true,
    });

    return res.status(HttpStatus.OK).json(resultDto);
  }
}
