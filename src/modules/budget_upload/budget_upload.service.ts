import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
//import { format } from 'date-fns';
import { ItemsBudgetUploadDto } from './dtos/budget-upload.dto';
import { ExcelBudgetUploadService } from './excel_budget_upload.service';
import { ReadBudgetUploadSheetDto } from './dtos/read-budget-upload.dto';
import { PrismaService } from 'src/core/service/prisma.service';
import { glAccount } from 'prisma/dummy-data';

@Injectable()
export class BudgetUploadService {
  constructor(
    private readonly excelService: ExcelBudgetUploadService,
    private readonly prisma: PrismaService,
  ) {
    BudgetUploadService?.name;
  }

  // async convertBudgetUploadFromExcelToJson<T>(
  //   req: Request,
  //   //WriteResponseBase
  // ): Promise<any> {
  //   try {
  //     const read = await this.excelService.readFormatExcel(req);
  //     // console.log(read);
  //     if (!read?.budgetUpload)
  //       throw new BadRequestException(
  //         'Failed to read Excel, sheetname invalid',
  //       );
  //     const items: ItemsBudgetUploadDto[] = read?.budgetUpload;

  //     await this.prisma.budget.deleteMany();

  //     const results = await Promise.all(
  //       items?.map(async (item) => {
  //         const dataCostCenters = await this.prisma.mCostCenter.findMany({
  //           select: {
  //             idCostCenter: true,
  //           },
  //           where: {
  //             bidang: String(item.costCenterId),
  //           },
  //         });

  //         const dataGlAccount = await this.prisma.mGlAccount.findMany({
  //           select: {
  //             idGlAccount: true,
  //           },
  //           where: {
  //             glAccount: Number(item.glAccountId),
  //           },
  //         });
  //         const data = {
  //           years: Number(item.years),
  //           costCenter: Number(dataCostCenters?.[0]?.idCostCenter),
  //           glAccount: Number(dataGlAccount?.[0]?.idGlAccount),
  //           total: parseFloat(
  //             String(
  //               item.value1 +
  //                 item.value2 +
  //                 item.value3 +
  //                 item.value4 +
  //                 item.value5 +
  //                 item.value6 +
  //                 item.value7 +
  //                 item.value8 +
  //                 item.value9 +
  //                 item.value10 +
  //                 item.value11 +
  //                 item.value12,
  //             ),
  //           ),
  //           value1: parseFloat(String(item.value1)),
  //           value2: parseFloat(String(item.value2)),
  //           value3: parseFloat(String(item.value3)),
  //           value4: parseFloat(String(item.value4)),
  //           value5: parseFloat(String(item.value5)),
  //           value6: parseFloat(String(item.value6)),
  //           value7: parseFloat(String(item.value7)),
  //           value8: parseFloat(String(item.value8)),
  //           value9: parseFloat(String(item.value9)),
  //           value10: parseFloat(String(item.value10)),
  //           value11: parseFloat(String(item.value11)),
  //           value12: parseFloat(String(item.value12)),
  //           createdAt: new Date(),
  //           updatedAt: new Date(),
  //         };

  //         const prismaResult = await this.prisma.budget.create({
  //           data,
  //           include: {
  //             mGlAccount: {
  //               select: {
  //                 idGlAccount: true,
  //                 glAccount: true,
  //                 groupGl: true,
  //                 groupDetail: true,
  //               },
  //             },
  //             mCostCenter: {
  //               select: {
  //                 idCostCenter: true,
  //                 costCenter: true,
  //                 dinas: true,
  //               },
  //             },
  //           },
  //         });
  //         return prismaResult;
  //       }),
  //     );

  //     const GroupGl = await this.prisma.mGlAccount.findMany({
  //       distinct: ['groupGl'],
  //     });
  //     const uniqueGroupGlValues = GroupGl.map((GroupGl) => GroupGl.groupGl);
  //     const GroupDetail = await this.prisma.mGlAccount.findMany({
  //       distinct: ['groupDetail'],
  //     });
  //     const uniqueGroupDetailValues = GroupDetail.map(
  //       (GroupDetail) => GroupDetail.groupDetail,
  //     );

