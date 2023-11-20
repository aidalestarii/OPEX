import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MCostCenterModule } from './modules/m_cost_center/m_cost_center.module';
import { MGlAccountModule } from './modules/m_gl_account/m_gl_account.module';
import { KursModule } from './modules/kurs/kurs.module';
import { FileUploadModule } from './modules/file_upload/file_upload.module';
import { BudgetUploadModule } from './modules/budget_upload/budget_upload.module';
import { RealizationModule } from './modules/realization/realization.module';
import { GetAllModule } from './modules/get-all/get-all.module';
import { VariableModule } from './modules/variable/variable.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    MCostCenterModule,
    MGlAccountModule,
    FileUploadModule,
    KursModule,
    FileUploadModule,
    BudgetUploadModule,
    RealizationModule,
    GetAllModule,
    VariableModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
