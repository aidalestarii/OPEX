import { Module } from '@nestjs/common';
import { ApprovalService } from './approval.service';
import { ApprovalController } from './approval.controller';
import { PrismaService } from 'src/core/service/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { RoleService } from '../role/role.service';

@Module({
  controllers: [ApprovalController],
  imports: [HttpModule],
  providers: [ApprovalService, PrismaService, RoleService],
})
export class ApprovalModule {}
