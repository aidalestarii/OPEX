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
      realizationItems.map((item: CreateRealizationItemDto) => {
        return this.prisma.realizationItem.create({
          data: {
            ...item,
            realizationId: createdRealization.idRealization,
            amount: item.amountSubmission,
            createdBy: createdRealization.createdBy,
          },
        });
      }),
    );

    const uploadFiles = await Promise.all(
      uploadfile.map((file: CreateFileDto) => {
        return this.prisma.fileUpload.create({
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
  }

  async createdRealizationItems(
    createRealization: CreateRealizationDto,
    realizationItems: CreateRealizationItemDto[],
    uploadfile: CreateFileDto[],
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
        status: StatusEnum.PROGRESS,
        type: realizationData.type,
        m_status_realization_id_statusTom_status: {
          connect: {
            idStatus: 2,
          },
        },
        m_status_realization_id_status_toTom_status: {
          connect: {
            idStatus: 3,
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
      realizationItems.map((item: CreateRealizationItemDto) => {
        return this.prisma.realizationItem.create({
          data: {
            ...item,
            realizationId: createdRealization.idRealization,
            amount: item.amountSubmission,
            createdBy: createdRealization.createdBy,
          },
        });
      }),
    );

    const uploadFiles = await Promise.all(
      uploadfile.map((file: CreateFileDto) => {
        return this.prisma.fileUpload.create({
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
  }

  // async updateRealizationItems(id: number, updateRealization: UpdateRealizationDto, updateItems: UpdateRealizationItemDto[], updateFiles: UpdateFileDto[]): Promise<Realization> {
  //   const existingRealization = await this.prisma.realization.findUnique({ where: { idRealization: id } });

  //   if (!existingRealization) {
  //     throw new NotFoundException('Realization not found');
  //   }

  //   if (existingRealization.status === StatusEnum.PROGRESS) {
  //     throw new BadRequestException('Cannot update a submitted realization');
  //   }

  //   const updatedRealization = await this.prisma.realization.update({
  //     where: { idRealization: id },
  //     data: {
  //       ...updateRealization,
  //       m_status_realization_id_statusTom_status: {
  //         connect: {
  //           idStatus: 2,
  //         },
  //       },
  //       m_status_realization_id_status_toTom_status: {
  //         connect: {
  //           idStatus: 3,
  //         },
  //       },
  //     },
  //   });

  //   const updatedItems = await Promise.all(
  //     updateItems.map((item: CreateRealizationItemDto) => {
  //       return this.prisma.realizationItem.update({
  //         where: { realizationId: item.amount },
  //         data: {
  //           ...item,
  //           realizationId: updatedRealization.idRealization,
  //         },
  //       });
  //     }),
  //   );

  //   const updatedFiles = await Promise.all(
  //     updateFiles.map((file: UpdateFileDto) => {
  //       return this.prisma.fileUpload.update({
  //         where: { idUpload: id },
  //         data: {
  //           ...file,
  //           tableId: updatedRealization.idRealization,
  //         },
  //       });
  //     }),
  //   );

  //   return {
  //     ...updatedRealization,
  //     realizationItems: updatedItems,
  //     uploadFiles: updatedFiles,
  //   };
  // }

  async findAllRealization() {
    const realization = await this.prisma.realization.findMany({
      include: {
        realization_item: true,
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
        realization_item: true,
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
