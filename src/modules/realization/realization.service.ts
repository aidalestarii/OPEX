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

  // async getTest(dto) {
  //   await this.prisma.realization.create({
  //     data: {
  //       titleRequest: '',

  //       mStatus: {
  //         connect: {
  //           uniqueId: dto
  //         }
  //       },
  //       mCostCenter: {
  //         connect: {
  //           idCostCenter
  //         }
  //       }
  //     }
  //   })
  // }

  // async createRealization(createUserDto: CreateRealizationDto): Promise<any> {
  //   const { years, month, costCenterId, draftNumber, requestNumber, taReff, type,
  //     responsibleNopeg, titleRequest, noteRequest, status, statusId, department,
  //     personalNumber, statusToId, departmentTo, personalNumberTo,
  //     createdBy, realization_item } = createUserDto;

  //   return this.prisma.$transaction(async (prisma) => {
  //     // Membuat pengguna
  //     const realization = await prisma.realization.create({
  //       data: {
  //         years, month, draftNumber, requestNumber, taReff, type,
  //         responsibleNopeg, titleRequest, noteRequest, status, statusId, department,
  //         personalNumber, statusToId, departmentTo, personalNumberTo,
  //         createdBy,
  //         m_cost_center:{
  //           connect:{
  //             idCostCenter: +costCenterId,
  //           }
  //         },
  //         realization_item: {
  //           createMany: {
  //             data: realization_item,
  //           },
  //         },
  //       },
  //       include: {
  //         realization_item: true,
  //       },
  //     });

  //     return realization;
  //   });
  // }
}
