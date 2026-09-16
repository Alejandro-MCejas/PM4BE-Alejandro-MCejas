import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"



export class LoginUserDto {

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        description: 'The email of the user',
        example: 'admin@example.com'
    })
    email: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'The password of the user',
        example: 'Admin123@'
    })
    password: string
}
