import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transactions } from './entities/transaction.entity';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateTransactionDto } from './dtos/update-transaction.dto';

@UseGuards(AuthGuard)
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async findAll(): Promise<Transactions[]> {
    return this.transactionService.findAll();
  }

  @Post('/add')
  async addExpense(@Body() createTransactionDto: CreateTransactionDto, @Request() req) {
    return this.transactionService.addTransaction(createTransactionDto, req.user.id);
  }

  @Put('/update/:id')
  async updateExpense(@Body() updateTransactionDto: UpdateTransactionDto, @Param('id') id : string) {
    return this.transactionService.updateTransaction(updateTransactionDto, id);
  }

  @Delete('/delete/:id')
  async deleteExpense(@Param('id') id : string) {
    return this.transactionService.deleteTransaction(id);
  }

  @Get('/get/:id')
  async getExpenseById(@Param('id') id : string) {
    return this.transactionService.getTransactionById(id);
  }

  @Get('/getFor')
  async getExpenseByUserId(@Request() req) {
    return this.transactionService.getTransactionByUserId(req.user.id);
  }

//   @Post('/register')
//   async registerUser(@Body() userDto: UsersDto) {
//     return this.transactionService.registerUser(userDto);
//   }
}
