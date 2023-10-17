                                    import { Module } from '@nestjs/common';
import { MCostCenterService } from './m_cost_center.service';
import { MCostCenterController } from './m_cost_center.controller';
import { PrismaService } from 'src/core/service/prisma.service';

@Module({
  controllers: [MCostCenterController],
  providers: [MCostCenterService, PrismaService],
})
export class MCostCenterModule {}
