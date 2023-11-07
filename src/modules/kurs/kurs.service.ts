import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateKursDto } from './dto/create-kurs.dto';
import { UpdateKursDto } from './dto/update-kurs.dto';
import { PrismaService } from 'src/core/service/prisma.service';

@Injectable()
export class KursService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createKursDto: CreateKursDto) {
    try {
      const kurs = await this.prisma.mKurs.create({
        data: createKursDto,
      });
      return {
        data: kurs,
        meta: null,
        message: 'Kurs created successfully',
        status: HttpStatus.CREATED,
        time: new Date(),
      };
    } catch (error) {
      throw new HttpException(
        {
          data: null,
          meta: null,
          message: 'Failed to create kurs',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          time: new Date(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    const data = await this.prisma.mKurs.findMany();
    return {
      data: data,
      meta: null,
      message: 'All kurs retrieved',
      status: HttpStatus.OK,
      time: new Date(),
    };
  }

  async findOne(id: number) {
    const kurs = await this.prisma.mKurs.findUnique({ where: { idKurs: id } });
    if (!kurs) {
      throw new HttpException(
        {
          data: null,
          meta: null,
          message: 'Kurs not found',
          status: HttpStatus.NOT_FOUND,
          time: new Date(),
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      data: kurs,
      meta: null,
      message: 'Kurs found',
      status: HttpStatus.OK,
      time: new Date(),
    };
  }

  async update(id: number, updateKursDto: UpdateKursDto) {
    //Validation ID
    const existingKurs = await this.prisma.mKurs.findUnique({
      where: { idKurs: id },
    });
    if (!existingKurs) {
      throw new NotFoundException(`Kurs with ID ${id} not found`);
    }
    try {
      const updatedKurs = await this.prisma.mKurs.update({
        where: { idKurs: id },
        data: updateKursDto,
      });
      return {
        data: updateKursDto,
        meta: null,
        message: 'Kurs updated successfully',
        status: HttpStatus.OK,
        time: new Date(),
      };
    } catch (error) {
      throw new HttpException(
        {
          data: null,
          meta: null,
          message: 'Failed to update kurs',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          time: new Date(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    const data = await this.prisma.mKurs.delete({
      where: { idKurs: id },
    });
    return { data };
  }
}
