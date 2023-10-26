import { Test, TestingModule } from '@nestjs/testing';
import { BudgetUploadController } from './budget_upload.controller';

describe('BudgetUploadController', () => {
  let controller: BudgetUploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BudgetUploadController],
    }).compile();

    controller = module.get<BudgetUploadController>(BudgetUploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
