import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { User} from './users.entity';
import { UserService } from './users.service'
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService],
  })
  export class UserModule {}
