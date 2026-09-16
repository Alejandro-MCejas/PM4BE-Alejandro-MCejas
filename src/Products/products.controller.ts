import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/createProduct.dto";
import { UpdateProductDto } from "./dto/updateProduct.dto";
import { AuthGuard } from "src/Auth/AuthGuard.guard";
import { RoleGuard } from "src/Users/RoleGuard.guard";
import { Roles } from "src/decorators/roles.decorator";
import { UserRole } from "src/Users/enum/role.enum";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ProductResponseDto } from "./dto/ProductResponseDto.dto";

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    @ApiOkResponse({
        type: ProductResponseDto,
        isArray: true,
    })
    async getProductsController(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
        return await this.productsService.getProductsService(page, limit)
    }

    @Get(':id')
    @ApiOkResponse({
        type: ProductResponseDto
    })
    async getProductByIdController(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.productsService.getProductByIdService(id)
    }

    @Post()
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    @ApiCreatedResponse({
        type: ProductResponseDto
    })
    async createProductController(@Body() product: CreateProductDto) {
        return await this.productsService.createProductService(product)
    }

    @Put(':id')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    @ApiOkResponse({
        type: ProductResponseDto
    })
    async updateProductController(@Body() product: UpdateProductDto, @Param('id', new ParseUUIDPipe()) id: string) {
        return await this.productsService.updateProductService(id, product)
    }

    @Delete(':id')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    @ApiOkResponse({
        schema: {
            example: {
                message: 'El producto con el id 550e8400-e29b-41d4-a716-446655440000 ha sido eliminado'
            }
        }
    })
    async deleteProductController(@Param('id', new ParseUUIDPipe()) id: string) {
        const deletedProduct = await this.productsService.deleteProductService(id)

        return {
            message: `El producto con el id ${deletedProduct.id} ha sido eliminado`
        }
    }
}