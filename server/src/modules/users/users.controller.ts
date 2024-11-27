import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './users.service';
import { Users } from './entities/create-user.entity';
import { UsersDto } from './dto/users.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<Users[]> {
    return this.userService.findAll();
  }

  @Post('/register')
  async registerUser(@Body() userDto: UsersDto) {
    return this.userService.registerUser(userDto);
  }
}
