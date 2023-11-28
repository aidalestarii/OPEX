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
} from './dto/create-realization.dto';
import { CreateFileDto } from './dto/create-file-upload.dto';
import { Realization, StatusEnum } from '@prisma/client';
import {
  UpdateRealizationDto,
  UpdateRealizationItemDto,
} from './dto/update-realization.dto';
import { UpdateFileDto } from './dto/update-file-upload.dto';

@Injectable()
export class RealizationService {
  constructor(private readonly prisma: PrismaService) {}

  async createRealization(
    createRealization: CreateRealizationDto,
    realizationItems: CreateRealizationItemDto[],
    uploadfile: CreateFileDto[],
    status?: StatusEnum,
  ) {
    return this.prisma.$transaction(async (prisma) => {
      try {
        let statusTom: number = 1;
        let statusToTom: number = 2;
        let requestNumber: string | null = null;

        if (status && status == StatusEnum.PROGRESS) {
          statusTom = 2;
          statusToTom = 3;
          requestNumber = 'string';
        }

        // Extract Realization data from the DTO
        const { ...realizationData } = createRealization;

        // Create realization within the transaction
        const createdRealization = await prisma.realization.create({
          data: {
            years: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            requestNumber: requestNumber,
            taReff: realizationData.taReff,
            responsibleNopeg: realizationData.responsibleNopeg,
            titleRequest: realizationData.titleRequest,
            noteRequest: realizationData.noteRequest,
            department: realizationData.department,
            personalNumber: realizationData.personalNumber,
            departmentTo: realizationData.departmentTo,
            personalNumberTo: realizationData.personalNumberTo,
            createdBy: realizationData.createdBy,
            status: status ? status : StatusEnum.OPEN,
            type: realizationData.type,
            m_status_realization_id_statusTom_status: {
              connect: {
                idStatus: statusTom,
              },
            },
            m_status_realization_id_status_toTom_status: {
              connect: {
                idStatus: statusToTom,
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

  async findAllRealization() {
    const realization = await this.prisma.realization.findMany({
      include: {
        realizationItem: true,
      },
    });

    const fileUpload = await this.prisma.fileUpload.findMany({
      where: {
        tableName: 'Realization',
      },
    });

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

    //abis where baru filter
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

    const fileUpload = await this.prisma.fileUpload.findMany({
      where: {
        tableName: 'Realization',
      },
    });

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

  // async uupdateRealization(
  //   id: number,
  //   updateRealization: UpdateRealizationDto,
  //   updateRealizationItems: UpdateRealizationItemDto[],
  //   //updateUploadFiles: UpdateFileDto[],
  // ) {
  //   return this.prisma.$transaction(async (prisma) => {
  //     try {
  //       // Find existing realization
  //       const existingRealization = await prisma.realization.findUnique({
  //         where: {
  //           idRealization: id,
  //         },
  //       });

  //       if (!existingRealization) {
  //         throw new HttpException(
  //           {
  //             data: null,
  //             meta: null,
  //             message: 'Realization not found',
  //             status: HttpStatus.NOT_FOUND,
  //             time: new Date(),
  //           },
  //           HttpStatus.NOT_FOUND,
  //         );
  //       }

  //       // Update realization data
  //       const updatedRealization = await prisma.realization.update({
  //         where: {
  //           idRealization: id,
  //         },
  //         // include:{

  //         // },
  //         data: {
  //           status: StatusEnum.CLOSE,
  //         },
  //       });

  //       // Update realization items
  //       const updatedItems = await Promise.all(
  //         updateRealizationItems.map(async (item: UpdateRealizationItemDto) => {
  //           return prisma.realizationItem.upsert({
  //             where: {
  //               realizationId: id,
  //             },
  //             update: {
  //               ...item,
  //               amount: item.amountSubmission,
  //             },
  //             create: {
  //               ...item,
  //               realizationId: updatedRealization.idRealization,
  //               createdBy: updatedRealization.createdBy,
  //             },
  //           });
  //         }),
  //       );

  //       // Filter file uploads based on tableId
  //       // const existingUploadFiles = await prisma.fileUpload.findMany({
  //       //   where: {
  //       //     tableId: updatedRealization.idRealization,
  //       //   },
  //       // });

  //       // Update file uploads
  //       // const updatedUploadFiles = await Promise.all(
  //       //   updateUploadFiles.map(async (file: UpdateFileDto) => {
  //       //     return prisma.fileUpload.upsert({
  //       //       where: {
  //       //         tableId: updatedRealization.idRealization,
  //       //       },
  //       //       update: {
  //       //         // Update the fields you need to change
  //       //         docCategoryId: file.docCategoryId,
  //       //         // ... other fields
  //       //       },
  //       //       create: {
  //       //         // If the file doesn't exist, create a new one
  //       //         tableName: 'Realization',
  //       //         tableId: updatedRealization.idRealization,
  //       //         createdBy: updatedRealization.createdBy,
  //       //         docCategoryId: file.docCategoryId,
  //       //         docName: file.docName,
  //       //         docSize: file.docSize,
  //       //         docLink: file.docLink,
  //       //         docType: file.docType,
  //       //       },
  //       //     });
  //       //   }),
  //       // );

  //       return {
  //         realization: {
  //           ...updatedRealization,
  //           realizationItems: updatedItems,
  //           //uploadFiles: updatedUploadFiles,
  //         },
  //         meta: null,
  //         message: 'Realization updated successfully',
  //         status: HttpStatus.OK,
  //         time: new Date(),
  //       };
  //     } catch (error) {
  //       console.log(error.message);
  //       throw new HttpException(
  //         {
  //           data: null,
  //           meta: null,
  //           message: 'Failed to update realization',
  //           status: HttpStatus.INTERNAL_SERVER_ERROR,
  //           time: new Date(),
  //           error: error.message,
  //         },
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     }
  //   });
  // }
}
