import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/service/prisma.service';
import { CreateRealizationDto } from './dto/create-realization.dto';

@Injectable()
export class RealizationService {
  constructor(private readonly prisma: PrismaService) {}

  // async create(createRealizationDto: CreateRealizationDto) {
  //   const realization = await this.prisma.realization.create({
  //     data: createRealizationDto,
  //   });
  //   return realization;
  //}
}
