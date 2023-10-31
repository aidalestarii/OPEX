import { Test, TestingModule } from '@nestjs/testing';
import { RealizationItemController } from './realization_item.controller';

describe('RealizationItemController', () => {
  let controller: RealizationItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealizationItemController],
    }).compile();

    controller = module.get<RealizationItemController>(RealizationItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
