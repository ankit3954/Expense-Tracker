import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transactions } from './entities/transaction.entity';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async findAll(): Promise<Transactions[]> {
    return this.transactionService.findAll();
  }

  @Post('/add')
  async addExpense(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.addTransaction(createTransactionDto);
  }

  @Put('/update/:id')
  async updateExpense(@Body() createTransactionDto: CreateTransactionDto, @Param('id') id : string) {
    return this.transactionService.updateTransaction(createTransactionDto, id);
  }

  @Delete('/delete/:id')
  async deleteExpense(@Param('id') id : string) {
    return this.transactionService.deleteTransaction(id);
  }

  @Get('/get/:id')
  async getExpenseById(@Param('id') id : string) {
    return this.transactionService.getTransactionById(id);
  }

  @Get('/getFor/:userId')
  async getExpenseByUserId(@Param('userId') userId : string) {
    return this.transactionService.getTransactionByUserId(userId);
  }

//   @Post('/register')
//   async registerUser(@Body() userDto: UsersDto) {
//     return this.transactionService.registerUser(userDto);
//   }
}
