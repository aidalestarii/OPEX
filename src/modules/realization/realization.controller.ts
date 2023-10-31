import { Controller, Post } from '@nestjs/common';
import { RealizationService } from './realization.service';

@Controller({
  version: '1',
  path: 'api/realization',
})
export class RealizationController {
  constructor(private readonly realizationService: RealizationService) {}
}
