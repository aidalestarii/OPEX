import { Module } from '@nestjs/common';
import { Service1 } from './get-all.service';
import { Service2 } from './get-all1.service';
import { Service3 } from './get-all2.service';
import { GetAllController } from './get-all.controller';
import { PrismaService } from 'src/core/service/prisma.service';

@Module({
  controllers: [GetAllController],
  providers: [Service1, Service2, Service3, PrismaService],
  exports: [Service1, Service2, Service3],
})
export class GetAllModule {}
