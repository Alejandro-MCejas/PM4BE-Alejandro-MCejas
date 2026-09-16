import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, Length, Matches } from "class-validator"

export class CreateUserDto {
    @ApiProperty({
        description: 'The name of the user',
        example: 'Juan Perez'
    })
    @IsString()
    @IsNotEmpty()
    @Length(3, 80)
    name: string

    @ApiProperty({
        description: 'The email of the user',
        example: 'juan@example.com'
    })
    @IsEmail()
    email: string

    @ApiProperty({
        description: 'The password of the user',
        example: 'Juan123@'
    })
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/)
    password: string

    @ApiProperty({
        description: 'The address of the user',
        example: 'Av. Ejemplo 123'
    })
    @IsString()
    @Length(3, 80)
    address: string

    @ApiProperty({
        description: 'The phone of the user',
        example: '3511234567'
    })
    @IsNumberString()
    @IsNotEmpty()
    phone: string

    @ApiProperty({
        description: 'The country of the user',
        example: 'Argentina'
    })
    @IsOptional()
    @IsString()
    @Length(5, 20)
    country?: string

    @ApiProperty({
        description: 'The city of the user',
        example: 'Cordoba'
    })
    @IsOptional()
    @IsString()
    @Length(5, 20)
    city?: string
}