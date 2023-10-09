import { Module } from '@nestjs/common';
import { KurssService } from './kurss.service';
import { KurssController } from './kurss.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [KurssController],
  providers: [KurssService, PrismaService],
})
export class KurssModule {}
