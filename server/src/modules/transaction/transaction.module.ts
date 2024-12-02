import { Module } from '@nestjs/common';
import { Transactions } from './entities/transaction.entity';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Users} from './entities/create-user.entity';
// import { UserService } from './users.service'
// import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';


@Module({
    imports: [TypeOrmModule.forFeature([Transactions])],
    controllers: [TransactionController],
    providers: [TransactionService]
  })
  export class TransactionModule {}
