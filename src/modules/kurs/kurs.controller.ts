import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { KursService } from './kurs.service';
import { CreateKursDto } from './dto/create-kurs.dto';
import { UpdateKursDto } from './dto/update-kurs.dto';
import { BaseController } from 'src/core/base.controller';
import { Response } from 'express';

@Controller({
  version: '1',
  path: 'api/kurs',
})
export class KursController extends BaseController {
  constructor(private readonly kursService: KursService) {
    super();
  }

  @Post()
  async createKurs(
    @Res() res: Response,
    @Body() data: CreateKursDto,
  ): Promise<Response<any, any>> {
    try {
      const newKurs = await this.kursService.create(data);
      return this.created(res, newKurs, {});
    } catch (error) {
      this.exceptionHandler(error);
    }
  }

  @Get('/all')
  findAll() {
    return this.kursService.findAll();
  }

  @Get()
  findAllPaginated(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('orderBy') orderBy: string,
  ) {
    return this.kursService.findAllPaginated(page, perPage, orderBy);
  }

  @Get('/years/:years')
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
