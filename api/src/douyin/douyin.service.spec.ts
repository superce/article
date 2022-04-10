import { Test, TestingModule } from '@nestjs/testing';
import { DouyinService } from './douyin.service';

describe('DouyinService', () => {
  let service: DouyinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DouyinService],
    }).compile();

    service = module.get<DouyinService>(DouyinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
