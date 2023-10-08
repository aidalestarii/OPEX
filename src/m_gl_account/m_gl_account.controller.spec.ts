import { Test, TestingModule } from '@nestjs/testing';
import { MGlAccountController } from './m_gl_account.controller';

describe('MGlAccountController', () => {
  let controller: MGlAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MGlAccountController],
    }).compile();

    controller = module.get<MGlAccountController>(MGlAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
