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

  async createdoc(data: CreateMDocCategoryDto) {
    return this.prisma.mDocCategory.create({
      data,
    });
  }

  async findAllDoc() {
    const docCategory = await this.prisma.mDocCategory.findMany();
    return docCategory;
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
    const updateFile = await this.prisma.fileUpload.update({
      where: { idUpload: id },
      data: updateFileDto,
    });
    return updateFile;
  }

  async deleteFile(fileId: number): Promise<any> {
    const deletedFile = await this.prisma.fileUpload.delete({
      where: {
        idUpload: fileId,
      },
    });

    if (!deletedFile) {
      throw new NotFoundException(`File with id ${fileId} not found`);
    }

    return deletedFile;
  }

  async remove(id: number) {
    const deletedMDocCategory = await this.prisma.mDocCategory.delete({
      where: { idDocCategory: id },
    });
    return deletedMDocCategory;
  }
}
