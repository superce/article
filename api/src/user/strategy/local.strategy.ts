import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { user } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user.service'
import { BadRequestException, Injectable } from '@nestjs/common';


@Injectable()
export class LocalStorage extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string): Promise<any> {
    
    const user = await this.userService.login(username, password)
    return user;
  }
}