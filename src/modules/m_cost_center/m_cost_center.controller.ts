import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MCostCenterService } from './m_cost_center.service';
import { CreateMCostCenterDto } from './dto/create-m_cost_center.dto';
import { UpdateMCostCenterDto } from './dto/update-m_cost_center.dto';

@Controller('m-cost-center')
export class MCostCenterController {
  constructor(private readonly mCostCenterService: MCostCenterService) {}

  @Post()
  create(@Body() createMCostCenterDto: CreateMCostCenterDto) {
    return this.mCostCenterService.create(createMCostCenterDto);
  }

  @Get()
  findAll() {
    return this.mCostCenterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.mCostCenterService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateMCostCenterDto: UpdateMCostCenterDto) {
    return this.mCostCenterService.update(+id, updateMCostCenterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.mCostCenterService.remove(+id);
  }
}
