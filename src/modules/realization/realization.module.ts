import { Module } from '@nestjs/common';
import { RealizationController } from './realization.controller';
import { RealizationService } from './realization.service';

@Module({
  controllers: [RealizationController],
  providers: [RealizationService]
})
export class RealizationModule {}
