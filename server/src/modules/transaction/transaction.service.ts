import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transactions } from './entities/transaction.entity';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { UpdateTransactionDto } from './dtos/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transactions)
    private readonly transactionRepository: Repository<Transactions>,
  ) { }

  async findAll(): Promise<Transactions[]> {
    return this.transactionRepository.find();
  }

  async addTransaction(createTransactionDto: CreateTransactionDto) {

    try {
      await this.transactionRepository.save(createTransactionDto)

      return {
        message: "Expense Added Successfully.",
        data: createTransactionDto
      }
    } catch (error) {
      throw {
        message: error.message || 'Internal server error',
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async updateTransaction(updateTransactionDto: UpdateTransactionDto, transactionId : string) {
    try {
      const existingTransaction = await this.transactionRepository.findOne({
        where: {
          id: transactionId
        }
      })

      if(!existingTransaction){
        throw {
          message: 'Transaction not found.',
          statusCode: 404 ,
        };
      }

      await this.transactionRepository.update(transactionId, updateTransactionDto)

      return {
        message: "Expense Updated Successfully.",
        data: updateTransactionDto
      }
    } catch (error) {
      throw {
        message: error.message || 'Internal server error',
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async deleteTransaction( transactionId : string) {
    try {
      
      const existingTransaction = await this.transactionRepository.findOne({
        where: {
          id: transactionId
        }
      })

      if(!existingTransaction){
        throw {
          message: 'Transaction not found.',
          statusCode: 404 ,
        };
      }

      await this.transactionRepository.delete(transactionId)

      return {
        message: "Expense Deleted Successfully."
      }
    } catch (error) {
      throw {
        message: error.message || 'Internal server error',
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async getTransactionById( transactionId : string) {
    try {
      
      const existingTransaction = await this.transactionRepository.findOne({
        where: {
          id: transactionId
        }
      })

      if(!existingTransaction){
        throw {
          message: 'Transaction not found.',
          statusCode: 404 ,
        };
      }

      return {
        message: "Expense Found Successfully.",
        data: existingTransaction
      }
    } catch (error) {
      throw {
        message: error.message || 'Internal server error',
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }


  async getTransactionByUserId( userId : string) {
    try {
      
      const existingTransactions = await this.transactionRepository.find({
        where: {
          userId: userId
        }
      })

      if(!existingTransactions){
        throw {
          message: 'Expenses not found.',
          statusCode: 404 ,
        };
      }

      return {
        message: "Expenses Found Successfully.",
        data: existingTransactions
      }
    } catch (error) {
      throw {
        message: error.message || 'Internal server error',
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }


}
