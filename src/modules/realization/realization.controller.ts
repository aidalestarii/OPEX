import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RealizationService } from './realization.service';
import { CreateRealization, MStatus } from './dto/create-realization.dto';
import {
  UpdateRealization,
  UpdateRealizationItem,
} from './dto/update-realization.dto';

@Controller({
  version: '1',
  path: 'api/realization',
})
export class RealizationController {
  constructor(private readonly realizationService: RealizationService) {}

  // @Post()
  // async createRealizationWithItems(
  //   @Body() createRealization: CreateRealization,
  // ) {
  //   createRealization.statusId = 1;
  //   createRealization.statusToId = 2;
  //   return this.realizationService.createRealizationItems(createRealization);
  // }

  @Get()
  findRealization() {
    return this.realizationService.findRealization();
  }

  @Patch(':id')
  async updateRealization(
    @Param('id') id: number,
    @Body() updateData: UpdateRealization,
  ): Promise<any> {
    try {
      const updatedRealization =
        await this.realizationService.updateRealization(+id, updateData);
      return updatedRealization;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Post('/mstatus')
  createMStatus(@Body() mStatus: MStatus) {
    return this.realizationService.createMStatus(mStatus);
  }
}
