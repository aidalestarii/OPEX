import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import * as fs from 'fs/promises'; // Menggunakan fs.promises untuk operasi async


@Injectable()
export class FilesService {

  async create(createFileDto: CreateFileDto, uploadedFile): Promise<string> {
    const savedFilePath = `./file/${uploadedFile.filename}`;
    console.log('File yang disimpan:', savedFilePath);
      return savedFilePath;
    }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
