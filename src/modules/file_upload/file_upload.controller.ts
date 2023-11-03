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

  // @Post('/postpdf')
  // @UsePipes(new ValidationPipe())
  // @UseInterceptors(FileInterceptor('file', multerPdfOptions))
  // async uploadpdf(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body(new ValidationPipe())
  //   createFileDto: CreateFileDto,
  //   @Res() res: Response,
  // ): Promise<Response> {
  //   try {
  //     createFileDto.tableId = 10;
  //     createFileDto.docCategoryId = 20;
  //     createFileDto.docSize = file.size;
  //     createFileDto.docType = extname(file.originalname);
  //     createFileDto.docLink = file.path;
  //     createFileDto.docName = file.filename;
  //     const data = await this.fileUploadService.create(createFileDto);

  //     const response = {
  //       data: data.uploadedFileInfo,
  //       meta: {
  //         data,
  //         file,
  //       },
  //       time: new Date(),
  //     };

  //     console.log(file);
  //     return res.status(HttpStatus.OK).send(response);
  //   } catch (error) {
  //     console.error(error);
  //     return res
  //       .status(HttpStatus.BAD_REQUEST)
  //       .send({ message: 'Internal server error' });
  //   }
  // }

  // @Post('/upload')
  // async uploadFile(
  //   @Body(ValidationPipe) createFileUploadDto: CreateFileDto,
  //   @Body(ValidationPipe) createMDocCategoryDto: CreateMDocCategoryDto,
  //   @Res() res: Response,
  // ): Promise<Response> {
  //   try {
  //     const data = await this.fileUploadService.createFileUpload(
  //       createFileUploadDto,
  //       createMDocCategoryDto,
  //     );
  //     return res.status(HttpStatus.OK).json({ data });
  //   } catch (error) {
  //     console.error(error);
  //     return res
  //       .status(HttpStatus.BAD_REQUEST)
  //       .json({ message: 'Internal server error' });
  //   }

  //   @Post('/postexcel')
  //   @UsePipes(new ValidationPipe())
  //   @UseInterceptors(FileInterceptor('file', multerConfig))
  //   async uploadexcel(
  //     @UploadedFile() file: Express.Multer.File,
  //     @Body(new ValidationPipe())
  //     createFileDto: CreateFileDto,
  //     @Res() res: Response,
  //   ): Promise<Response> {
  //     try {
  //       createFileDto.docSize = file.size;
  //       const data = await this.fileUploadService.create(createFileDto);

  //       const response = {
  //         data: data.uploadedFileInfo,
  //         meta: {
  //           data,
  //           file,
  //         },
  //         time: new Date(),
  //       };

  //       console.log(file);
  //       return res.status(HttpStatus.OK).send(response);
  //     } catch (error) {
  //       console.error(error);
  //       return res
  //         .status(HttpStatus.BAD_REQUEST)
  //         .send({ message: 'Internal server error' });
  //     }
  //   }

  @Post('doccategory')
  createdoc(@Body() CreateMDocCategoryDto: CreateMDocCategoryDto) {
    return this.fileUploadService.createdoc(CreateMDocCategoryDto);
  }
  @Post('')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file', multerPdfOptions))
  async createPost(
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

      CreateFileDto.tableId = 1;
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

  // @Post(':id/posts')
  // @UsePipes(new ValidationPipe())
  // @UseInterceptors(FileInterceptor('file', multerPdfOptions))
  // async createPost(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Param('id') docCategoryId: number,
  //   @Body(new ValidationPipe()) CreateFileDto: CreateFileDto,
  //   @Res() res: Response,
  // ): Promise<Response> {
  //   try {
  //     CreateFileDto.tableId = 10;
  //     CreateFileDto.docSize = file.size;
  //     CreateFileDto.docType = extname(file.originalname);
  //     CreateFileDto.docLink = file.path;
  //     CreateFileDto.docName = file.filename;
  //     CreateFileDto.tableName = 'namatable';

  //     // const data = await this.fileUploadService.createFileDto(
  //     //   docCategoryId,
  //     //   CreateFileDto,
  //     // );

  //     const response = {
  //       //data: data.uploadedFileInfo,
  //       meta: {
  //         //data,
  //         file,
  //       },
  //       time: new Date(),
  //     };
  //     console.log(file);
  //     //return res.status(HttpStatus.OK).send(response);
  //   } catch (error) {
  //     console.error(error);
  //     return res
  //       .status(HttpStatus.BAD_REQUEST)
  //       .send({ message: 'Internal server error' });
  //   }
  //   {
  //     return this.fileUploadService.createFileDto(docCategoryId, CreateFileDto);
  //   }
  // }
}

// @Post(':id/posts')
// createPost(@Param('id') userId: number, @Body() createPostDto: CreatePostDto) {
//   return this.userService.createPost(userId, createPostDto);
// }
