import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './users.entity';
import { UsersDto } from './users.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() userDto: UsersDto) {
    return this.userService.create(userDto);
  }
}
