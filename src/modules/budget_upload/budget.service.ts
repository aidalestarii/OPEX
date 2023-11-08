import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemsBudgetUploadDto } from './dtos/budget-upload.dto';
import { UpdateBudgetDto } from './dtos/update-budget.dto';
import { PrismaService } from 'src/core/service/prisma.service';

@Injectable()
export class BudgetService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBudgetDto: ItemsBudgetUploadDto) {
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
      where: {
        idBudget: id,
      },
    });
    return budget;
  }

  async update(id: number, updateBudgetDto: UpdateBudgetDto) {
    // const existingKurs = await this.prisma.kurs.findUnique({
    //   where: { idKurs: id },
    // });
    // if (!existingKurs) {
    //   throw new NotFoundException(`Budget with ID ${id} not found`);
    // }
    const budget = await this.prisma.budget.update({
      where: { idBudget: id },
      data: updateBudgetDto,
    });
    return budget;
  }

  async remove(id: number) {
    const budget = await this.prisma.budget.delete({
      where: { idBudget: id },
    });
    return budget;
  }

  async deleteAll() {
    // Use the Prisma client to delete all records in the Budget table
    await this.prisma.budget.deleteMany({});
  }

  // async totalBudget() {
  //   const total = await this.prisma.$queryRaw`
  //   SELECT
  //     SUM(value01 + value02 + value03 + value04 + value05 + value06 + value07 + value08 + value09 + value10 + value11 + value12 + value13 + value14 + value15 + value16) as total
  //   FROM Budget;
  // `;
  //   return total[0].total;
  // }
  async totalBudget(idBudget: number): Promise<number> {
    const budget = await this.prisma.budget.findUnique({
      where: {
        idBudget: idBudget, // Menggunakan tipe data number
      },
    });

    if (!budget) {
      throw new NotFoundException(`Budget with ID ${idBudget} not found`);
    }

    // Calculate the total value from value01 to value16
    const total =
      budget.value01 +
      budget.value02 +
      budget.value03 +
      budget.value04 +
      budget.value05 +
      budget.value06 +
      budget.value07 +
      budget.value08 +
      budget.value09 +
      budget.value10 +
      budget.value11 +
      budget.value12 +
      budget.value13 +
      budget.value14 +
      budget.value15 +
      budget.value16;

    return total;
  }
}
