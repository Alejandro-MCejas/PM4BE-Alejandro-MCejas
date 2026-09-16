import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {

    @ApiProperty({
        description: 'The ID of the user',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    id: string;

    @ApiProperty({
        description: 'The name of the user',
        example: 'Juan Perez'
    })
    name: string;

    @ApiProperty({
        description: 'The email of the user',
        example: 'juan@example.com'
    })
    email: string;

    @ApiProperty({
        description: 'The phone of the user',
        example: '3511234567'
    })
    phone: string;

    @ApiProperty({
        description: 'The country of the user',
        example: 'Argentina'
    })
    country: string;

    @ApiProperty({
        description: 'The address of the user',
        example: 'Av. Ejemplo 123'
    })
    address: string;

    @ApiProperty({
        description: 'The city of the user',
        example: 'Cordoba'
    })
    city: string;
}