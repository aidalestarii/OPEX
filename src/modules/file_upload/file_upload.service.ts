import {
  BadRequestException,
  Body,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { CreateFileDto } from './dto/create-file-upload.dto';
import { PrismaService } from 'src/core/service/prisma.service';
import { error } from 'console';

@Injectable()
export class FileUploadService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFileDto: CreateFileDto): Promise<any> {
    const upload = await this.prisma.fileUpload.create({
      data: createFileDto,
    });
    return upload;
  }
}
