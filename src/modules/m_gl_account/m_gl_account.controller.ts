import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MGlAccountService } from './m_gl_account.service';
import { CreateMGlAccountDto } from './dto/create-m_gl_account.dto';
import { UpdateMGlAccountDto } from './dto/update-m_gl_account.dto';

@Controller('m-gl-account')
export class MGlAccountController {
  constructor(private readonly mGlAccountService: MGlAccountService) {}

  @Post()
  create(@Body() createMGlAccountDto: CreateMGlAccountDto) {
    return this.mGlAccountService.create(createMGlAccountDto);
  }

  @Get()
  findAll() {
    return this.mGlAccountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.mGlAccountService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateMGlAccountDto: UpdateMGlAccountDto) {
    return this.mGlAccountService.update(+id, updateMGlAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.mGlAccountService.remove(+id);
  }
}
