import { HttpException, HttpStatus, Injectable, BadRequestException } from '@nestjs/common';
import { Repository, Entity } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'
import { user } from './entity/user.entity';
import { userDTO } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(user) 
    private readonly userRep: Repository<user>,
    private readonly jwtService: JwtService
  ){}

  async login (username: string, password: string){
      const user = await this.userRep.find({where:{username,password}})      
      if(user.length === 0){
        throw new BadRequestException('用戶名或密码错误！');
      }
      const { id } = user[0]
      const token = this.jwtService.sign({ username, sub: id})
      const info = {
        id,
        username,
        token
      }
      return info
  }
}

export class RegisterService {
  constructor(@InjectRepository(user) private readonly userRep: Repository<user>) { }
  
  async register(userInfo: userDTO) {
    const { username } = userInfo
    const existUser = await this.userRep.findOne({where:{username}})
    if(existUser){
      throw new HttpException("用户名已存在", HttpStatus.BAD_REQUEST)
    }
    const newUser = this.userRep.create(userInfo)
    return await this.userRep.save(newUser)
  }
}
