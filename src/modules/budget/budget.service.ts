import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { PrismaService } from 'src/core/service/prisma.service';

@Injectable()
export class BudgetService {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(createBudgetDto: CreateBudgetDto) {
    const budget = await this.prisma.budget.create({
      data: createBudgetDto,
    });
    return budget;
  }

  async findAll() {
    const budget = this.prisma.budget.findMany();
    return budget;
  }

  async findOne(id: number) {
    const budget = await this.prisma.budget.findUnique({ 
      where: { idBudget: id } });
    return budget;
  }

  async update(id: number, updateBudgetDto: UpdateBudgetDto) {
    const existingKurs = await this.prisma.kurs.findUnique({ where: { idKurs: id } });
    if (!existingKurs) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }
    const budget = await this.prisma.budget.update({
      where: { idBudget: id },
      data: updateBudgetDto,
    });
    return budget;
  }

  async remove(id: number) {
    const budget = await this.prisma.budget.delete({ 
      where: { idBudget: id } 
    });
    return budget;
  }
}