  //     console.log(uniqueGroupGlValues);
  //     console.log(uniqueGroupDetailValues);

  //     const months = [
  //       'JAN',
  //       'FEB',
  //       'MAR',
  //       'APR',
  //       'MEI',
  //       'JUN',
  //       'JUL',
  //       'AGS',
  //       'SEP',
  //       'OKT',
  //       'NOV',
  //       'DES',
  //     ];

  //     function sumByGroup(results, group, detail = null) {
  //       return results
  //         .filter((item) =>
  //           detail
  //             ? item.mGlAccount.groupGl === group &&
  //               item.mGlAccount.groupDetail === detail
  //             : item.mGlAccount.groupGl === group,
  //         )
  //         .reduce((sum, item) => sum + item.total, 0);
  //     }

  //     function sumByGroupAndMonth(results, group, detail = null) {
  //       return months.reduce((result, month, i) => {
  //         result[month] = results
  //           .filter((item) =>
  //             detail
  //               ? item.mGlAccount.groupGl === group &&
  //                 item.mGlAccount.groupDetail === detail
  //               : item.mGlAccount.groupGl === group,
  //           )
  //           .reduce((sum, item) => sum + (item[`value${i + 1}`] || 0), 0);
  //         return result;
  //       }, {});
  //     }

  //     const MaterialExpenses = {
  //       sumMaterialExpenses: sumByGroup(results, uniqueGroupGlValues[0]),
  //       sumMaterialExpensesMonth: sumByGroupAndMonth(
  //         results,
  //         uniqueGroupGlValues[0],
  //       ),
  //       ExpendableMaterial: {
  //         sumExpendableMaterial: sumByGroup(
  //           results,
  //           uniqueGroupGlValues[0],
  //           uniqueGroupDetailValues[0],
  //         ),
  //         sumExpendableMaterialMonth: sumByGroupAndMonth(
  //           results,
  //           uniqueGroupGlValues[0],
  //           uniqueGroupDetailValues[0],
  //         ),
  //       },
  //       RepairableMaterial: {
  //         sumRepairableMaterial: sumByGroup(
  //           results,
  //           uniqueGroupGlValues[0],
  //           uniqueGroupDetailValues[1],
  //         ),
  //         sumRepairableMaterialMonth: sumByGroupAndMonth(
  //           results,
  //           uniqueGroupGlValues[0],
  //           uniqueGroupDetailValues[1],
  //         ),
  //       },
  //     };

  //     const SubcontractExpenses = {
  //       sumSubcontractExpenses: sumByGroup(results, uniqueGroupGlValues[1]),
  //       sumSubcontractExpensesMonth: sumByGroupAndMonth(
  //         results,
  //         uniqueGroupGlValues[1],
  //       ),
  //       RotablepartsSubcont: {
  //         sumRotablepartsSubcont: sumByGroup(
  //           results,
  //           uniqueGroupGlValues[1],
  //           uniqueGroupDetailValues[2],
  //         ),
  //         sumRotablepartsSubcontMonth: sumByGroupAndMonth(
  //           results,
  //           uniqueGroupGlValues[1],
  //           uniqueGroupDetailValues[2],
  //         ),
  //       },
  //       RepairablepartsSubcont: {
  //         sumRepairablepartsSubcont: sumByGroup(
  //           results,
  //           uniqueGroupGlValues[1],
  //           uniqueGroupDetailValues[3],
  //         ),
  //         sumRepairablepartsSubcontMonth: sumByGroupAndMonth(
  //           results,
  //           uniqueGroupGlValues[1],
  //           uniqueGroupDetailValues[3],
  //         ),
  //       },
  //     };

