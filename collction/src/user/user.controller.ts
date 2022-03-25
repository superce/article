import { Body, ClassSerializerInterceptor, Controller, Header, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { userDTO } from './dto';
import { UserService, RegisterService } from './user.service'
// @ApiTags('验证')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private registerService: RegisterService
  ){}


  @UseGuards(AuthGuard('local')) //守卫将从body中提取username、password，然后调用LocalStrategy中的validate方法，若认证通过，则将User信息赋值给request.user。
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/login')
  // @Header
  async login(@Body() user: userDTO, @Req() req){
    return req.user
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/register')
  async register(@Body() user: userDTO){
    return await this.registerService.register(user)
  }
}

