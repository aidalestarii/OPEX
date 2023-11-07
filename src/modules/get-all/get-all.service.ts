// service1.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/service/prisma.service';

@Injectable()
export class Service1 {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<any> {
    const data = await this.prisma.mKurs.findMany();
    //console.log(data);
    return data;
  }
}
