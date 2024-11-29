import { HttpStatus, Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login-user.dto";
import { comparePassword } from "src/common/hashing";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }


    async signIn(loginDto: LoginDto) {
        const { email, password } = loginDto
        // console.log(email, password)
        try {
            const user = await this.usersService.findOne(email)

            if (!user) {
                throw { message: "User Not Found" , statusCode : 401}
            }

            const hashedPassword = user.password
            const isPasswordMatched = await comparePassword(password, hashedPassword);

            if (!isPasswordMatched) {
                throw { message: "Wrong Password" , statusCode : 401}
            }

            const payload = {
                id : user.id,
                username : user.name
            }

           const access_token = await this.jwtService.signAsync(payload)
            return {
                message: "Logged In Successfully",
                access_token: access_token,
            }

        } catch (error) {
            throw {
                message: error.message || 'Internal server error',
                statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
}