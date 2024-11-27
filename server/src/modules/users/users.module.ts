import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { Users} from './entities/create-user.entity';
import { UserService } from './users.service'
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
  })
  export class UserModule {}
