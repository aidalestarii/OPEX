import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

//constructor(private readonly filesService: FilesService) {}
@Controller('upload')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Post('')
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
      destination: './files',
      filename(req, file, callback) {
          const filename = `${file.originalname}`;
          callback(null, filename);
      },
    }),
    fileFilter(req, file, callback) {
        const allowext=['.pdf'];
        const ext = extname(file.originalname);
        if (allowext.includes(ext)) {
          callback(null, true);
        } else {
          return 'Only PDF files are allowed...';
          //(new Error('Only PDF files are allowed...'), false);
        }
    },
  }))
async uploadFile(@UploadedFile() file): Promise<string> {
  // Lakukan apa pun yang diperlukan dengan file yang diunggah di sini
  console.log('File yang diunggah:', file);
  return 'upload file success';
}

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
