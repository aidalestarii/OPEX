import { Body, Controller, Post } from '@nestjs/common';
import { RealizationService } from './realization.service';
import { CreateRealization, MStatus } from './dto/create-realization.dto';

@Controller({
  version: '1',
  path: 'api/realization',
})
export class RealizationController {
  constructor(private readonly realizationService: RealizationService) {}

  @Post()
  async createRealizationWithItems(
    @Body() createRealization: CreateRealization,
  ) {
    return this.realizationService.createRealizationItems(createRealization);
  }

  @Post('/mstatus')
  async createMStatus(@Body() mStatus: MStatus) {
    return this.realizationService.createMStatus(mStatus);
  }
}
