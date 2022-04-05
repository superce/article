import { Test, TestingModule } from '@nestjs/testing';
import { DouyinController } from './douyin.controller';

describe('DouyinController', () => {
  let controller: DouyinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DouyinController],
    }).compile();

    controller = module.get<DouyinController>(DouyinController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
