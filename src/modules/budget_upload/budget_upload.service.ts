import { BadRequestException, Injectable } from '@nestjs/common';
import { Request } from 'express';
//import { format } from 'date-fns';
import { ItemsBudgetUploadDto } from './dtos/budget-upload.dto';
import { ExcelBudgetUploadService } from './excel_budget_upload.service';
import { ReadBudgetUploadSheetDto } from './dtos/read-budget-upload.dto';
import { WriteResponseBase } from '@elastic/elasticsearch/lib/api/types';
import { PrismaService } from 'src/core/service/prisma.service';

@Injectable()
export class BudgetUploadService {
  // constructor(private readonly prisma: PrismaService) {}
  constructor(
    private readonly excelService: ExcelBudgetUploadService,
    private readonly prisma: PrismaService,
  ) {
    BudgetUploadService?.name;
  }

  async convertBudgetUploadFromExcelToJson<T>(req: Request): Promise<any> {
    try {
      const read: ReadBudgetUploadSheetDto =
        await this.excelService.readFormatExcel(req);
      if (!read?.budgetUpload)
        throw new BadRequestException(
          `Failed to read Excel, sheetname invalid`,
        );

      const items: ItemsBudgetUploadDto[] = read?.budgetUpload;

      console.log(items);
      return items;
    } catch (error) {
      throw new BadRequestException(error?.response);
    }
  }
}
