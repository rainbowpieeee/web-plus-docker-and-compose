import { Test, TestingModule } from '@nestjs/testing';
import { WischesController } from './wisches.controller';
import { WischesService } from './wisches.service';

describe('WischesController', () => {
  let controller: WischesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WischesController],
      providers: [WischesService],
    }).compile();

    controller = module.get<WischesController>(WischesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
