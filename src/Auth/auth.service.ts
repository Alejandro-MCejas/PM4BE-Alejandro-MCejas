import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../Users/users.service";
import { SignUpDto } from "./dto/SignUp.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { Users } from "../entities/users.entity";


@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async signInService(email: string, password: string) {

        const user = await this.usersService.findUserByEmailService(email)

        if (!user) {
            throw new UnauthorizedException('Email o contraseña incorrectos')
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password)

        if (!isPasswordMatching) {
            throw new UnauthorizedException('Email o contraseña incorrectos')
        }

        const token = await this.createToken(user)

        return { token }
    }

    async signUpService(user: SignUpDto) {

        const existingUser = await this.usersService.findUserByEmailService(user.email)

        if (existingUser) {
            throw new ConflictException('El email ya está registrado')
        }

        const { confirmPassword, password, ...userData } = user

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await this.usersService.createUserService({
            ...userData,
            password: hashedPassword
        })

        return {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            address: newUser.address,
            phone: newUser.phone,
            country: newUser.country,
            city: newUser.city
        }
    }

    private async createToken(user: Users) {

        const payload = {
            id: user.id,
            email: user.email,
            roles: user.admin
        }

        return await this.jwtService.signAsync(payload)
    }
}