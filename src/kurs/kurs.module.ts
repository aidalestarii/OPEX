import { Module } from '@nestjs/common';
import { KursController } from './kurs.controller';
import { KursService } from './kurs.service';

@Module({
  controllers: [KursController],
  providers: [KursService]
})
export class KursModule {}
