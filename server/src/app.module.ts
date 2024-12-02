import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserService } from './users/users.service';
import { UserModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionModule } from './modules/transaction/transaction.module';
// import { DatabaseModule } from './config/database.module';


@Module({
  imports: [ 
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule, AuthModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
