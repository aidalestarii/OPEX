import { Injectable } from '@nestjs/common';
import { CreateMCostCenterDto } from './dto/create-m_cost_center.dto';
import { UpdateMCostCenterDto } from './dto/update-m_cost_center.dto';
import { PrismaService } from 'src/core/service/prisma.service';

@Injectable()
export class MCostCenterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMCostCenterDto: CreateMCostCenterDto) {
    const data = await this.prisma.mCostCenter.create({
      data: createMCostCenterDto,
    });
    return { data };
  }

  async findAll() {
    const data = await this.prisma.mCostCenter.findMany();
    return { data };
  }

  async findOne(id: number) {
    const data = await this.prisma.mCostCenter.findUnique({
      where: { idCostCenter: id },
    });
    return { data };
  }

  async update(id: number, updateMCostCenterDto: UpdateMCostCenterDto) {
    const data = await this.prisma.mCostCenter.update({
      where: { idCostCenter: id },
      data: updateMCostCenterDto,
    });
    return { data };
  }

  async remove(id: number) {
    const data = await this.prisma.mCostCenter.delete({
      where: { idCostCenter: id },
    });
    return { data };
  }
}
