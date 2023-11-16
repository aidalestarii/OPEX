import {
  BadRequestException,
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateFileDto,
  CreateMDocCategoryDto,
} from '../realization/dto/create-file-upload.dto';
import { PrismaService } from 'src/core/service/prisma.service';
import { error } from 'console';
import { UpdateFileDto } from '../realization/dto/update-file-upload.dto';

@Injectable()
export class FileUploadService {
  constructor(private readonly prisma: PrismaService) {}

  async createdoc(createMDocCategoryDto: CreateMDocCategoryDto) {
    try {
      const docCategory = await this.prisma.mDocCategory.create({
        data: createMDocCategoryDto,
      });
      return {
        data: docCategory,
        meta: null,
        message: 'Document category created successfully',
        status: HttpStatus.CREATED,
        time: new Date(),
      };
    } catch (error) {
      throw new HttpException(
        {
          data: null,
          meta: null,
          message: 'Failed to create document category',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          time: new Date(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllDoc() {
    const docCategory = await this.prisma.mDocCategory.findMany();
    return {
      data: docCategory,
      meta: null,
      message: 'All document category retrieved',
      status: HttpStatus.OK,
      time: new Date(),
    };
  }

  async removeDocCategory(id: number) {
    const existingDocCategory = await this.prisma.mDocCategory.findUnique({
      where: { idDocCategory: id },
    });
    if (!existingDocCategory) {
      throw new NotFoundException(`Document category with id ${id} not found`);
    }
    try {
      const deleteDocCategory = await this.prisma.mDocCategory.delete({
        where: { idDocCategory: id },
      });
      return {
        data: deleteDocCategory,
        meta: null,
        message: 'Document category deleted successfully',
        status: HttpStatus.OK,
        time: new Date(),
      };
    } catch (error) {
      throw new HttpException(
        {
          data: null,
          meta: null,
          message: 'Failed to delete document category',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          time: new Date(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createFile(docCategoryId: number, data: CreateFileDto) {
    return this.prisma.fileUpload.create({
      data: {
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

  async findFile(id: number) {
    const file = await this.prisma.fileUpload.findUnique({
      where: { idUpload: id },
    });
    if (!file) {
      throw new HttpException(
        {
          data: null,
          meta: null,
          message: 'File not found',
          status: HttpStatus.NOT_FOUND,
          time: new Date(),
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      data: file,
      meta: null,
      message: 'File found',
      status: HttpStatus.OK,
      time: new Date(),
    };
  }

  async updateFile(id: number, updateFileDto: UpdateFileDto) {
    //Validation ID
    const existingFile = await this.prisma.fileUpload.findUnique({
      where: { idUpload: id },
    });
    if (!existingFile) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }
    try {
      const updatedFile = await this.prisma.fileUpload.update({
        where: { idUpload: id },
        data: updateFileDto,
      });
      return {
        data: updatedFile,
        meta: null,
        message: 'File updated successfully',
        status: HttpStatus.OK,
        time: new Date(),
      };
    } catch (error) {
      throw new HttpException(
        {
          data: null,
          meta: null,
          message: 'Failed to update file',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          time: new Date(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteFile(id: number): Promise<any> {
    const existingFile = await this.prisma.mDocCategory.findUnique({
      where: { idDocCategory: id },
    });
    if (!existingFile) {
      throw new NotFoundException(`File with id ${id} not found`);
    }
    try {
      const deleteFile = await this.prisma.mDocCategory.delete({
        where: { idDocCategory: id },
      });
      return {
        data: deleteFile,
        meta: null,
        message: 'File deleted successfully',
        status: HttpStatus.OK,
        time: new Date(),
      };
    } catch (error) {
      throw new HttpException(
        {
          data: null,
          meta: null,
          message: 'Failed to delete File',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          time: new Date(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
