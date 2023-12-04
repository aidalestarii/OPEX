import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
//import { format } from 'date-fns';
import { ItemsBudgetUploadDto } from './dtos/budget-upload.dto';
import { ExcelBudgetUploadService } from './excel_budget_upload.service';
import { ReadBudgetUploadSheetDto } from './dtos/read-budget-upload.dto';
import { PrismaService } from 'src/core/service/prisma.service';

@Injectable()
export class BudgetUploadService {
  constructor(
    private readonly excelService: ExcelBudgetUploadService,
    private readonly prisma: PrismaService,
  ) {
    BudgetUploadService?.name;
  }

  async convertBudgetUploadFromExcelToJson<T>(
    req: Request,
    //WriteResponseBase
  ): Promise<any> {
    try {
      const read = await this.excelService.readFormatExcel(req);
      // console.log(read);
      if (!read?.budgetUpload)
        throw new BadRequestException(
          'Failed to read Excel, sheetname invalid',
        );
      const items: ItemsBudgetUploadDto[] = read?.budgetUpload;

      await this.prisma.budget.deleteMany();

      const results = await Promise.all(
        items?.map(async (item) => {
          const data = {
            years: Number(item.years),
            costCenter: String(item.costCenter),
            glAccount: Number(item.glAccount),
            total: parseFloat(
              String(
                item.value1 +
                  item.value2 +
                  item.value3 +
                  item.value4 +
                  item.value5 +
                  item.value6 +
                  item.value7 +
                  item.value8 +
                  item.value9 +
                  item.value10 +
                  item.value11 +
                  item.value12,
              ),
            ),
            value1: parseFloat(String(item.value1)),
            value2: parseFloat(String(item.value2)),
            value3: parseFloat(String(item.value3)),
            value4: parseFloat(String(item.value4)),
            value5: parseFloat(String(item.value5)),
            value6: parseFloat(String(item.value6)),
            value7: parseFloat(String(item.value7)),
            value8: parseFloat(String(item.value8)),
            value9: parseFloat(String(item.value9)),
            value10: parseFloat(String(item.value10)),
            value11: parseFloat(String(item.value11)),
            value12: parseFloat(String(item.value12)),
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          // results.push(data);
          // return data;

          // const prismaResult = await this.prisma.budget.create({
          //   data,
          //   include: {
          //     mGlAccount: {
          //       select: {
          //         idGlAccount: true,
          //         glAccount: true,
          //         groupGl: true,
          //         groupDetail: true,
          //       },
          //     },
          //     mCostCenter: {
          //       select: {
          //         idCostCenter: true,
          //         costCenter: true,
          //         dinas: true,
          //       },
          //     },
          //   },
          // });
          // return prismaResult;
        }),
      );

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
              ? item.mGlAccount.groupGl === group &&
                item.mGlAccount.groupDetail === detail
              : item.mGlAccount.groupGl === group,
          )
          .reduce((sum, item) => sum + item.total, 0);
      }

      function sumByGroupAndMonth(results, group, detail = null) {
        return months.reduce((result, month, i) => {
          result[month] = results
            .filter((item) =>
              detail
                ? item.mGlAccount.groupGl === group &&
                  item.mGlAccount.groupDetail === detail
                : item.mGlAccount.groupGl === group,
            )
            .reduce((sum, item) => sum + (item[`value${i + 1}`] || 0), 0);
          return result;
        }, {});
      }

      const MaterialExpenses = {
        sumMaterialExpenses: sumByGroup(results, uniqueGroupGlValues[0]),
        sumMaterialExpensesMonth: sumByGroupAndMonth(
          results,
          uniqueGroupGlValues[0],
        ),
        ExpendableMaterial: {
          sumExpendableMaterial: sumByGroup(
            results,
            uniqueGroupGlValues[0],
            uniqueGroupDetailValues[0],
          ),
          sumExpendableMaterialMonth: sumByGroupAndMonth(
            results,
            'Material expenses',
            'Expendable-Material',
          ),
        },
        RepairableMaterial: {
          sumRepairableMaterial: sumByGroup(
            results,
            'Material expenses',
            'Repairable-Material',
          ),
          sumRepairableMaterialMonth: sumByGroupAndMonth(
            results,
            'Material expenses',
            'Repairable-Material',
          ),
        },
      };

      const SubcontractExpenses = {
        sumSubcontractExpenses: sumByGroup(results, 'Subcontract Expenses'),
        sumSubcontractExpensesMonth: sumByGroupAndMonth(
          results,
          'Subcontract Expenses',
        ),
        RotablepartsSubcont: {
          sumRotablepartsSubcont: sumByGroup(
            results,
            'Subcontract Expenses',
            'Rotable parts-Subcont',
          ),
          sumRotablepartsSubcontMonth: sumByGroupAndMonth(
            results,
            'Subcontract Expenses',
            'Rotable parts-Subcont',
          ),
        },
      };

      const OtherOperatingExpenses = {
        sumOtherOperating: sumByGroup(results, 'Other operating expenses'),
        sumOtherOperatingMonth: sumByGroupAndMonth(
          results,
          'Other operating expenses',
        ),
        ElectricityConsumption: {
          sumElectricityConsumption: sumByGroup(
            results,
            'Other operating expenses',
            'Electricity consumption',
          ),
          sumElectricityConsumptionMonth: sumByGroupAndMonth(
            results,
            'Other operating expenses',
            'Electricity consumption',
          ),
        },
        Gas: {
          sumGas: sumByGroup(results, 'Other operating expenses', 'Gas'),
          sumGasMonth: sumByGroupAndMonth(
            results,
            'Other operating expenses',
            'Gas',
          ),
        },
        CorporateEvent: {
          sumCorporateEvent: sumByGroup(
            results,
            'Other operating expenses',
            'Corporate Event',
          ),
          sumCorporateEventMonth: sumByGroupAndMonth(
            results,
            'Other operating expenses',
            'Corporate Event',
          ),
        },
      };

      return {
        MaterialExpenses,
        SubcontractExpenses,
        OtherOperatingExpenses,
      };
    } catch (error) {
      throw new BadRequestException(error.message || error.stack);
    }
  }

  async getProcessedData(req: Request): Promise<any> {
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
        sumMaterialExpenses: sumByGroup(results1, 'Material expenses'),
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
            'Material expenses',
            'Expendable-Material',
          ),
        },
        RepairableMaterial: {
          sumRepairableMaterial: sumByGroup(
            results1,
            'Material expenses',
            'Repairable-Material',
          ),
          sumRepairableMaterialMonth: sumByGroupAndMonth(
            results1,
            'Material expenses',
            'Repairable-Material',
          ),
        },
      };

      const SubcontractExpenses = {
        sumSubcontractExpenses: sumByGroup(results1, 'Subcontract Expenses'),
        sumSubcontractExpensesMonth: sumByGroupAndMonth(
          results1,
          'Subcontract Expenses',
        ),
        RotablepartsSubcont: {
          sumRotablepartsSubcont: sumByGroup(
            results1,
            'Subcontract Expenses',
            'Rotable parts-Subcont',
          ),
          sumRotablepartsSubcontMonth: sumByGroupAndMonth(
            results1,
            'Subcontract Expenses',
            'Rotable parts-Subcont',
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

      console.log(results1);
      return {
        MaterialExpenses,
        SubcontractExpenses,
        OtherOperatingExpenses,
      };
    } catch (error) {
      throw new BadRequestException(error.message || error.stack);
    }
  }

  async findAllRealization(queryParams: any) {
    try {
      // Dapatkan nilai filter dari queryParams
      const { years, dinas } = queryParams;

      // Logika filter sesuai dengan kebutuhan
      let filter: any = {};
      if (years) {
        filter.years = +years; // konversi ke number jika diperlukan
      }
      if (dinas) {
        filter.mCostCenter.dinas = +dinas; // konversi ke number jika diperlukan
      }

      // Panggil metode prisma atau logika lainnya dengan filter
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

      if (!results1 || results1.length === 0) {
        throw new NotFoundException(
          'No realizations found with the specified filter.',
        );
      }

      return results1;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // NestJS will handle NotFoundException and send a 404 response
      } else {
        // Log the error or handle other types of errors
        throw new BadRequestException('Invalid request.'); // NestJS will handle BadRequestException and send a 400 response
      }
    }
  }
}
