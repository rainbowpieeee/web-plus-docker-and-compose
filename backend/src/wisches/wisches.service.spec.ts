import { Test, TestingModule } from '@nestjs/testing';
import { WischesService } from './wisches.service';

describe('WischesService', () => {
  let service: WischesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WischesService],
    }).compile();

    service = module.get<WischesService>(WischesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
