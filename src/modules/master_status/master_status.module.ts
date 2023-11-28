import { Module } from '@nestjs/common';
import { MasterStatusService } from './master_status.service';
import { MasterStatusController } from './master_status.controller';
import { PrismaService } from 'src/core/service/prisma.service';

@Module({
  controllers: [MasterStatusController],
  providers: [MasterStatusService, PrismaService],
})
export class MasterStatusModule {}
