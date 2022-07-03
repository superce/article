import { Test, TestingModule } from '@nestjs/testing';
import { WeiboController } from './weibo.controller';

describe('WeiboController', () => {
  let controller: WeiboController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeiboController],
    }).compile();

    controller = module.get<WeiboController>(WeiboController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
