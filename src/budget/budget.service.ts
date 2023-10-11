import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BudgetService {
  constructor(private readonly prisma: PrismaService) {}
  create(createBudgetDto: CreateBudgetDto) {
    return this.prisma.budget.create({
      data: createBudgetDto,
    });
  }

  findAll() {
    return this.prisma.budget.findMany();
  }

  findOne(id: number) {
    return this.prisma.budget.findUnique({ where: { idBudget: id } });
  }

  update(id: number, updateBudgetDto: UpdateBudgetDto) {
    return this.prisma.budget.update({
      where: { idBudget: id },
      data: updateBudgetDto,
    });
  }

  remove(id: number) {
    return this.prisma.budget.delete({ where: { idBudget: id } });
  }
}
