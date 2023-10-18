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
  create(@Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetService.create(createBudgetDto);
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
  
  @Get(':id/total')
  async calculateTotal(@Param('id') id: number) {
    const total = await this.budgetService.calculateTotalValue(id);
    return { total };
  }
}