  //     const StaffExpenses = {
  //       sumStaffExpenses: sumByGroup(results, uniqueGroupGlValues[2]),
  //       sumStaffExpensesMonth: sumByGroupAndMonth(
  //         results,
  //         uniqueGroupGlValues[2],
  //       ),
  //       BaseSalary: {
  //         sumBaseSalary: sumByGroup(
  //           results,
  //           uniqueGroupGlValues[2],
  //           uniqueGroupDetailValues[4],
  //         ),
  //         sumBaseSalaryMonth: sumByGroupAndMonth(
  //           results,
  //           uniqueGroupGlValues[2],
  //           uniqueGroupDetailValues[4],
  //         ),
  //       },
  //       Honorarium: {
  //         sumHonorarium: sumByGroup(
  //           results,
  //           uniqueGroupGlValues[2],
  //           uniqueGroupDetailValues[5],
  //         ),
  //         sumHonorariumMonth: sumByGroupAndMonth(
  //           results,
  //           uniqueGroupGlValues[2],
  //           uniqueGroupDetailValues[5],
  //         ),
  //       },
  //     };

  //     const CompanyAccommodation = {
  //       sumCompanyAccommodation: sumByGroup(results, uniqueGroupGlValues[3]),
  //       sumCompanyAccommodationMonth: sumByGroupAndMonth(
  //         results,
  //         uniqueGroupGlValues[3],
  //       ),
  //       Travel: {
  //         sumTravel: sumByGroup(
  //           results,
  //           uniqueGroupGlValues[3],
  //           uniqueGroupDetailValues[6],
  //         ),
  //         sumTravelMonth: sumByGroupAndMonth(
  //           results,
  //           uniqueGroupGlValues[3],
  //           uniqueGroupDetailValues[6],
  //         ),
  //       },
  //       Transport: {
  //         sumTransport: sumByGroup(
  //           results,
  //           uniqueGroupGlValues[3],
  //           uniqueGroupDetailValues[7],
  //         ),
  //         sumTransportMonth: sumByGroupAndMonth(
  //           results,
  //           uniqueGroupGlValues[3],
  //           uniqueGroupDetailValues[7],
  //         ),
  //       },
  //     };

  //     const DepreciationAndAmortisation = {
  //       sumDepreciationAndAmortisation: sumByGroup(
  //         results,
  //         uniqueGroupGlValues[4],
  //       ),
  //       sumDepreciationAndAmortisationMonth: sumByGroupAndMonth(
  //         results,
  //         uniqueGroupGlValues[4],
  //       ),
  //       RotablePart: {
  //         sumRotablePart: sumByGroup(
  //           results,
  //           uniqueGroupGlValues[4],
  //           uniqueGroupDetailValues[8],
  //         ),
  //         sumRotablePartMonth: sumByGroupAndMonth(
  //           results,
  //           uniqueGroupGlValues[4],
  //           uniqueGroupDetailValues[8],
  //         ),
  //       },
  //       Amortization: {
  //         sumAmortization: sumByGroup(
  //           results,
  //           uniqueGroupGlValues[4],
  //           uniqueGroupDetailValues[9],
  //         ),
  //         sumAmortizationMonth: sumByGroupAndMonth(
  //           results,
  //           uniqueGroupGlValues[4],
  //           uniqueGroupDetailValues[9],
  //         ),
  //       },
  //     };

  //     const FacilityMaintenanceExpenses = {
  //       sumDepreciationAndAmortisation: sumByGroup(
  //         results,
  //         uniqueGroupGlValues[5],
  //       ),
  //       sumDepreciationAndAmortisationMonth: sumByGroupAndMonth(
  //         results,
  //         uniqueGroupGlValues[5],
  //       ),
  //       MaintenanceandRepairHangar: {
  //         sumMaintenanceandRepairHangar: sumByGroup(
  //           results,
  //           uniqueGroupGlValues[5],
  //           uniqueGroupDetailValues[10],
  //         ),
  //         sumMaintenanceandRepairHangarMonth: sumByGroupAndMonth(
  //           results,
  //           uniqueGroupGlValues[5],
  //           uniqueGroupDetailValues[10],
  //         ),
  //       },
  //       MaintenanceandRepairHardware: {
  //         sumMaintenanceandRepairHardware: sumByGroup(
  //           results,
  //           uniqueGroupGlValues[5],
  //           uniqueGroupDetailValues[11],
  //         ),
  //         sumMaintenanceandRepairHardwareMonth: sumByGroupAndMonth(
  //           results,
  //           uniqueGroupGlValues[5],
  //           uniqueGroupDetailValues[11],
  //         ),
  //       },
  //     };

