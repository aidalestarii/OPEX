import { Test, TestingModule } from '@nestjs/testing';
import { KurssController } from './kurss.controller';
import { KurssService } from './kurss.service';

describe('KurssController', () => {
  let controller: KurssController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KurssController],
      providers: [KurssService],
    }).compile();

    controller = module.get<KurssController>(KurssController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
