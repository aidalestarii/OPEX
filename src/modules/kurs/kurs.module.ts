import { Module } from '@nestjs/common';
import { KursController } from './kurs.controller';
import { KursService } from './kurs.service';
import { PrismaService } from 'src/core/service/prisma.service';

@Module({
  controllers: [KursController],
  providers: [KursService, PrismaService]
})
export class KursModule {}
