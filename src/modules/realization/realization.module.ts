import { Module } from '@nestjs/common';
import { RealizationController } from './realization.controller';
import { RealizationService } from './realization.service';
import { PrismaService } from 'src/core/service/prisma.service';

@Module({
  controllers: [RealizationController],
  providers: [RealizationService, PrismaService],
})
export class RealizationModule {}
