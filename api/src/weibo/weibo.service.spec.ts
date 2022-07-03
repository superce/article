import { Test, TestingModule } from '@nestjs/testing';
import { WeiboService } from './weibo.service';

describe('WeiboService', () => {
  let service: WeiboService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeiboService],
    }).compile();

    service = module.get<WeiboService>(WeiboService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
