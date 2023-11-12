import { BadRequestException, Injectable } from '@nestjs/common';
import { Request } from 'express';
//import { format } from 'date-fns';
import { ItemsBudgetUploadDto } from './dtos/budget-upload.dto';
import { ExcelBudgetUploadService } from './excel_budget_upload.service';
import { ReadBudgetUploadSheetDto } from './dtos/read-budget-upload.dto';
import { PrismaService } from 'src/core/service/prisma.service';
import { randomUUID } from 'crypto';

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

      // console.log(groupedResults);
      return results;
    } catch (error) {
      throw new BadRequestException(error?.response);
    }
  }
}

// const result = await Promise.all(

//   items?.map(async (item) => {
//     const data = {
//       years: Number(item.years),
//       glAccount: Number(item.glAccount),
//       costCenter: Number(item.costCenter),
//       total: parseFloat(
//         String(
//           item.value01 +
//             item.value02 +
//             item.value03 +
//             item.value04 +
//             item.value05 +
//             item.value06 +
//             item.value07 +
//             item.value08 +
//             item.value09 +
//             item.value10 +
//             item.value11 +
//             item.value12,
//         ),
//       ),
//       value01: parseFloat(String(item.value01)),
//       value02: parseFloat(String(item.value02)),
//       value03: parseFloat(String(item.value03)),
//       value04: parseFloat(String(item.value04)),
//       value05: parseFloat(String(item.value05)),
//       value06: parseFloat(String(item.value06)),
//       value07: parseFloat(String(item.value07)),
//       value08: parseFloat(String(item.value08)),
//       value09: parseFloat(String(item.value09)),
//       value10: parseFloat(String(item.value10)),
//       value11: parseFloat(String(item.value11)),
//       value12: parseFloat(String(item.value12)),
//       //sisanya bikin null
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };
//     console.log(data);
//     // return data;
//     const prismaResult = await this.prisma.budget.create({
//       data,
//     });

//     results.push(prismaResult);
//   }),
// );

// const data = {
//   years: 2023,
//   glAccount: 1,
//   costCenterId: 1,
//   total: 1000.6,
//   value01: 1.02,
//   value02: 2.01,
//   value03: 3.03,
//   value04: 4.04,
//   value05: 5.06,
//   value06: 6.06,
//   value07: 7.06,
//   value08: 8.06,
//   value09: 9.06,
//   value10: 10.06,
//   value11: 11.06,
//   value12: 12.06,
//   //sisanya bikin null
// };
// console.log(data);
// return data;
// const prismaResult = await this.prisma.budget.create({
//   data,
// });

// return prismaResult;
// Mengganti respons dengan struktur yang sesuai dengan WriteResponseBase
// const resultJson = await this.prisma.budget.create({
//   data: dataToCreate,
// });

// const ukuranData1 = req?.file?.size;
// const ukuranData2 = req?.file?.originalname;
// const ukuranData3 = req?.file?.path;
// const dataFile = {
//   ukuranData1,
//   ukuranData2,
//   ukuranData3,
// };
// const propertyFile = await this.prisma.budget.create({
//   data: dataFile,
// });
// return propertyFile;
