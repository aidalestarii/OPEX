import { Injectable } from '@nestjs/common';
import { CreateMCostCenterDto } from './dto/create-m_cost_center.dto';
import { UpdateMCostCenterDto } from './dto/update-m_cost_center.dto';
import { PrismaService } from 'src/core/service/prisma.service';

@Injectable()
export class MCostCenterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMCostCenterDto: CreateMCostCenterDto) {
    const mcost = await this.prisma.mCostCenter.create({
      data: createMCostCenterDto,
    });
    return mcost;
  }

  async findAll() {
    const mcost = await this.prisma.mCostCenter.findMany();
    return mcost;
  }

  async findOne(id: number) {
    const mcost = await this.prisma.mCostCenter.findUnique({ where: { idCostCenter: id } });
    return mcost;
  }

  async update(id: number, updateMCostCenterDto: UpdateMCostCenterDto) {
    const mcost = await this.prisma.mCostCenter.update({
      where: { idCostCenter: id },
      data: updateMCostCenterDto,
    });
    return mcost;
  }

  async remove(id: number) {
    const mcost = await this.prisma.mCostCenter.delete({ where: { idCostCenter: id } });
    return mcost;
  }
}
