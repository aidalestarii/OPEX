import { Module } from '@nestjs/common';
import { UserDataService } from './user_data.service';
import { UserDataController } from './user_data.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [UserDataController],
  providers: [UserDataService],
})
export class UserDataModule {}
