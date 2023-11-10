import { Module } from '@nestjs/common';
import { RealizationController } from './realization.controller';
import { RealizationService } from './realization.service';
import { PrismaService } from 'src/core/service/prisma.service';
import { FileUploadService } from './file-upload.service';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  controllers: [RealizationController],
  imports: [MulterModule],
  providers: [RealizationService, FileUploadService, PrismaService],
})
export class RealizationModule {}
