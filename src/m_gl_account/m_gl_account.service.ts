import { Injectable } from '@nestjs/common';
import { CreateMGlAccountDto } from './dto/create-m_gl_account.dto';
import { UpdateMGlAccountDto } from './dto/update-m_gl_account.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MGlAccountService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMGlAccountDto: CreateMGlAccountDto) {
    const mgl = await this.prisma.mGlAccount.create({
      data: createMGlAccountDto,
    });
    return mgl;
  }

  async findAll() {
    const mgl = await this.prisma.mGlAccount.findMany();
    return mgl;
  }

  async findOne(id: number) {
    const mgl = await this.prisma.mGlAccount.findUnique({ where: { idGlAccount: id } });
    return mgl;
  }

  async update(id: number, updateMGlAccountDto: UpdateMGlAccountDto) {
    const mgl = await this.prisma.mGlAccount.update({
      where: { idGlAccount: id },
      data: UpdateMGlAccountDto,
    });
    return mgl;
  }

  async remove(id: number) {
    const mgl = await this.prisma.mGlAccount.delete({ where: { idGlAccount: id } });
    return mgl;
  }
}
