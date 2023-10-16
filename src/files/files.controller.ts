import { Controller, Post, Body, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('upload')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename(req, file, callback) {
          const filename = `${file.originalname}`;
          callback(null, filename);
        },
      }),
      fileFilter(req, file, callback) {
        if (file.mimetype !== 'application/pdf') {
          return callback(new BadRequestException('pdf aja'), false);
        }
        if (file.size > 100000000) {
          return callback(new BadRequestException('mb lebih'), false);
        }
        callback(null, true);
      },
    }),
  )


  //di config, pake reg rile buat service. reg file ['key']. atas luat metdod bawah dlm method
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: CreateFileDto): Promise<string> {
    console.log('file:', file);
    return 'upload file success';
  }
}