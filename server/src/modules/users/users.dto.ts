import { IsNotEmpty } from "class-validator";

export class UsersDto{
  
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    email: string;
  
    @IsNotEmpty()
    password: string;
}