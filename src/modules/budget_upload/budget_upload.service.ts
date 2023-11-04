import { BadRequestException, Injectable } from '@nestjs/common';
import { Request } from 'express';
//import { format } from 'date-fns';
import { ItemsBudgetUploadDto } from './dtos/budget-upload.dto';
import { ExcelBudgetUploadService } from './excel_budget_upload.service';
import { ReadBudgetUploadSheetDto } from './dtos/read-budget-upload.dto';
import { WriteResponseBase } from '@elastic/elasticsearch/lib/api/types';

@Injectable()
export class BudgetUploadService {
  constructor(private readonly excelService: ExcelBudgetUploadService) {
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
          `Failed to read Excel, sheetname invalid`,
        );
      const items: ItemsBudgetUploadDto[] = read?.budgetUpload;
      // Mengganti respons dengan struktur yang sesuai dengan WriteResponseBase
      return items;
    } catch (error) {
      throw new BadRequestException(error?.response);
    }
  }
}
