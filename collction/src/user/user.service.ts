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
        let status = {
          code: 401,
          message: '用戶名或密码错误！'
        }
        throw new HttpException(status, HttpStatus.OK);
      }
      const { id } = user[0]
      const token = this.jwtService.sign({ username, sub: id})
      const info = {
        id,
        username,
        token,
        code: 200
      }
      throw new HttpException(info, HttpStatus.OK);
      // return info
  }
}

export class RegisterService {
  constructor(@InjectRepository(user) private readonly userRep: Repository<user>) { }
  
  async register(userInfo: userDTO) {
    const { username } = userInfo
    const existUser = await this.userRep.findOne({where:{username}})
    if(existUser){
      let status = {
        code: 401,
        message: '用户名已存在'
      }
      throw new HttpException(status, HttpStatus.OK);
    }
    const newUser = this.userRep.create(userInfo)
    return await this.userRep.save(newUser)
  }
}
