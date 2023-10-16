import { Module } from '@nestjs/common';
import { KursController } from './kurs.controller';
import { KursService } from './kurs.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [KursController],
  providers: [KursService, PrismaService]
})
export class KursModule {}
