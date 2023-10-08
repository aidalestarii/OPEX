import { Module } from '@nestjs/common';
import { MCostCenterController } from './m_cost_center.controller';
import { MCostCenterService } from './m_cost_center.service';

@Module({
  controllers: [MCostCenterController],
  providers: [MCostCenterService]
})
export class MCostCenterModule {}
