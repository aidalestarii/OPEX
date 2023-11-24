import { Test, TestingModule } from '@nestjs/testing';
import { MasterStatusController } from './master_status.controller';
import { MasterStatusService } from './master_status.service';

describe('MasterStatusController', () => {
  let controller: MasterStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterStatusController],
      providers: [MasterStatusService],
    }).compile();

    controller = module.get<MasterStatusController>(MasterStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
