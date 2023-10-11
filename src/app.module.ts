import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BudgetModule } from './budget/budget.module';
import { KurssModule } from './kurss/kurss.module';
import { MCostCenterModule } from './m_cost_center/m_cost_center.module';
import { MGlAccountModule } from './m_gl_account/m_gl_account.module';
import { BudgetModule } from './budget/budget.module';

@Module({
  imports: [BudgetModule, MCostCenterModule, MGlAccountModule, KurssModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
