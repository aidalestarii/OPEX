import { Module } from '@nestjs/common';
import { MGlAccountService } from './m_gl_account.service';
import { MGlAccountController } from './m_gl_account.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MGlAccountController],
  providers: [MGlAccountService, PrismaService],
})
export class MGlAccountModule {}
