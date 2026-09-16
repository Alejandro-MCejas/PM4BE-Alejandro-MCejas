import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/LoginUserDto.dto";
import { SignUpDto } from "./dto/SignUp.dto";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signin')
    async signInController(@Body() user: LoginUserDto) {
        return await this.authService.signInService(user.email, user.password)
    }

    @Post('signup')
    async signUpController(@Body() user: SignUpDto) {
        if (user.password !== user.confirmPassword) {
            throw new BadRequestException('Las contraseñas no coinciden')
        }

        return await this.authService.signUpService(user)
    }
}