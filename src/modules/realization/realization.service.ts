import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/service/prisma.service';

import {
  CreateRealizationDto,
  CreateRealizationItem,
  MStatus,
} from './dto/create-realization.dto';
import { CreateFileDto } from './dto/create-file-upload.dto';

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

  // async createRealizationWithFiles(
  //   createRealization: CreateRealizationDto,
  //   processedFiles: { files: Express.Multer.File; docName: string }[],

  // ) {
  //   const { realizationItems, ...realizationData } = createRealization;

  //   // Your logic to create realization
  //   const createdRealization = await this.prisma.realization.create({
  //     data: {
  //       years: new Date().getFullYear(),
  //       month: new Date().getMonth() + 1,
  //       requestNumber: realizationData.requestNumber,
  //       taReff: realizationData.taReff,
  //       responsibleNopeg: realizationData.responsibleNopeg,
  //       titleRequest: realizationData.titleRequest,
  //       noteRequest: realizationData.noteRequest,
  //       department: realizationData.department,
  //       personalNumber: realizationData.personalNumber,
  //       departmentTo: realizationData.departmentTo,
  //       personalNumberTo: realizationData.personalNumberTo,
  //       createdBy: realizationData.createdBy,
  //       status: realizationData.status,
  //       type: realizationData.type,
  //       m_status_realization_id_statusTom_status: {
  //         connect: {
  //           idStatus: 1,
  //         },
  //       },
  //       m_status_realization_id_status_toTom_status: {
  //         connect: {
  //           idStatus: 2,
  //         },
  //       },
  //       m_cost_center: {
  //         connect: {
  //           costCenter: realizationData.costCenter.toString(),
  //         },
  //       },
  //     },
  //   });

  //   const createdItems = await Promise.all(
  //     processedFiles.map((item) => {
  //       return this.prisma.realizationItem.create({
  //         data: {
  //           ...item,
  //           realizationId: createdRealization.idRealization,
  //         },
  //       });
  //     }),
  //   );

  //   return {
  //     realization: {
  //       ...createdRealization,
  //       realizationItems: createdItems,
  //     },
  //   };
  // }

  //INI BISA
  async createRealizationItems(
    createRealization: CreateRealizationDto,
    realizationItems: CreateRealizationItem[], // Add this parameter
    uploadfile: CreateFileDto[], // Add this parameter
  ) {
    // Extract Realization data from the DTO
    const { ...realizationData } = createRealization;

    const createdRealization = await this.prisma.realization.create({
      data: {
        years: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
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
        m_status_realization_id_statusTom_status: {
          connect: {
            idStatus: 1,
          },
        },
        m_status_realization_id_status_toTom_status: {
          connect: {
            idStatus: 2,
          },
        },
        m_cost_center: {
          connect: {
            costCenter: realizationData.costCenter.toString(),
          },
        },
      },
    });

    const createdItems = await Promise.all(
      realizationItems.map((item: CreateRealizationItem) => {
        return this.prisma.realizationItem.create({
          data: {
            ...item,
            realizationId: createdRealization.idRealization,
          },
        });
      }),
    );

    const uploadFiles = await Promise.all(
      uploadfile.map((file: CreateFileDto) => {
        return this.prisma.fileUpload.create({
          data: {
            tableName: 'Realization',
            docCategoryId: file.docCategoryId,
            docName: file.docName,
            docSize: file.docSize,
            docLink: file.docLink,
            docType: file.docType,
            createdBy: file.createdBy,
          },
        });
      }),
    );

    return {
      realization: {
        ...createdRealization,
        realizationItems: createdItems,
        uploadFiles,
      },
    };
  }
}
