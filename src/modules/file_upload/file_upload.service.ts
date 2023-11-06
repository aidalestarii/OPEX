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
import { UpdateFileDto } from './dto/update-file-upload.dto';

@Injectable()
export class FileUploadService {
  constructor(private readonly prisma: PrismaService) {}

  async createdoc(createmDocCategoryDto: CreateMDocCategoryDto) {
    const data = await this.prisma.mDocCategory.create({
      data: createmDocCategoryDto,
    });
    return { data };
  }

  async findAllDoc() {
    const data = await this.prisma.mDocCategory.findMany();
    return { data };
  }

  async createFileDto(docCategoryId: number, data: CreateFileDto) {
    return this.prisma.fileUpload.create({
      data: {
        tableId: data.tableId,
        tableName: data.tableName,
        createdBy: data.createdBy, // Add createdBy field here
        docName: data.docName,
        docSize: parseFloat((data.docSize / 1000000).toFixed(2)),
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

  async updateFile(id: number, updateFileDto: UpdateFileDto) {
    //Validation ID
    const existingFile = await this.prisma.fileUpload.findUnique({
      where: { idUpload: id },
    });
    if (!existingFile) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }
    const data = await this.prisma.fileUpload.update({
      where: { idUpload: id },
      data: updateFileDto,
    });
    return { data };
  }

  async deleteFile(fileId: number): Promise<any> {
    const data = await this.prisma.fileUpload.delete({
      where: {
        idUpload: fileId,
      },
    });

    if (!data) {
      throw new NotFoundException(`File with id ${fileId} not found`);
    }

    return { data };
  }

  async remove(id: number) {
    const data = await this.prisma.mDocCategory.delete({
      where: { idDocCategory: id },
    });
    return { data };
  }
}