  //     const RentalExpenses = {
  //       sumRentalExpenses: sumByGroup(results, uniqueGroupGlValues[6]),
  //       sumRentalExpensesMonth: sumByGroupAndMonth(
  //         results,
  //         uniqueGroupGlValues[6],
  //       ),
  //       BuildingRental: {
  //         sumBuildingRental: sumByGroup(
  //           results,
  //           uniqueGroupGlValues[6],
  //           uniqueGroupDetailValues[12],
  //         ),
  //         sumBuildingRentalMonth: sumByGroupAndMonth(
  //           results,
  //           uniqueGroupGlValues[6],
  //           uniqueGroupDetailValues[12],
  //         ),
  //       },
  //       ComponentRental: {
  //         sumComponentRental: sumByGroup(
  //           results,
  //           uniqueGroupGlValues[6],
  //           uniqueGroupDetailValues[13],
  //         ),
  //         sumComponentRentalMonth: sumByGroupAndMonth(
  //           results,
  //           uniqueGroupGlValues[6],
  //           uniqueGroupDetailValues[13],
  //         ),
  //       },
  //     };

  //     const OtherOperatingExpenses = {
  //       sumOtherOperating: sumByGroup(results, uniqueGroupGlValues[7]),
  //       sumOtherOperatingMonth: sumByGroupAndMonth(
  //         results,
  //         uniqueGroupGlValues[7],
  //       ),
  //       ElectricityConsumption: {
  //         sumElectricityConsumption: sumByGroup(
  //           results,
  //           uniqueGroupGlValues[7],
  //           uniqueGroupDetailValues[14],
  //         ),
  //         sumElectricityConsumptionMonth: sumByGroupAndMonth(
  //           results,
  //           uniqueGroupGlValues[7],
  //           uniqueGroupDetailValues[14],
  //         ),
  //       },
  //       Gas: {
  //         sumGas: sumByGroup(
  //           results,
  //           uniqueGroupGlValues[7],
  //           uniqueGroupDetailValues[15],
  //         ),
  //         sumGasMonth: sumByGroupAndMonth(
  //           results,
  //           uniqueGroupGlValues[7],
  //           uniqueGroupDetailValues[15],
  //         ),
  //       },
  //     };

  //     return {
  //       MaterialExpenses,
  //       SubcontractExpenses,
  //       OtherOperatingExpenses,
  //       StaffExpenses,
  //       CompanyAccommodation,
  //       DepreciationAndAmortisation,
  //       FacilityMaintenanceExpenses,
  //       RentalExpenses,
  //       // results,
  //     };
  //   } catch (error) {
  //     throw new BadRequestException(error.message || error.stack);
  //   }
  // }

