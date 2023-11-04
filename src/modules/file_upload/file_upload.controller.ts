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
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { FileUploadService } from './file_upload.service';
import {
  CreateFileDto,
  CreateMDocCategoryDto,
} from './dto/create-file-upload.dto';
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
  prisma: any;
  constructor(private readonly fileUploadService: FileUploadService) {}
  /**
   * Upload docs
   * JSDoc
   * @param file
   * @param body
   * @returns
   */

  @Post('category')
  createdoc(@Body() CreateMDocCategoryDto: CreateMDocCategoryDto) {
    return this.fileUploadService.createdoc(CreateMDocCategoryDto);
  }
  @Post('pdf')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file', multerPdfOptions))
  async createPostPdf(
    @UploadedFile() file: Express.Multer.File,
    @Body(new ValidationPipe()) CreateFileDto: CreateFileDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      if (!file) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'File not uploaded' });
      }

      CreateFileDto.tableName = 'Realization';
      CreateFileDto.docSize = file.size;
      CreateFileDto.docType = extname(file.originalname);
      CreateFileDto.docLink = file.path;
      CreateFileDto.docName = file.filename;
      CreateFileDto.docCategoryId = 1; // Set docCategoryId here or pass it in the request body

      const uploadedFileInfo = await this.fileUploadService.createFileDto(
        CreateFileDto.docCategoryId, // Pass docCategoryId from the DTO
        CreateFileDto,
      );

      const response = {
        data: uploadedFileInfo,
        meta: {
          file,
        },
        time: new Date(),
      };

      console.log(file);
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Internal server error' });
    }
  }

  @Delete(':id')
  async deleteFile(
    @Param('id') fileId: number,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const deletedFile = await this.fileUploadService.deleteFile(+fileId);
      if (!deletedFile) {
        throw new NotFoundException(`File with id ${fileId} not found`);
      }

      const response = {
        message: 'File deleted successfully',
        data: deletedFile,
        time: new Date(),
      };

      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Internal server error' });
    }
  }

  @Post('excel')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async createPostExcel(
    @UploadedFile() file: Express.Multer.File,
    @Body(new ValidationPipe()) CreateFileDto: CreateFileDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      if (!file) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'File not uploaded' });
      }

      CreateFileDto.docSize = file.size;
      CreateFileDto.docType = extname(file.originalname);
      CreateFileDto.docLink = file.path;
      CreateFileDto.docName = file.filename;
      CreateFileDto.docCategoryId = 1; // Set docCategoryId here or pass it in the request body

      const uploadedFileInfo = await this.fileUploadService.createFileDto(
        CreateFileDto.docCategoryId, // Pass docCategoryId from the DTO
        CreateFileDto,
      );

      const response = {
        data: uploadedFileInfo,
        meta: {
          file,
        },
        time: new Date(),
      };

      console.log(file);
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Internal server error' });
    }
  }
}
