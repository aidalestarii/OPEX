import { Test, TestingModule } from '@nestjs/testing';
import { RealizationItemService } from './realization_item.service';

describe('RealizationItemService', () => {
  let service: RealizationItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RealizationItemService],
    }).compile();

    service = module.get<RealizationItemService>(RealizationItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
