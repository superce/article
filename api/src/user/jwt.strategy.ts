import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtContants } from './jwt.contants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { user } from './entity/user.entity';
// import 

// import { ConfigService } from '@nestjs/config';
// import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 获取请求header token值
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      secretOrKey: jwtContants.secret,
    });
  }  
  async validate(payload: any) {
    console.log('payload', payload);
    //payload：jwt-passport认证jwt通过后解码的结果
    return { username: payload.username, id: payload.sub };
  }
}