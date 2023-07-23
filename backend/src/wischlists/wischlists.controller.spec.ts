import { Test, TestingModule } from '@nestjs/testing';
import { WischlistsController } from './wischlists.controller';
import { WischlistsService } from './wischlists.service';

describe('WischlistsController', () => {
  let controller: WischlistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WischlistsController],
      providers: [WischlistsService],
    }).compile();

    controller = module.get<WischlistsController>(WischlistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
