import { Test, TestingModule } from '@nestjs/testing';
import { WischlistsService } from './wischlists.service';

describe('WischlistsService', () => {
  let service: WischlistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WischlistsService],
    }).compile();

    service = module.get<WischlistsService>(WischlistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
