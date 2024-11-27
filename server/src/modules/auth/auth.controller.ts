import { Body, Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-user.dto";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    async login(@Body() loginDto : LoginDto) {
        // console.log(loginDto)
        return this.authService.signIn(loginDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }

}