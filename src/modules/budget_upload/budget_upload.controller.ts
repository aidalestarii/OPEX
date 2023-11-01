import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request, Express } from 'express';
import { multerOptions } from 'src/config/multer-options.config';
import { BudgetUploadService } from './budget_upload.service';
@Controller('budget-upload')
export class BudgetUploadController {
  constructor(private readonly BudgetUploadService: BudgetUploadService) {
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
        await this.BudgetUploadService.convertBudgetUploadFromExcelToJson(req);
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
}
