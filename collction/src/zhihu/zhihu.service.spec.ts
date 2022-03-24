import { Test, TestingModule } from '@nestjs/testing';
import { ZhihuService } from './zhihu.service';

describe('ZhihuService', () => {
  let service: ZhihuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZhihuService],
    }).compile();

    service = module.get<ZhihuService>(ZhihuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
