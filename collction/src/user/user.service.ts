import { Injectable } from '@nestjs/common';
import { Repository, Entity } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'
import { user } from './entity/user.entity';
@Injectable()
export class UserService {
  constructor(@InjectRepository(user) private readonly userRep: Repository<any>){}

  async login (username: string, password: string){
      console.log(username, password);
      const info = await this.userRep.find({where:{username,password}})
      console.log(info);
      
  }

}
