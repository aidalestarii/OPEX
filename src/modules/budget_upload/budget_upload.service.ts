import { BadRequestException, Injectable } from '@nestjs/common';
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
            financialIndicator: String(item.financialIndicator),
            subFinancialIndicator: String(item.subFinancialIndicator),
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
            //sisanya bikin null
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          // results.push(data);
          // return data;
          const prismaResult = await this.prisma.budget.create({
            data,
            include: {
              mGlAccount: {
                select: {
                  idGlAccount: true,
                  glAccount: true,
                  groupGl: true,
                  groupDetail: true,
                  description: true,
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
          // console.log(prismaResult);
          return prismaResult;
        }),
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

      //[PARENT] Material expenses Section & Month
      const sumMaterialExpenses = results
        .filter((item) => item.financialIndicator === 'MATERIAL EXPENSES')
        .reduce((sum, item) => sum + item.total, 0);
      const sumMaterialExpensesMonth = months.reduce((result, month, i) => {
        result[month] = results
          .filter((item) => item.financialIndicator === 'MATERIAL EXPENSES')
          .reduce((sum, item) => sum + (item[`value${i + 1}`] || 0), 0);
        return result;
      }, {});

      //[CHILD] Expand per month ExpendableMaterial
      const sumExpendableMaterial = results
        .filter((item) => item.subFinancialIndicator === 'Expendable-Material')
        .reduce((sum, item) => sum + item.total, 0);
      const sumExpendableMaterialMonth = months.reduce((result, month, i) => {
        result[month] = results
          .filter(
            (item) =>
              item.financialIndicator === 'MATERIAL EXPENSES' &&
              item.subFinancialIndicator === 'Expendable-Material',
          )
          .reduce((sum, item) => sum + (item[`value${i + 1}`] || 0), 0);
        return result;
      }, {});

      //[CHILD] Expand Per Month RepairableMaterial
      const sumRepairableMaterial = results
        .filter((item) => item.subFinancialIndicator === 'Repairable-Material')
        .reduce((sum, item) => sum + item.total, 0);
      const sumRepairableMaterialMonth = months.reduce((result, month, i) => {
        result[month] = results
          .filter(
            (item) =>
              item.financialIndicator === 'MATERIAL EXPENSES' &&
              item.subFinancialIndicator === 'Repairable-Material',
          )
          .reduce((sum, item) => sum + (item[`value${i + 1}`] || 0), 0);
        return result;
      }, {});

      //[PARENT] Subcontract Expenses Section
      const sumSubcontractExpenses = results
        .filter((item) => item.financialIndicator === 'SUBCONTRACT EXPENSES')
        .reduce((sum, item) => sum + item.total, 0);
      const sumSubcontractExpensesMonth = months.reduce((result, month, i) => {
        result[month] = results
          .filter((item) => item.financialIndicator === 'SUBCONTRACT EXPENSES')
          .reduce((sum, item) => sum + (item[`value${i + 1}`] || 0), 0);
        return result;
      }, {});

      //[CHILD] Rotable parts
      const sumRotablepartsSubcont = results
        .filter(
          (item) => item.subFinancialIndicator === 'Rotable parts-Subcont',
        )
        .reduce((sum, item) => sum + item.total, 0);
      const sumRotablepartsSubcontMonth = months.reduce((result, month, i) => {
        result[month] = results
          .filter(
            (item) =>
              item.financialIndicator === 'SUBCONTRACT EXPENSES' &&
              item.subFinancialIndicator === 'Rotable parts-Subcont',
          )
          .reduce((sum, item) => sum + (item[`value${i + 1}`] || 0), 0);
        return result;
      }, {});

      //[PARENT] Other operating expenses
      const sumOtherOperating = results
        .filter((item) => item.financialIndicator === 'OTHER EXPENSES')
        .reduce((sum, item) => sum + item.total, 0);
      const sumOtherOperatingMonth = months.reduce((result, month, i) => {
        result[month] = results
          .filter((item) => item.financialIndicator === 'OTHER EXPENSES')
          .reduce((sum, item) => sum + (item[`value${i + 1}`] || 0), 0);
        return result;
      }, {});

      //[CHILD] Electricity Consumption
      const sumElectricityConsumption = results
        .filter(
          (item) => item.subFinancialIndicator === 'Electricity consumption',
        )
        .reduce((sum, item) => sum + item.total, 0);
      const sumElectricityConsumptionMonth = months.reduce(
        (result, month, i) => {
          result[month] = results
            .filter(
              (item) =>
                item.financialIndicator === 'OTHER EXPENSES' &&
                item.subFinancialIndicator === 'Electricity consumption',
            )
            .reduce((sum, item) => sum + (item[`value${i + 1}`] || 0), 0);
          return result;
        },
        {},
      );

      //[CHILD]
      const sumGas = results
        .filter((item) => item.subFinancialIndicator === 'Gas')
        .reduce((sum, item) => sum + item.total, 0);
      const sumGasMonth = months.reduce((result, month, i) => {
        result[month] = results
          .filter(
            (item) =>
              item.financialIndicator === 'OTHER EXPENSES' &&
              item.subFinancialIndicator === 'Gas',
          )
          .reduce((sum, item) => sum + (item[`value${i + 1}`] || 0), 0);
        return result;
      }, {});

      //[CHILD]
      const sumCorporateEvent = results
        .filter((item) => item.subFinancialIndicator === 'Corporate Event')
        .reduce((sum, item) => sum + item.total, 0);
      const sumCorporateEventMonth = months.reduce((result, month, i) => {
        result[month] = results
          .filter(
            (item) =>
              item.financialIndicator === 'OTHER EXPENSES' &&
              item.subFinancialIndicator === 'Corporate Event',
          )
          .reduce((sum, item) => sum + (item[`value${i + 1}`] || 0), 0);
        return result;
      }, {});

      return {
        //results,
        MaterialExpenses: {
          sumMaterialExpenses,
          sumMaterialExpensesMonth,
          ExpendableMaterial: {
            sumExpendableMaterialMonth,
            sumExpendableMaterial,
          },
          RepairableMaterial: {
            sumRepairableMaterialMonth,
            sumRepairableMaterial,
          },
        },
        SubcontractExpenses: {
          sumSubcontractExpenses,
          sumSubcontractExpensesMonth,
          RotablepartsSubcont: {
            sumRotablepartsSubcont,
            sumRotablepartsSubcontMonth,
          },
        },
        OtherOperatingExpenses: {
          sumOtherOperating,
          sumOtherOperatingMonth,
          ElectricityConsumption: {
            sumElectricityConsumption,
            sumElectricityConsumptionMonth,
          },
          Gas: { sumGas, sumGasMonth },
          CorporateEvent: { sumCorporateEvent, sumCorporateEventMonth },
        },
      };
    } catch (error) {
      throw new BadRequestException(error?.response);
    }
  }
}
