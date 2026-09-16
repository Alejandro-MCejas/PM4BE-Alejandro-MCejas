import { ApiProperty } from "@nestjs/swagger"


export class CategoryResponseDto {
    @ApiProperty({
        description: 'The ID of the category',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    id: string

    @ApiProperty({
        description: 'The name of the category',
        example: 'Tecnologia'
    })
    name: string
}