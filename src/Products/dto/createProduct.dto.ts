import { ApiProperty } from "@nestjs/swagger"
import {IsNumber, IsString } from "class-validator"

export class CreateProductDto{
    @ApiProperty({
        description: 'The name of the product',
        example: 'Moto e7'
    })
    @IsString()
    name: string

    @ApiProperty({
        description: 'The description of the product',
        example: 'Good product'
    })
    @IsString()
    description: string

    @ApiProperty({
        description: 'The price of the product',
        example: '1000'
    })
    @IsNumber()
    price: number

    @ApiProperty({
        description: 'The stock of the product',
        example: '20'
    })
    @IsNumber()
    stock: number

    @ApiProperty({
        description: 'The image of the product',
        example: 'htpps://example.com/image.jpg'
    })
    @IsString()
    imgUrl: string

    @IsString()
    category: string 
}