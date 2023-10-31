import { Controller } from '@nestjs/common';
import path from 'path';
import { RealizationItemService } from './realization_item.service';

@Controller({
  version: '1',
  path: 'api/realizationitem',
})
export class RealizationItemController {
  constructor(
    private readonly realizationItemService: RealizationItemService,
  ) {}
}
