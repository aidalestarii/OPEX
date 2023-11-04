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
      const deletedMGlAccount = await this.prisma.mGlAccount.delete({
        where: { idGlAccount: id },
      });
      return deletedMGlAccount;
    }
  }