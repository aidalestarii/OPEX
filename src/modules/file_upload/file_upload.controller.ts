import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
  ValidationPipe,
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
    @Body(new ValidationPipe()) createFileDto: CreateFileDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      console.log(file.size);
      //const response: ApiResponseDto<CreateFileDto, any> =

      // const resultDto = plainToInstance(ApiResponseDto, response, {
      //   excludeExtraneousValues: true,
      // });

      //return res.status(HttpStatus.OK).send(resultDto);
      const data = await this.fileUploadService.create(createFileDto);
      const result = {
        data: data,
        meta: {
          filename: file.filename,
        },
        time: new Date(),
      };
      console.log(file);
      console.log(createFileDto);
      return res.status(HttpStatus.OK).send(result);
    } catch (error) {
      res.status(404).json(error.response);
    }

    // const response: ApiResponseDto<CreateFileDto[], {personalNumber: string}> = {
    //   data: [{
    //     uniqueId: ''
    //   }],
    //   meta: {
    //     personalNumber: '',
    //   }
    // }
  }
}
