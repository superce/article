import { Test, TestingModule } from '@nestjs/testing';
import { BaijiahaoService } from './baijiahao.service';

describe('BaijiahaoService', () => {
  let service: BaijiahaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaijiahaoService],
    }).compile();

    service = module.get<BaijiahaoService>(BaijiahaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
