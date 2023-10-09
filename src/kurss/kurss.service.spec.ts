import { Test, TestingModule } from '@nestjs/testing';
import { KurssService } from './kurss.service';

describe('KurssService', () => {
  let service: KurssService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KurssService],
    }).compile();

    service = module.get<KurssService>(KurssService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
