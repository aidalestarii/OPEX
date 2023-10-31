import { Module } from '@nestjs/common';
import { RealizationItemController } from './realization_item.controller';
import { RealizationItemService } from './realization_item.service';

@Module({
  controllers: [RealizationItemController],
  providers: [RealizationItemService]
})
export class RealizationItemModule {}
