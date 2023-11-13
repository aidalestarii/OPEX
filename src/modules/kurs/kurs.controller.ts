import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
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
  findAllPaginated(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('orderBy') orderBy: string,
  ) {
    return this.kursService.findAllPaginated(page, perPage, orderBy);
  }

  @Get()
  findAll() {
    return this.kursService.findAll();
  }

  @Get(':years')
  findYears(@Param('years') years: number) {
    return this.kursService.findYears(+years);
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
