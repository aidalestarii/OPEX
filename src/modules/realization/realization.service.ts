import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/service/prisma.service';
import {
  CreateRealizationDto,
  CreateRealizationItemDto,
  MStatusDto,
} from './dto/create-realization.dto';
import { CreateFileDto } from './dto/create-file-upload.dto';
import { StatusEnum } from '@prisma/client';

@Injectable()
export class RealizationService {
  constructor(private readonly prisma: PrismaService) {}

  async createMStatus(mStatusDto: MStatusDto) {
    const status = await this.prisma.mStatus.create({
      data: mStatusDto,
    });
    return status;
  }

  async createRealizationItems(
    createRealization: CreateRealizationDto,
    realizationItems: CreateRealizationItemDto[],
    uploadfile: CreateFileDto[],
  ) {
    return this.prisma.$transaction(async (prisma) => {
      try {
        // Extract Realization data from the DTO
        const { ...realizationData } = createRealization;

        // Create realization within the transaction
        const createdRealization = await prisma.realization.create({
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
            status: StatusEnum.OPEN,
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
                idCostCenter: realizationData.costCenterId,
              },
            },
          },
        });

        const createdItems = await Promise.all(
          realizationItems.map(async (item: CreateRealizationItemDto) => {
            return prisma.realizationItem.create({
              data: {
                ...item,
                realizationId: createdRealization.idRealization,
                amount: item.amountSubmission,
                createdBy: createdRealization.createdBy,
                glAccountId: item.glAccountId,
              },
            });
          }),
        );

        // Create file uploads within the transaction
        const uploadFiles = await Promise.all(
          uploadfile.map(async (file: CreateFileDto) => {
            return prisma.fileUpload.create({
              data: {
                tableName: 'Realization',
                tableId: createdRealization.idRealization,
                docCategoryId: file.docCategoryId,
                docName: file.docName,
                docSize: file.docSize,
                docLink: file.docLink,
                docType: file.docType,
                createdBy: createdRealization.createdBy,
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
      } catch (error) {
        console.log(error.message);
        throw new HttpException(
          {
            data: null,
            meta: null,
            message: 'Failed to create new request',
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            time: new Date(),
            error: error.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    });
  }

  async createRealizationItemss(
    createRealization: CreateRealizationDto,
    realizationItems: CreateRealizationItemDto[],
    uploadfile: CreateFileDto[],
  ) {
    let transaction;

    try {
      return this.prisma.$transaction(async (prisma) => {
        // Extract Realization data from the DTO
        const { ...realizationData } = createRealization;

        // Create realization within the transaction
        const createdRealization = await prisma.realization.create({
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
            status: StatusEnum.OPEN,
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
                idCostCenter: realizationData.costCenterId,
              },
            },
          },
        });

        const createdItems = [];
        for (const item of realizationItems) {
          const createdItem = await prisma.realizationItem.create({
            data: {
              ...item,
              realizationId: createdRealization.idRealization,
              amount: item.amountSubmission,
              createdBy: createdRealization.createdBy,
              glAccountId: item.glAccountId,
            },
          });
          createdItems.push(createdItem);
        }

        // Create file uploads within the transaction
        const uploadFiles = [];
        for (const file of uploadfile) {
          const uploadFile = await prisma.fileUpload.create({
            data: {
              tableName: 'Realization',
              tableId: createdRealization.idRealization,
              docCategoryId: file.docCategoryId,
              docName: file.docName,
              docSize: file.docSize,
              docLink: file.docLink,
              docType: file.docType,
              createdBy: createdRealization.createdBy,
            },
          });
          uploadFiles.push(uploadFile);
        }

        return {
          realization: {
            ...createdRealization,
            realizationItems: createdItems,
            uploadFiles,
          },
        };
      });
    } catch (error) {
      console.log(error.message);
      throw new HttpException(
        {
          data: null,
          meta: null,
          message: 'Failed to create a new request',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          time: new Date(),
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      if (transaction) {
        // If needed, close or commit the transaction here
      }
    }
  }

  async findAllRealization() {
    const realization = await this.prisma.realization.findMany({
      include: {
        realizationItem: true,
      },
    });
    const fileUpload = await this.prisma.fileUpload.findMany();

    const realizationWithFileUpload = realization.map((realizationItem) => {
      const correspondingFileUploads = fileUpload.filter(
        (fileUpload) => fileUpload.tableId === realizationItem.idRealization,
      );

      return {
        realization: {
          ...realizationItem,
          fileUploads: correspondingFileUploads || [], // Array of file uploads or an empty array
        },
      };
    });

    return {
      data: realizationWithFileUpload,
      meta: null,
      message: 'All realization retrieved',
      status: HttpStatus.OK,
      time: new Date(),
    };
  }

  async findOneRealization(id: number) {
    const realization = await this.prisma.realization.findUnique({
      where: {
        idRealization: id,
      },
      include: {
        realizationItem: true,
      },
    });
    const fileUpload = await this.prisma.fileUpload.findMany();

    if (!realization) {
      throw new HttpException(
        {
          data: null,
          meta: null,
          message: 'Realization not found',
          status: HttpStatus.NOT_FOUND,
          time: new Date(),
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const correspondingFileUploads = fileUpload.filter(
      (fileUpload) => fileUpload.tableId === realization.idRealization,
    );

    const realizationWithFileUpload = {
      realization: {
        ...realization,
        fileUploads: correspondingFileUploads || [], // Array of file uploads or an empty array
      },
      meta: null,
      message: 'Realization found',
      status: HttpStatus.OK,
      time: new Date(),
    };

    return realizationWithFileUpload;
  }
}
