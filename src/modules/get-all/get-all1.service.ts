import { Injectable } from '@nestjs/common';
import { CreateMCostCenterDto } from '../m_cost_center/dto/create-m_cost_center.dto';
import { PrismaService } from 'src/core/service/prisma.service';

@Injectable()
export class Service2 {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<any> {
    const data = await this.prisma.mCostCenter.findMany();
    // console.log(data);
    return data;
  }
}
