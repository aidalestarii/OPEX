import { Module } from '@nestjs/common';
import { VariableService } from './variable.service';
import { VariableController } from './variable.controller';
import { PrismaService } from 'src/core/service/prisma.service';

@Module({
  controllers: [VariableController],
  providers: [VariableService, PrismaService],
})
export class VariableModule {}
