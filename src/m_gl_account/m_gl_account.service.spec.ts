import { Test, TestingModule } from '@nestjs/testing';
import { MGlAccountService } from './m_gl_account.service';

describe('MGlAccountService', () => {
  let service: MGlAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MGlAccountService],
    }).compile();

    service = module.get<MGlAccountService>(MGlAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
