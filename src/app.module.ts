import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BudgetModule } from './modules/budget/budget.module';
import { MCostCenterModule } from './modules/m_cost_center/m_cost_center.module';
import { MGlAccountModule } from './modules/m_gl_account/m_gl_account.module';
import { KursModule } from './modules/kurs/kurs.module';
import { FileUploadModule } from './modules/file_upload/file_upload.module';
import { BudgetUploadModule } from './modules/budget_upload/budget_upload.module';
import { RealizationModule } from './modules/realization/realization.module';
import { GetAllModule } from './modules/get-all/get-all.module';

@Module({
  imports: [
    BudgetModule,
    MCostCenterModule,
    MGlAccountModule,
    FileUploadModule,
    KursModule,
    FileUploadModule,
    BudgetUploadModule,
    RealizationModule,
    GetAllModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
