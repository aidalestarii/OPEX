import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateFileDto,
  CreateMDocCategoryDto,
} from './dto/create-file-upload.dto';
import { PrismaService } from 'src/core/service/prisma.service';
import { error } from 'console';

@Injectable()
export class FileUploadService {
  constructor(private readonly prisma: PrismaService) {}

  // async create(createFileDto: CreateFileDto): Promise<any> {
  //   const upload = await this.prisma.fileUpload.create({
  //     data: createFileDto,
  //   });
  //   return upload;
  // }

  async createdoc(data: CreateMDocCategoryDto) {
    return this.prisma.mDocCategory.create({
      data,
    });
  }

  async createFileDto(docCategoryId: number, data: CreateFileDto) {
    return this.prisma.fileUpload.create({
      data: {
        tableId: data.tableId,
        tableName: data.tableName,
        createdBy: data.createdBy,
        docName: data.docName,
        docSize: data.docSize,
        docType: data.docType,
        docLink: data.docLink,
        mDocCategory: {
          connect: {
            idDocCategory: +docCategoryId,
          },
        },
      },
    });
  }
}
