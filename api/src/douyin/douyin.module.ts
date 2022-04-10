import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DouyinController } from './douyin.controller';
import { DouyinService } from './douyin.service';
import { auth_infor } from './entity/bozhu.entity';
import { video_list } from './entity/videoList.entity';

@Module({
  imports: [TypeOrmModule.forFeature([video_list, auth_infor])],
  controllers: [DouyinController],
  providers: [DouyinService]
})
export class DouyinModule {}
