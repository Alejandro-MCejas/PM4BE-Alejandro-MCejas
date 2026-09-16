import { ApiProperty } from "@nestjs/swagger";
import { CategoryResponseDto } from "src/categories/dto/CategoryResponseDto.dto";


export class ProductResponseDto {
    @ApiProperty({
        description: 'The ID of the product',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    id: string;

    @ApiProperty({
        description: 'The name of the product',
        example: 'Moto e7'
    })
    name: string;

    @ApiProperty({
        description: 'The description of the product',
        example: 'Good product'
    })
    description: string;

    @ApiProperty({
        description: 'The price of the product',
        example: 1000
    })
    price: number;

    @ApiProperty({
        description: 'The stock of the product',
        example: 20
    })
    stock: number;

    @ApiProperty({
        description: 'The image URL of the product',
        example: 'https://example.com/image.jpg'
    })
    imgUrl: string;

    @ApiProperty({
        description: 'The category of the product',
        type: CategoryResponseDto
    })
    category: CategoryResponseDto;
}