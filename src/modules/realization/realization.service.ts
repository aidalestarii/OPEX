import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/service/prisma.service';
//import { CreateRealizationDto } from './dto/create-realization.dto';
import { CreateMCostCenterDto } from '../m_cost_center/dto/create-m_cost_center.dto';
import { CreateMGlAccountDto } from '../m_gl_account/dto/create-m_gl_account.dto';
import {
  CreateRealization,
  CreateRealizationItem,
  MStatus,
} from './dto/create-realization.dto';
import {
  UpdateRealization,
  UpdateRealizationItem,
} from './dto/update-realization.dto';

@Injectable()
export class RealizationService {
  constructor(private readonly prisma: PrismaService) {}

  async createMStatus(mstatus: MStatus) {
    const status = await this.prisma.mStatus.create({
      data: mstatus,
    });
    return status;
  }

  async findRealization() {
    const data = await this.prisma.realization.findMany();
    return { data };
  }

  async createRealizationItems(createRealization: CreateRealization) {
    // Extract Realization data from the DTO
    const { realizationItems, ...realizationData } = createRealization;
    const statusId = 1;
    const statusToId = 2;
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
          // statusId,
          // statusToId: realizationData.statusToId,
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
      return {
        ...createdRealization,
        realizationItems: createdItems,
      };
    });
  }

  async updateRealization(
    id: number,
    updateData: UpdateRealization,
  ): Promise<any> {
    const existingRealization = await this.prisma.realization.findUnique({
      where: { idRealization: id },
      include: { realization_item: true }, // Include related items for update
    });

    if (!existingRealization) {
      throw new NotFoundException(`Realization with ID ${id} not found.`);
    }

    // Update realization entity
    const updatedRealization = await this.prisma.realization.update({
      where: { idRealization: id },
      data: updateData,
    });

    // Update realization items
    const updatedItems = await Promise.all(
      updateData.realizationItems.map((item: UpdateRealizationItem) => {
        const existingItem = existingRealization.realization_item.find(
          (i) => i.idRealizationItem === item.realizationId,
        );
        if (!existingItem) {
          throw new NotFoundException(
            `Realization item with ID ${item.realizationId} not found.`,
          );
        }
        return this.prisma.realizationItem.update({
          where: { idRealizationItem: item.realizationId },
          data: item,
        });
      }),
    );

    return {
      ...updatedRealization,
      realizationItems: updatedItems,
    };
  }
}
