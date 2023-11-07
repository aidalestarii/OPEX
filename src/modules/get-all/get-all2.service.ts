import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/service/prisma.service';

@Injectable()
export class Service3 {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<any> {
    const data = await this.prisma.mGlAccount.findMany();
    // console.log(data);
    return data;
  }
}
