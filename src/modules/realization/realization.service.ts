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
  //   const {
  //     years,
  //     month,
  //     draftNumber,
  //     requestNumber,
  //     taReff,
  //     type,
  //     responsibleNopeg,
  //     titleRequest,
  //     noteRequest,
  //     status,
  //     statusId,
  //     department,
  //     personalNumber,
  //     statusToId,
  //     departmentTo,
  //     personalNumberTo,
  //     createdBy,
  //     realization_item, // Assuming the array of realization items is passed as realizationItems
  //   } = createUserDto;

  //   return this.prisma.realization.create({
  //     data: {
  //       years,
  //       month,
  //       draftNumber,
  //       requestNumber,
  //       taReff,
  //       type,
  //       responsibleNopeg,
  //       titleRequest,
  //       noteRequest,
  //       status,
  //       statusId,
  //       department,
  //       personalNumber,
  //       statusToId,
  //       departmentTo,
  //       personalNumberTo,
  //       createdBy,
  //       m_cost_center: {
  //         connect: {
  //           idCostCenter: createUserDto.costCenterId,
  //         },
  //       },
  //       realization_item: {
  //         createMany: {
  //           data: realization_item, // Assuming realizationItems is an array of realization items
  //         },
  //       },
  //     },
  //     include: {
  //       realization_item: true,
  //     },
  //   });
  // }
}
