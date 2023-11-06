import { Injectable } from '@nestjs/common';
import { CreateMGlAccountDto } from './dto/create-m_gl_account.dto';
import { UpdateMGlAccountDto } from './dto/update-m_gl_account.dto';
import { PrismaService } from 'src/core/service/prisma.service';

@Injectable()
export class MGlAccountService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMGlAccountDto: CreateMGlAccountDto) {
    const data = await this.prisma.mGlAccount.create({
      data: createMGlAccountDto,
    });
    return { data };
  }

  async findAll() {
    const data = await this.prisma.mGlAccount.findMany();
    return { data };
  }

  async findOne(id: number) {
    const data = await this.prisma.mGlAccount.findUnique({
      where: { idGlAccount: id },
    });
    return { data };
  }

  async update(id: number, updateMGlAccountDto: UpdateMGlAccountDto) {
    const data = await this.prisma.mGlAccount.update({
      where: { idGlAccount: id },
      data: updateMGlAccountDto,
    });
    return { data };
  }

  async remove(id: number) {
    const data = await this.prisma.mGlAccount.delete({
      where: { idGlAccount: id },
    });
    return { data };
  }
}
