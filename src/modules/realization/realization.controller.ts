import { Body, Controller, Post } from '@nestjs/common';
import { RealizationService } from './realization.service';
import { CreateRealizationWithItemsDto } from './dto/create-realization.dto';

@Controller({
  version: '1',
  path: 'api/realization',
})
export class RealizationController {
  constructor(private readonly realizationService: RealizationService) {}

  @Post()
  async createRealizationWithItems(
    @Body() createRealizationWithItemsDto: CreateRealizationWithItemsDto,
  ) {
    return this.realizationService.createRealizationWithItems(
      createRealizationWithItemsDto,
    );
  }
}