  async getAllBudget(req: Request): Promise<any> {
    try {
      const results1 = await this.prisma.budget.findMany({
        include: {
          mGlAccount: {
            select: {
              idGlAccount: true,
              glAccount: true,
              groupGl: true,
              groupDetail: true,
            },
          },
          mCostCenter: {
            select: {
              idCostCenter: true,
              costCenter: true,
              dinas: true,
            },
          },
        },
      });

      const GroupGl = await this.prisma.mGlAccount.findMany({
        distinct: ['groupGl'],
      });
      const uniqueGroupGlValues = GroupGl.map((GroupGl) => GroupGl.groupGl);
      const GroupDetail = await this.prisma.mGlAccount.findMany({
        distinct: ['groupDetail'],
      });
      const uniqueGroupDetailValues = GroupDetail.map(
        (GroupDetail) => GroupDetail.groupDetail,
      );

      const months = [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MEI',
        'JUN',
        'JUL',
        'AGS',
        'SEP',
        'OKT',
        'NOV',
        'DES',
      ];

      function sumByGroup(results, group, detail = null) {
        return results
          .filter((item) =>
            detail
              ? item.mGlAccount &&
                item.mGlAccount.groupGl === group &&
                item.mGlAccount.groupDetail === detail
              : item.mGlAccount && item.mGlAccount.groupGl === group,
          )
          .reduce((sum, item) => sum + item.total, 0);
      }

      function sumByGroupAndMonth(results, group, detail = null) {
        return months.reduce((result, month, i) => {
          result[month] = results
            .filter((item) =>
              detail
                ? item.mGlAccount &&
                  item.mGlAccount.groupGl === group &&
                  item.mGlAccount.groupDetail === detail
                : item.mGlAccount && item.mGlAccount.groupGl === group,
            )
            .reduce((sum, item) => sum + (item[`value${i + 1}`] || 0), 0);
          return result;
        }, {});
      }

      const MaterialExpenses = {
        sumMaterialExpenses: sumByGroup(results1, uniqueGroupGlValues[0]),
        sumMaterialExpensesMonth: sumByGroupAndMonth(
          results1,
          uniqueGroupGlValues[0],
        ),
        ExpendableMaterial: {
          sumExpendableMaterial: sumByGroup(
            results1,
            uniqueGroupGlValues[0],
            uniqueGroupDetailValues[0],
          ),
          sumExpendableMaterialMonth: sumByGroupAndMonth(
            results1,
            uniqueGroupGlValues[0],
            uniqueGroupDetailValues[0],
          ),
        },
        RepairableMaterial: {
          sumRepairableMaterial: sumByGroup(
            results1,
            uniqueGroupGlValues[0],
            uniqueGroupDetailValues[1],
          ),
          sumRepairableMaterialMonth: sumByGroupAndMonth(
            results1,
            uniqueGroupGlValues[0],
            uniqueGroupDetailValues[1],
          ),
        },
      };

      const SubcontractExpenses = {
        sumSubcontractExpenses: sumByGroup(results1, uniqueGroupGlValues[1]),
        sumSubcontractExpensesMonth: sumByGroupAndMonth(
          results1,
          uniqueGroupGlValues[1],
        ),
        RotablepartsSubcont: {
          sumRotablepartsSubcont: sumByGroup(
            results1,
            uniqueGroupGlValues[1],
            uniqueGroupDetailValues[2],
          ),
          sumRotablepartsSubcontMonth: sumByGroupAndMonth(
            results1,
            uniqueGroupGlValues[1],
            uniqueGroupDetailValues[2],
          ),
        },
      };

      const OtherOperatingExpenses = {
        sumOtherOperating: sumByGroup(results1, 'Other operating expenses'),
        sumOtherOperatingMonth: sumByGroupAndMonth(
          results1,
          'Other operating expenses',
        ),
        ElectricityConsumption: {
          sumElectricityConsumption: sumByGroup(
            results1,
            'Other operating expenses',
            'Electricity consumption',
          ),
          sumElectricityConsumptionMonth: sumByGroupAndMonth(
            results1,
            'Other operating expenses',
            'Electricity consumption',
          ),
        },
        Gas: {
          sumGas: sumByGroup(results1, 'Other operating expenses', 'Gas'),
          sumGasMonth: sumByGroupAndMonth(
            results1,
            'Other operating expenses',
            'Gas',
          ),
        },
        CorporateEvent: {
          sumCorporateEvent: sumByGroup(
            results1,
            'Other operating expenses',
            'Corporate Event',
          ),
          sumCorporateEventMonth: sumByGroupAndMonth(
            results1,
            'Other operating expenses',
            'Corporate Event',
          ),
        },
      };
      // Mengalikan setiap nilai dalam results1 dengan 85%
      const results1Modified = results1.map((item) => {
        // Clone item to avoid modifying the original object
        const modifiedItem = { ...item };

        // Mengalikan nilai total dengan 85%
        modifiedItem.total *= 0.85;

        // Mengalikan nilai-nilai value1 hingga value12 dengan 85%
        for (let i = 1; i <= 12; i++) {
          modifiedItem[`value${i}`] *= 0.85;
        }

        return modifiedItem;
      });

      // console.log(results1);
      // console.log(results1Modified);
      return {
        MaterialExpenses,
        SubcontractExpenses,
        OtherOperatingExpenses,
      };
    } catch (error) {
      throw new BadRequestException(error.message || error.stack);
    }
  }
}
