import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { ArrayNotEmpty, IsArray, IsUUID, ValidateNested } from "class-validator"

export class ProductIdDto {

    @ApiProperty({
        description: 'The id of the product',
        example: "550e8400-e29b-41d4-a716-446655440000"
    })
    @IsUUID()
    id: string
}


export class CreateOrderDto {

    @ApiProperty({
        description: 'The id of the products',
        example: [
            {
                id: "550e8400-e29b-41d4-a716-446655440000"
            }
        ]

    })
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ProductIdDto)
    products: ProductIdDto[]
}