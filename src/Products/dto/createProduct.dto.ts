import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsNumber, IsString, IsUrl, Length, Min } from "class-validator"

export class CreateProductDto {
    @ApiProperty({
        description: 'The name of the product',
        example: 'Moto e7'
    })
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    name: string

    @ApiProperty({
        description: 'The description of the product',
        example: 'Good product'
    })
    @IsString()
    @IsNotEmpty()
    @Length(5, 500)
    description: string

    @ApiProperty({
        description: 'The price of the product',
        example: 1000
    })
    @IsNumber()
    @Min(0)
    price: number

    @ApiProperty({
        description: 'The stock of the product',
        example: 20
    })
    @IsInt()
    @Min(0)
    stock: number

    @ApiProperty({
        description: 'The image URL of the product',
        example: 'htpps://example.com/image.jpg'
    })
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    imgUrl: string

    @ApiProperty({
        description: 'The category name of the product',
        example: 'Tecnología'
    })
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    category: string
}