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
  NotFoundException,
  Res,
  Req,
} from '@nestjs/common';
import { KursService } from './kurs.service';
import { CreateKursDto } from './dto/create-kurs.dto';
import { UpdateKursDto } from './dto/update-kurs.dto';
import { BaseController } from 'src/core/base.controller';
import { Response, Request } from 'express';

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
  async findAllKurs(@Res() res: Response): Promise<Response<any, any>> {
    try {
      const getAll = await this.kursService.findAll();
      return this.ok(res, getAll, {});
    } catch (error) {
      return res.status(400).json(error.response);
    }
  }

  @Get()
  findAllPaginated(
    @Query('page') page: number,
    @Query('orderBy') orderBy: string,
  ) {
    return this.kursService.findAllPaginated(page, orderBy);
  }

  @Get('/years/:years')
  findYears(@Param('years') years: number) {
    return this.kursService.findYears(+years);
  }

  @Get('/:id')
  async findOne(@Res() res: Response, @Param('id') id: number) {
    try {
      const findOneKurs = await this.kursService.findOne(+id);
      return this.ok(res, findOneKurs, {});
    } catch (error) {
      return this.exceptionHandler(error.response);
    }
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
