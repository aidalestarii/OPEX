import { Injectable } from '@nestjs/common';
import { CreateMGlAccountDto } from './dto/create-m_gl_account.dto';
import { UpdateMGlAccountDto } from './dto/update-m_gl_account.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MGlAccountService {
  constructor(private readonly prisma: PrismaService) {}
  create(createMGlAccountDto: CreateMGlAccountDto) {
    return this.prisma.mGlAccount.create({
      data: createMGlAccountDto,
    });
  }

  findAll() {
    return this.prisma.mGlAccount.findMany();
  }

  findOne(id: number) {
    return this.prisma.mGlAccount.findUnique({ where: { idGlAccount: id } });
  }

  update(id: number, updateMGlAccountDto: UpdateMGlAccountDto) {
    return this.prisma.mGlAccount.update({
      where: { idGlAccount: id },
      data: UpdateMGlAccountDto,
    });
  }

  remove(id: number) {
    return this.prisma.mGlAccount.delete({ where: { idGlAccount: id } });
  }
}
