import { ApiProperty, PartialType } from "@nestjs/swagger"
import { IsString, IsNumber, IsOptional } from "class-validator"
import { CreateProductDto } from "./createProduct.dto"


export class UpdateProductDto extends PartialType(CreateProductDto){
    @ApiProperty({
        description: 'The name of the product',
        example: 'Moto e7'
    })
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty({
        description: 'The description of the product',
        example: 'Good product'
    })
    @IsOptional()
    @IsString()
    description?: string

    @ApiProperty({
        description: 'The price of the product',
        example: '1000'
    })
    @IsOptional()
    @IsNumber()
    price?: number

    @ApiProperty({
        description: 'The stock of the product',
        example: '20'
    })
    @IsOptional()
    @IsNumber()
    stock?: number

    @ApiProperty({
        description: 'The image of the product',
        example: 'htpps://example.com/image.jpg'
    })
    @IsOptional()
    @IsString()
    imgUrl?: string

    @IsOptional()
    @IsString()
    category?: string
}