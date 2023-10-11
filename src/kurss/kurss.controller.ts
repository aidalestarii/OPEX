import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { KurssService } from './kurss.service';
import { CreateKurssDto } from './dto/create-kurss.dto';
import { UpdateKurssDto } from './dto/update-kurss.dto';

@Controller('kurss')
export class KurssController {
  constructor(private readonly kurssService: KurssService) {}

  @Post()
  create(@Body() createKurssDto: CreateKurssDto) {
    return this.kurssService.create(createKurssDto);
  }

  @Get()
  findAll() {
    return this.kurssService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.kurssService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateKurssDto: UpdateKurssDto) {
    return this.kurssService.update(+id, updateKurssDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.kurssService.remove(+id);
  }
}
