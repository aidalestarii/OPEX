import { Module } from '@nestjs/common';
import { FileUploadController } from './file_upload.controller';
import { FileUploadService } from './file_upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaService } from 'src/core/service/prisma.service';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService, PrismaService],
  imports: [MulterModule],
  exports: [PrismaService],
})
export class FileUploadModule {}
