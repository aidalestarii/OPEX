import {
  BadRequestException,
  Body,
  Injectable,
  UploadedFile,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateFileDto } from './dto/update-file.dto';
import { CreateFileDto } from './dto/create-file.dto';
import { PrismaService } from 'src/core/service/prisma.service';
import { error } from 'console';

@Injectable()
export class FileUploadService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFileDto: CreateFileDto): Promise<any> {
    return this.prisma.fileUpload.create({
      data: createFileDto,
    });
    // .then((upload) => {
    //   return upload;
    // })
    // .catch((error) => {
    //   throw new BadRequestException(error);
    // });
    //return data;
    // } catch (error) {
    //   throw new BadRequestException(error);
    // }
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
