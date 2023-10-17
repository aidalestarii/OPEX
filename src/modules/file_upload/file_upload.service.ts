import { Injectable } from '@nestjs/common';
import { UpdateFileDto } from './dto/update-file.dto';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FileUploadService {
  async create(createFileDto: CreateFileDto, uploadedFile): Promise<string> {
    const savedFilePath = `./file/${uploadedFile.filename}`;
    console.log('File yang disimpan:', savedFilePath);
    return savedFilePath;
  }

  findAll() {}

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
