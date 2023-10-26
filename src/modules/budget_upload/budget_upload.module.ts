import { Module } from '@nestjs/common';
import { BudgetUploadController } from './budget_upload.controller';
import { BudgetUploadService } from './budget_upload.service';
import { ExcelBudgetUploadService } from './excel_budget_upload.service';
import { ReadExcelSheetBudgetUploadBuilder } from 'src/core/utils/read-excel-sheet-budget-upload-builder.util';
import { BudgetUploadProcessExcelToJsonBuilder } from 'src/core/utils/budget-upload-process-excel-to-json-builder.util';

@Module({
  controllers: [BudgetUploadController],
  providers: [
    BudgetUploadService,
    ExcelBudgetUploadService,
    ReadExcelSheetBudgetUploadBuilder,
    BudgetUploadProcessExcelToJsonBuilder,
  ],
})
export class BudgetUploadModule {}
