import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { ShowBudgetDTO } from './dto/show-budget.dto';
import { Console } from 'console';

@Controller({
  version: '1',
  path: 'api/budget',
})
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  async create(@Body() createBudgetDto: CreateBudgetDto) {
    const total = this.calculateTotal(createBudgetDto);
    createBudgetDto.total = total;
    const createdBudget = await this.budgetService.create(createBudgetDto);
    return createdBudget;
  }

  private calculateTotal(createBudgetDto: CreateBudgetDto): number {
    const values = [
      createBudgetDto.value01,
      createBudgetDto.value02,
      createBudgetDto.value03,
      createBudgetDto.value04,
      createBudgetDto.value05,
      createBudgetDto.value06,
      createBudgetDto.value07,
      createBudgetDto.value08,
      createBudgetDto.value09,
      createBudgetDto.value10,
      createBudgetDto.value11,
      createBudgetDto.value12,
      createBudgetDto.value13,
      createBudgetDto.value14,
      createBudgetDto.value15,
      createBudgetDto.value16,
    ];
    return values.reduce((total, value) => total + value, 0);
  }

  @Get()
  findAll(showBudgetDTO: ShowBudgetDTO) {
    return this.budgetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.budgetService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateBudgetDto: UpdateBudgetDto) {
    return this.budgetService.update(+id, updateBudgetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetService.remove(+id);
  }
}
