import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ItemsBudgetUploadDto } from './dtos/budget-upload.dto';
// import { UpdateBudgetDto } from './dtos/update-budget.dto';
import { PrismaService } from 'src/core/service/prisma.service';
import { BudgetUploadService } from './budget_upload.service';

@Injectable()
export class BudgetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly budgetUpload: BudgetUploadService,
  ) {}

  async findAll() {
    const budget = await this.prisma.budget.findMany({
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
    return budget;
  }

  async findOne(id: number) {
    const budget = await this.prisma.budget.findUnique({
      where: {
        idBudget: id,
      },
    });
    return budget;
  }

  

  async findAllRealization(queryParams: any) {
    try {
      // Dapatkan nilai filter dari queryParams
      const { years, costCenter, percentage } = queryParams;

      // Logika filter sesuai dengan kebutuhan
      let filter: any = {};
      if (years) {
        filter.years = +years; // konversi ke number jika diperlukan
      }
      if (costCenter) {
        filter.costCenter = costCenter; // konversi ke number jika diperlukan
      }

      // Panggil metode prisma atau logika lainnya dengan filter
      const results = await this.prisma.budget.findMany({
        where: filter, // Apply the filter to the query
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

      if (!results || results.length === 0) {
        throw new NotFoundException(
          'No realizations found with the specified filter.',
        );
      }

      // Check if a percentage is provided and it is a valid number
      if (percentage && !isNaN(percentage)) {
        const multiplier = +percentage / 100; // Convert percentage to a multiplier
        // Multiply each entry in results1 by the specified percentage
        const results1 = results.map((item) => {
          const updatedValues = {};

          for (let i = 1; i <= 12; i++) {
            updatedValues[`value${i}`] = item[`value${i}`] * multiplier;
          }
          return {
            ...item,
            total: item.total * multiplier,
            ...updatedValues,
          };
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

        return {
          MaterialExpenses,
          SubcontractExpenses,
          OtherOperatingExpenses,
        };
      } else {
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
              uniqueGroupGlValues[0],
              uniqueGroupDetailValues[0],
            ),
          },
          RepairableMaterial: {
            sumRepairableMaterial: sumByGroup(
              results,
              uniqueGroupGlValues[0],
              uniqueGroupDetailValues[1],
            ),
            sumRepairableMaterialMonth: sumByGroupAndMonth(
              results,
              uniqueGroupGlValues[0],
              uniqueGroupDetailValues[1],
            ),
          },
        };

        const SubcontractExpenses = {
          sumSubcontractExpenses: sumByGroup(results, uniqueGroupGlValues[1]),
          sumSubcontractExpensesMonth: sumByGroupAndMonth(
            results,
            uniqueGroupGlValues[1],
          ),
          RotablepartsSubcont: {
            sumRotablepartsSubcont: sumByGroup(
              results,
              uniqueGroupGlValues[1],
              uniqueGroupDetailValues[2],
            ),
            sumRotablepartsSubcontMonth: sumByGroupAndMonth(
              results,
              uniqueGroupGlValues[1],
              uniqueGroupDetailValues[2],
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
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // NestJS will handle NotFoundException and send a 404 response
      } else {
        // Log the error or handle other types of errors
        throw new BadRequestException('Invalid request.'); // NestJS will handle BadRequestException and send a 400 response
      }
    }
  }

  async remove(id: number) {
    const budget = await this.prisma.budget.delete({
      where: { idBudget: id },
    });
    return budget;
  }

  async deleteAll() {
    // Use the Prisma client to delete all records in the Budget table
    await this.prisma.budget.deleteMany({});
  }

  // async totalBudget() {
  //   const total = await this.prisma.$queryRaw`
  //   SELECT
  //     SUM(value01 + value02 + value03 + value04 + value05 + value06 + value07 + value08 + value09 + value10 + value11 + value12 + value13 + value14 + value15 + value16) as total
  //   FROM Budget;
  // `;
  //   return total[0].total;
  // }
  async totalBudget(idBudget: number): Promise<number> {
    const budget = await this.prisma.budget.findUnique({
      where: {
        idBudget: idBudget, // Menggunakan tipe data number
      },
    });

    if (!budget) {
      throw new NotFoundException(`Budget with ID ${idBudget} not found`);
    }

    // Calculate the total value from value01 to value16
    const total =
      budget.value1 +
      budget.value2 +
      budget.value3 +
      budget.value4 +
      budget.value5 +
      budget.value6 +
      budget.value7 +
      budget.value8 +
      budget.value9 +
      budget.value10 +
      budget.value11 +
      budget.value12 +
      budget.value13 +
      budget.value14 +
      budget.value15 +
      budget.value16;

    return total;
  }

  async getFilterBudget(queryParams: any) {
    try {
      // Dapatkan nilai filter dari queryParams
      const { years, costCenter } = queryParams;

      // Logika filter sesuai dengan kebutuhan
      let filter: any = {};
      if (years) {
        filter.years = +years; // konversi ke number jika diperlukan
      }
      if (costCenter) {
        filter.costCenter = costCenter; // konversi ke number jika diperlukan
      }

      // Panggil metode prisma atau logika lainnya dengan filter
      const results1 = await this.prisma.budget.findMany({
        where: filter, // Apply the filter to the query
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

      function createExpenseStructure(results, groupIndex, detailIndex) {
        return {
          sumExpenses: sumByGroup(results, uniqueGroupGlValues[groupIndex]),
          sumExpensesMonth: sumByGroupAndMonth(
            results,
            uniqueGroupGlValues[groupIndex],
          ),
          Details: {
            sumDetail: sumByGroup(
              results,
              uniqueGroupGlValues[groupIndex],
              uniqueGroupDetailValues[detailIndex],
            ),
            sumDetailMonth: sumByGroupAndMonth(
              results,
              uniqueGroupGlValues[groupIndex],
              uniqueGroupDetailValues[detailIndex],
            ),
          },
        };
      }

      // Contoh penggunaan fungsi utilitas
      const MaterialExpenses = createExpenseStructure(results1, 0, 0);
      const SubcontractExpenses = createExpenseStructure(results1, 1, 2);
      const StaffExpenses = createExpenseStructure(results1, 2, 4);
      const HonorariumExpenses = createExpenseStructure(results1, 2, 5);

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

      return {
        MaterialExpenses,
        SubcontractExpenses,
        OtherOperatingExpenses,
      };
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
