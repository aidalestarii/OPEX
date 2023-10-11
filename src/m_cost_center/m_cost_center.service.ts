import { Injectable } from '@nestjs/common';
import { CreateMCostCenterDto } from './dto/create-m_cost_center.dto';
import { UpdateMCostCenterDto } from './dto/update-m_cost_center.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MCostCenterService {
  constructor(private readonly prisma: PrismaService) {}
  create(createMCostCenterDto: CreateMCostCenterDto) {
    return this.prisma.mCostCenter.create({
      data: createMCostCenterDto,
    });
  }

  findAll() {
    return this.prisma.mCostCenter.findMany();
  }

  findOne(id: number) {
    return this.prisma.mCostCenter.findUnique({ where: { idCostCenter: id } });
  }

  update(id: number, updateMCostCenterDto: UpdateMCostCenterDto) {
    return this.prisma.mCostCenter.update({
      where: { idCostCenter: id },
      data: updateMCostCenterDto,
    });
  }

  remove(id: number) {
    return this.prisma.mCostCenter.delete({ where: { idCostCenter: id } });
  }
}
