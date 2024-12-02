import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateTransactionDto{
  
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    amount: string;
  
    @IsOptional()
    description: string;
  
    @IsOptional()
    category: string;
  
    @IsNotEmpty()
    date: string; 
  
    @IsNotEmpty()
    userId: string
}