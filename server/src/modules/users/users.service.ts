import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/create-user.entity';
import { UsersDto } from './dto/users.dto';
import { hashPassword } from 'src/common/hashing';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) { }

  async findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async findOne(email: string): Promise<Users> {
    return this.userRepository.findOne({
      where: {
        email: email
      }
    })
  }

  async registerUser(userDto: UsersDto) {
    const { name, email, password } = userDto
    try {
      const isUserPresent = await this.findOne(email);

      if (isUserPresent) {
        return {
          message: "User is already present",
        }
      }

      const hashedPassword = await hashPassword(password)

      userDto.password = hashedPassword;
      await this.userRepository.save(userDto);

      const newUser = { name, email }

      return {
        message: "User Registered Successfully",
        user: newUser
      }

    } catch (error) {
      throw {
        message: error.message || 'Internal server error',
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }

  }
}
