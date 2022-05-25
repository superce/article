import { Test, TestingModule } from '@nestjs/testing';
import { BaijiahaoController } from './baijiahao.controller';

describe('BaijiahaoController', () => {
  let controller: BaijiahaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaijiahaoController],
    }).compile();

    controller = module.get<BaijiahaoController>(BaijiahaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
