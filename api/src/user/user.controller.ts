import { Body, ClassSerializerInterceptor, Controller, Get, Header, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { userDTO, meunDTO } from './dto';
import { UserService, RegisterService } from './user.service'
// @ApiTags('验证')
@Controller('api/user')
export class UserController {
  constructor(
    private userService: UserService,
    private registerService: RegisterService
  ){}

  // @Header('Access-Control-Allow-Origin', '*')
  // @Header('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE')
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

  @UseInterceptors(ClassSerializerInterceptor)
  // 创建菜单
  @Post('/create/meun')  
  async onCreateMeun(@Body() name: meunDTO) {
    console.log('name', name);
    return await this.userService.onCreateMeun(name)
  }
   // 创建列表
   @Get('/meun/list')  
   async onListMeun() {
    //  console.log('name', name);
     return await this.userService.onGetMeunList()
   }
}

