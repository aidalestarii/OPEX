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

  // async createFileDto(docCategoryId: number, data: CreateFileDto) {
  //   return this.prisma.fileUpload.create({
  //     data: {
  //       tableId: data.tableId,
  //       tableName: data.tableName,
  //       createdBy: data.createdBy,
  //       docName: data.docName,
  //       docSize: data.docSize,
  //       docType: data.docType,
  //       docLink: data.docLink,
  //       mDocCategory: {
  //         connect: {
  //           idDocCategory: +docCategoryId,
  //         },
  //       },
  //     },
  //   });
  // }

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
}

// async createPost(userId: number, data: CreatePostDto) {
// return this.prisma.post.create({
//   data: {
//     title: data.title,
//     content: data.content,
//     user: {
//       connect: {
//         id: +userId,
//       },
//     },
//   },
// });
