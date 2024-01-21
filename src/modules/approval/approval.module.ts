import { Module } from '@nestjs/common';
import { ApprovalService } from './approval.service';
import { ApprovalController } from './approval.controller';
import { PrismaService } from 'src/core/service/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { RoleService } from '../role/role.service';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  controllers: [ApprovalController],
  imports: [MulterModule, HttpModule],
  providers: [ApprovalService, PrismaService, RoleService],
})
export class ApprovalModule {}
