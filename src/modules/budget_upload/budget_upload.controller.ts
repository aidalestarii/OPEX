import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request, Express } from 'express';
import { multerOptions } from 'src/config/multer-options.config';
import { BudgetUploadService } from './budget_upload.service';
// import { UpdateBudgetDto } from './dtos/update-budget.dto';
import { ItemsBudgetUploadDto } from './dtos/budget-upload.dto';
import { BudgetService } from './budget.service';

@Controller({
  version: '1',
  path: 'api/budget',
})
export class BudgetUploadController {
  constructor(
    private readonly budgetUploadService: BudgetUploadService,
    private readonly budgetService: BudgetService,
  ) {
    BudgetUploadController.name;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadDataBleed<T>(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response<T, Record<string, T>>> {
    try {
      const payload =
        await this.budgetUploadService.convertBudgetUploadFromExcelToJson(req);
      return res.status(201).json({
        data: payload,
        meta: {
          fileName: req?.file?.originalname,
          status: 'OK',
        },
        message: 'Data has been converted & saved',
        time: new Date(),
      });
    } catch (error) {
      return res.status(400).json(error.response);
    }
  }

  //CRUD
  @Get('/all')
  async getProcessedData(@Req() req: Request, @Res() res: Response) {
    try {
      const processedData = await this.budgetUploadService.getProcessedData(
        req,
      );
      return res.status(200).json({
        data: processedData,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message || error.stack,
      });
    }
  }

  @Get('/goat')
  findAllRealization(@Query() queryParams: any) {
    return this.budgetUploadService.findAllRealization(queryParams);
  }

  // @Get('/filter')
  // async filterByYearAndDinas(
  //   @Query('year') year: number,
  //   @Query('dinas') dinas: string,
  //   @Req() req: Request,
  // ): Promise<any> {
  //   try {
  //     const filteredData = await this.budgetUploadService.filterByYearAndDinas(
  //       year,
  //       dinas,
  //     );
  //     return filteredData;
  //   } catch (error) {
  //     // Handle errors appropriately (e.g., return an error response)
  //     console.error(error);
  //     throw error;
  //   }
  // }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.budgetService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetService.remove(+id);
  }

  @Delete()
  async deleteAll() {
    await this.budgetService.deleteAll();
    return 'All records have been deleted from the Budget table.';
  }
}
