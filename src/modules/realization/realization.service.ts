import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/service/prisma.service';
//import { CreateRealizationDto } from './dto/create-realization.dto';
import { CreateMCostCenterDto } from '../m_cost_center/dto/create-m_cost_center.dto';
import { CreateMGlAccountDto } from '../m_gl_account/dto/create-m_gl_account.dto';
import {
  CreateRealization,
  CreateRealizationItem,
  MStatus,
} from './dto/create-realization.dto';

@Injectable()
export class RealizationService {
  constructor(private readonly prisma: PrismaService) {}

  async createMStatus(mstatus: MStatus) {
    console.log(mstatus);
    const status = await this.prisma.mStatus.create({
      data: mstatus,
    });
    return status;
  }

  async createRealizationItems(createRealization: CreateRealization) {
    // Extract Realization data from the DTO
    const { realizationItems, ...realizationData } = createRealization;

    //create realization
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

      //create realization item
      const createdItems = await Promise.all(
        realizationItems.map((item: CreateRealizationItem) => {
          return prisma.realizationItem.create({
            data: {
              ...item,
              realizationId: createdRealization.idRealization,
            },
          });
        }),
      );
      // const createdOtherTableData = await prisma.mStatus.create({
      //   data: {
      //     // ... otherTableData (sesuaikan dengan struktur data tabel lainnya)
      //     idStatus: createRealization.statusId
      //     // idStatus: createRealization.statusToId,
      //   },
      // });
      return {
        ...createdRealization,
        realizationItems: createdItems,
      };
    });
  }
}
