import { PartialType } from '@nestjs/mapped-types';
import { CreateMGlAccountDto } from './create-m_gl_account.dto';

export class UpdateMGlAccountDto extends PartialType(CreateMGlAccountDto) {}
