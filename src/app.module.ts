import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MCostCenterModule } from './modules/m_cost_center/m_cost_center.module';
import { MGlAccountModule } from './modules/m_gl_account/m_gl_account.module';
import { KursModule } from './modules/kurs/kurs.module';
import { BudgetUploadModule } from './modules/budget_upload/budget_upload.module';
import { RealizationModule } from './modules/realization/realization.module';
import { GetAllModule } from './modules/get-all/get-all.module';
import { VariableModule } from './modules/variable/variable.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { MasterStatusModule } from './modules/master_status/master_status.module';
import { ApprovalModule } from './modules/approval/approval.module';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [
    MCostCenterModule,
    MGlAccountModule,
    KursModule,
    BudgetUploadModule,
    RealizationModule,
    GetAllModule,
    VariableModule,
    DashboardModule,
    MasterStatusModule,
    ApprovalModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
