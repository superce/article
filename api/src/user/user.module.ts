import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService, RegisterService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { user, meun } from './entity/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStorage } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtContants } from './jwt.contants';
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    TypeOrmModule.forFeature([user,meun]), 
    PassportModule, 
    JwtModule.register({
      secret: jwtContants.secret
    })
  ],
  controllers: [UserController],
  providers: [UserService, RegisterService, LocalStorage, JwtModule, JwtStrategy]
})
export class UserModule {}
