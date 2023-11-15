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

  // @Post()
  // create(@Body() createKursDto: CreateKursDto) {
  //   return this.kursService.create(createKursDto);
  // }

  @Post()
  async createKurs(@Body() data: any) {
    try {
      // Validasi bahwa 'years' tidak boleh kosong
      if (!data.years) {
        throw new HttpException(
          'Field years is required',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Validasi tipe data untuk 'years'
      if (typeof data.years !== 'number') {
        throw new HttpException(
          'Field "years" must be a number',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!data.value) {
        throw new HttpException(
          'Field value is required',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (!data.createdBy) {
        throw new HttpException(
          'Field createdBy is required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newKurs = await this.kursService.create(data);
      return newKurs;
    } catch (error) {
      // Tangkap kesalahan dan lemparkan HttpException
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
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
