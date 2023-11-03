import { Body, Controller, Post } from '@nestjs/common';
import { RealizationService } from './realization.service';
import { CreateRealizationDto } from './dto/create-realization.dto';

@Controller({
  version: '1',
  path: 'api/realization',
})
export class RealizationController {
  constructor(private readonly realizationService: RealizationService) {}

  // @Post('post2')
  // async createUserWithPosts(
  //   @Body() CreateRealizationDto: CreateRealizationDto,
  // ): Promise<any> {
  //   return this.realizationService.createRealization(CreateRealizationDto);
  // }
}
