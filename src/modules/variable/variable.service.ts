import { Injectable } from '@nestjs/common';
import { CreateVariableDto } from './dto/create-variable.dto';
import { UpdateVariableDto } from './dto/update-variable.dto';
import { PrismaService } from 'src/core/service/prisma.service';

@Injectable()
export class VariableService {
  constructor(private readonly prisma: PrismaService) {}

  create(createVariableDto: CreateVariableDto) {
    return 'This action adds a new variable';
  }

  async calculateAndSaveValues() {
    const a = 10;
    const b = 5;
    const c = a * b;

    const budget = await this.prisma.mVar.create({
      data: {
        value1: a,
        value2: b,
        value3: c,
      },
    });

    return budget;
  }

  findAll() {
    return `This action returns all variable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variable`;
  }

  update(id: number, updateVariableDto: UpdateVariableDto) {
    return `This action updates a #${id} variable`;
  }

  remove(id: number) {
    return `This action removes a #${id} variable`;
  }
}
