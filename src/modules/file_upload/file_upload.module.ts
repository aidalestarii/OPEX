import { Module } from '@nestjs/common';
import { FileUploadController } from './file_upload.controller';
import { FileUploadService } from './file_upload.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService],
  imports: [MulterModule]
})
export class FileUploadModule {}
