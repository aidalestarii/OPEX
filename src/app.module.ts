import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BudgetModule } from './modules/budget/budget.module';
import { MCostCenterModule } from './modules/m_cost_center/m_cost_center.module';
import { MGlAccountModule } from './modules/m_gl_account/m_gl_account.module';
import { FilesModule } from './modules/files/files.module';
import { MulterModule } from '@nestjs/platform-express';
import { KursModule } from './modules/kurs/kurs.module';
import { FileUploadModule } from './modules/file_upload/file_upload.module';

@Module({
  imports: [
    BudgetModule,
    MCostCenterModule,
    MGlAccountModule,
    FilesModule,
    KursModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
