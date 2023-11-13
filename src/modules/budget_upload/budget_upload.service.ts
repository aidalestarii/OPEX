import { BadRequestException, Injectable } from '@nestjs/common';
import { Request } from 'express';
//import { format } from 'date-fns';
import { ItemsBudgetUploadDto } from './dtos/budget-upload.dto';
import { ExcelBudgetUploadService } from './excel_budget_upload.service';
import { ReadBudgetUploadSheetDto } from './dtos/read-budget-upload.dto';
import { PrismaService } from 'src/core/service/prisma.service';
import { randomUUID } from 'crypto';
import { MGlAccount } from '../m_gl_account/entities/m_gl_account.entity';

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
                item.value01 +
                  item.value02 +
                  item.value03 +
                  item.value04 +
                  item.value05 +
                  item.value06 +
                  item.value07 +
                  item.value08 +
                  item.value09 +
                  item.value10 +
                  item.value11 +
                  item.value12,
              ),
            ),
            value01: parseFloat(String(item.value01)),
            value02: parseFloat(String(item.value02)),
            value03: parseFloat(String(item.value03)),
            value04: parseFloat(String(item.value04)),
            value05: parseFloat(String(item.value05)),
            value06: parseFloat(String(item.value06)),
            value07: parseFloat(String(item.value07)),
            value08: parseFloat(String(item.value08)),
            value09: parseFloat(String(item.value09)),
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

      //Material expenses Section
      const sumMaterialExpenses = results
        .filter((item) => item.financialIndicator === 'MATERIAL EXPENSES')
        .reduce((sum, item) => sum + item.total, 0);
      const sumMaterialExpensesValue01 = results
        .filter((item) => item.financialIndicator === 'MATERIAL EXPENSES')
        .reduce((sum, item) => sum + (item.value01 || 0), 0);

      //Expand per month ExpendableMaterial
      const sumExpendableMaterial = results
        .filter((item) => item.subFinancialIndicator === 'Expendable-Material')
        .reduce((sum, item) => sum + item.total, 0);
      const sumExpendableMaterialValue01 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Expendable-Material',
        )
        .reduce((sum, item) => sum + (item.value01 || 0), 0);
      const sumExpendableMaterialValue02 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Expendable-Material',
        )
        .reduce((sum, item) => sum + (item.value02 || 0), 0);
      const sumExpendableMaterialValue03 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Expendable-Material',
        )
        .reduce((sum, item) => sum + (item.value03 || 0), 0);
      const sumExpendableMaterialValue04 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Expendable-Material',
        )
        .reduce((sum, item) => sum + (item.value04 || 0), 0);
      const sumExpendableMaterialValue05 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Expendable-Material',
        )
        .reduce((sum, item) => sum + (item.value05 || 0), 0);
      const sumExpendableMaterialValue06 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Expendable-Material',
        )
        .reduce((sum, item) => sum + (item.value06 || 0), 0);
      const sumExpendableMaterialValue07 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Expendable-Material',
        )
        .reduce((sum, item) => sum + (item.value07 || 0), 0);
      const sumExpendableMaterialValue08 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Expendable-Material',
        )
        .reduce((sum, item) => sum + (item.value08 || 0), 0);
      const sumExpendableMaterialValue09 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Expendable-Material',
        )
        .reduce((sum, item) => sum + (item.value09 || 0), 0);
      const sumExpendableMaterialValue10 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Expendable-Material',
        )
        .reduce((sum, item) => sum + (item.value10 || 0), 0);
      const sumExpendableMaterialValue11 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Expendable-Material',
        )
        .reduce((sum, item) => sum + (item.value11 || 0), 0);
      const sumExpendableMaterialValue12 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Expendable-Material',
        )
        .reduce((sum, item) => sum + (item.value12 || 0), 0);

      //RepairableMaterial
      const sumRepairableMaterial = results
        .filter((item) => item.subFinancialIndicator === 'Repairable-Material')
        .reduce((sum, item) => sum + item.total, 0);
      const sumRepairableMaterialValue01 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Repairable-Material',
        )
        .reduce((sum, item) => sum + (item.value01 || 0), 0);
      const sumRepairableMaterialValue02 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Repairable-Material',
        )
        .reduce((sum, item) => sum + (item.value02 || 0), 0);
      const sumRepairableMaterialValue03 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Repairable-Material',
        )
        .reduce((sum, item) => sum + (item.value03 || 0), 0);
      const sumRepairableMaterialValue04 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Repairable-Material',
        )
        .reduce((sum, item) => sum + (item.value04 || 0), 0);
      const sumRepairableMaterialValue05 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Repairable-Material',
        )
        .reduce((sum, item) => sum + (item.value05 || 0), 0);
      const sumRepairableMaterialValue06 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Repairable-Material',
        )
        .reduce((sum, item) => sum + (item.value06 || 0), 0);
      const sumRepairableMaterialValue07 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Repairable-Material',
        )
        .reduce((sum, item) => sum + (item.value07 || 0), 0);
      const sumRepairableMaterialValue08 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Repairable-Material',
        )
        .reduce((sum, item) => sum + (item.value08 || 0), 0);
      const sumRepairableMaterialValue09 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Repairable-Material',
        )
        .reduce((sum, item) => sum + (item.value09 || 0), 0);
      const sumRepairableMaterialValue10 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Repairable-Material',
        )
        .reduce((sum, item) => sum + (item.value10 || 0), 0);
      const sumRepairableMaterialValue11 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Repairable-Material',
        )
        .reduce((sum, item) => sum + (item.value11 || 0), 0);
      const sumRepairableMaterialValue12 = results
        .filter(
          (item) =>
            item.financialIndicator === 'MATERIAL EXPENSES' &&
            item.subFinancialIndicator === 'Repairable-Material',
        )
        .reduce((sum, item) => sum + (item.value12 || 0), 0);
    //RepairableMaterial

      //Subcontract Expenses Section
      const sumSubcontractExpenses = results
        .filter((item) => item.financialIndicator === 'SUBCONTRACT EXPENSES')
        .reduce((sum, item) => sum + item.total, 0);
      const sumRotablepartsSubcont = results
        .filter(
          (item) => item.subFinancialIndicator === 'Rotable parts-Subcont',
        )
        .reduce((sum, item) => sum + item.total, 0);

      // Other operating expenses
      const sumOtherOperating = results
        .filter((item) => item.financialIndicator === 'OTHER EXPENSES')
        .reduce((sum, item) => sum + item.total, 0);
      const sumElectricityConsumption = results
        .filter(
          (item) => item.subFinancialIndicator === 'Electricity consumption',
        )
        .reduce((sum, item) => sum + item.total, 0);
      const sumGas = results
        .filter((item) => item.subFinancialIndicator === 'Gas')
        .reduce((sum, item) => sum + item.total, 0);
      const sumCorporateEvent = results
        .filter((item) => item.subFinancialIndicator === 'Corporate Event')
        .reduce((sum, item) => sum + item.total, 0);

      // console.log(sumMaterialExpenses);
      return {
        //results,
        MaterialExpenses: {
          sumMaterialExpenses,
          sumMaterialExpensesValue01,
          ExpendableMaterial: {
            JAN: sumExpendableMaterialValue01,
            FEB: sumExpendableMaterialValue02,
            MAR: sumExpendableMaterialValue03,
            APR: sumExpendableMaterialValue04,
            MEI: sumExpendableMaterialValue05,
            JUN: sumExpendableMaterialValue06,
            JUL: sumExpendableMaterialValue07,
            AGS: sumExpendableMaterialValue08,
            SEPT: sumExpendableMaterialValue09,
            OKT: sumExpendableMaterialValue10,
            NOV: sumExpendableMaterialValue11,
            DES: sumExpendableMaterialValue12,
            sumExpendableMaterial,
          },
          RepairableMaterial: {
            JAN: sumRepairableMaterialValue01,
            FEB: sumRepairableMaterialValue02,
            MAR: sumRepairableMaterialValue03,
            APR: sumRepairableMaterialValue04,
            MEI: sumRepairableMaterialValue05,
            JUN: sumRepairableMaterialValue06,
            JUL: sumRepairableMaterialValue07,
            AGS: sumRepairableMaterialValue08,
            SEPT: sumRepairableMaterialValue09,
            OKT: sumRepairableMaterialValue10,
            NOV: sumRepairableMaterialValue11,
            DES: sumRepairableMaterialValue12,
            sumRepairableMaterial,
          },
        },
        SubcontractExpenses: {
          sumSubcontractExpenses,
          sumRotablepartsSubcont,
        },
        OtherOperatingExpenses: {
          sumOtherOperating,
          sumElectricityConsumption,
          sumGas,
          sumCorporateEvent,
        },
      };
      // const sumMaterialExpenses = results
      //   .filter((item) => item.financialIndicator === 'MATERIAL EXPENSES')
      //   .reduce((sum, item) => sum + item.total, 0);
      // const sumSubcontractExpenses = results
      //   .filter((item) => item.financialIndicator === 'SUBCONTRACT EXPENSES')
      //   .reduce((sum, item) => sum + item.total, 0);
      // console.log(sumMaterialExpenses);
      // return { results, sumMaterialExpenses, sumSubcontractExpenses };
    } catch (error) {
      throw new BadRequestException(error?.response);
    }
  }
}
