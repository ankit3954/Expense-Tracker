import { IsEmail, IsNotEmpty } from "class-validator";

export class UsersDto{
  
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    password: string;
}