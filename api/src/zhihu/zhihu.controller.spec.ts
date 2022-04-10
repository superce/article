import { Test, TestingModule } from '@nestjs/testing';
import { ZhihuController } from './zhihu.controller';

describe('ZhihuController', () => {
  let controller: ZhihuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZhihuController],
    }).compile();

    controller = module.get<ZhihuController>(ZhihuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
