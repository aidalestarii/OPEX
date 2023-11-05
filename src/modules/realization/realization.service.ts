import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/service/prisma.service';
//import { CreateRealizationDto } from './dto/create-realization.dto';
import { CreateMCostCenterDto } from '../m_cost_center/dto/create-m_cost_center.dto';
import { CreateMGlAccountDto } from '../m_gl_account/dto/create-m_gl_account.dto';
import {
  CreateRealizationWithItemsDto,
  CreateRealizationItemDto,
} from './dto/create-realization.dto';

@Injectable()
export class RealizationService {
  constructor(private readonly prisma: PrismaService) {}

  async createRealizationWithItems(
    createRealizationWithItemsDto: CreateRealizationWithItemsDto,
  ) {
    // Extract Realization data from the DTO
    const { realizationItems, ...realizationData } =
      createRealizationWithItemsDto;

    return await this.prisma.$transaction(async (prisma) => {
      const createdRealization = await prisma.realization.create({
        data: {
          years: realizationData.years,
          month: realizationData.month,
          draftNumber: realizationData.draftNumber,
          requestNumber: realizationData.requestNumber,
          taReff: realizationData.taReff,
          responsibleNopeg: realizationData.responsibleNopeg,
          titleRequest: realizationData.titleRequest,
          noteRequest: realizationData.noteRequest,
          department: realizationData.department,
          personalNumber: realizationData.personalNumber,
          departmentTo: realizationData.departmentTo,
          personalNumberTo: realizationData.personalNumberTo,
          createdBy: realizationData.createdBy,
          status: realizationData.status,
          type: realizationData.type,
          m_cost_center: {
            connect: {
              idCostCenter: +realizationData.costCenterId,
            },
          },
        },
      });

      const createdItems = await Promise.all(
        realizationItems.map((item: CreateRealizationItemDto) => {
          return prisma.realizationItem.create({
            data: {
              ...item,
              realizationId: createdRealization.idRealization,
            },
          });
        }),
      );
      return { ...createdRealization, realizationItems: createdItems };
    });
  }
}
