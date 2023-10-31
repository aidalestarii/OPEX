import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKursDto } from './dto/create-kurs.dto';
import { UpdateKursDto } from './dto/update-kurs.dto';
import { PrismaService } from 'src/core/service/prisma.service';

@Injectable()
export class KursService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createKursDto: CreateKursDto) {

    const kurs = await this.prisma.mKurs.create({
      data: createKursDto,
    });
    return kurs;
  }

  async findAll() {
    const kurs = await this.prisma.mKurs.findMany();
    return kurs;
  }

  async findOne(id: number) {
    const kurs = await this.prisma.mKurs.findUnique({ where: { idKurs: id } });
    return kurs;
  }

  async update(id: number, updateKursDto: UpdateKursDto) {
    //Validation ID
    const existingKurs = await this.prisma.mKurs.findUnique({
      where: { idKurs: id },
    });
    if (!existingKurs) {
      throw new NotFoundException(`Kurs with ID ${id} not found`);
    }
    const kurs = await this.prisma.mKurs.update({
      where: { idKurs: id },
      data: updateKursDto,
    });
    return kurs;
  }

  async remove(id: number) {
    const kurs = await this.prisma.mKurs.delete({
      where: { idKurs: id },
    });
    return kurs;
  }
}
