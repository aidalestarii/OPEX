import { Injectable } from '@nestjs/common';
import { CreateKurssDto } from './dto/create-kurss.dto';
import { UpdateKurssDto } from './dto/update-kurss.dto';
import { PrismaService } from 'src/prisma.service';
import { Kurs } from '@prisma/client';


@Injectable()
export class KurssService {
  constructor(private readonly prisma: PrismaService) {}
  create(createKurssDto: CreateKurssDto) {
    return this.prisma.kurs.create({
      data: createKurssDto,
    });
  }

  findAll() {
    return this.prisma.kurs.findMany();
  }

  findOne(id: number) {
    return this.prisma.kurs.findUnique({ where: { idKurs: id } });
  }
  
  update(id: number, updateKurssDto: UpdateKurssDto) {
    return this.prisma.kurs.update({
      where: { idKurs: id },
      data: updateKurssDto,
    });
  }

  remove(id: number) {
    return this.prisma.kurs.delete({ where: { idKurs: id } });
  }
}
