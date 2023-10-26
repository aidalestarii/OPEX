import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { KursService } from './kurs.service';
import { CreateKursDto } from './dto/create-kurs.dto';
import { UpdateKursDto } from './dto/update-kurs.dto';

@Controller({
  version: '1',
  path: 'api/kurs',
})
export class KursController {
  constructor(private readonly kursService: KursService) {}

  @Post()
  create(@Body() createKursDto: CreateKursDto) {
    return this.kursService.create(createKursDto);
  }

  @Get()
  findAll() {
    return this.kursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.kursService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateKursDto: UpdateKursDto) {
    return this.kursService.update(+id, updateKursDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.kursService.remove(+id);
  }
}
