import { Module } from '@nestjs/common';
import { MGlAccountController } from './m_gl_account.controller';
import { MGlAccountService } from './m_gl_account.service';

@Module({
  controllers: [MGlAccountController],
  providers: [MGlAccountService]
})
export class MGlAccountModule {}
