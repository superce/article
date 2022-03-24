import { Body, Controller, Header, Post } from '@nestjs/common';
import { userDTO } from './dto';
import { UserService } from './user.service'
@Controller('user')
export class UserController {
  constructor(private userService: UserService){}
  @Post('/login')
  // @Header
  async login(@Body() user: userDTO){
    const {username, password} = user
    await this.userService.login(username, password)
  }
}
