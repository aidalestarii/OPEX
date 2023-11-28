import { Test, TestingModule } from '@nestjs/testing';
import { MasterStatusService } from './master_status.service';

describe('MasterStatusService', () => {
  let service: MasterStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterStatusService],
    }).compile();

    service = module.get<MasterStatusService>(MasterStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
