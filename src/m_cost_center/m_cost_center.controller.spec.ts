import { Test, TestingModule } from '@nestjs/testing';
import { MCostCenterController } from './m_cost_center.controller';
import { MCostCenterService } from './m_cost_center.service';

describe('MCostCenterController', () => {
  let controller: MCostCenterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MCostCenterController],
      providers: [MCostCenterService],
    }).compile();

    controller = module.get<MCostCenterController>(MCostCenterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
