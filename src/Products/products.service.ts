import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/createProduct.dto";
import { UpdateProductDto } from "./dto/updateProduct.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "../entities/products.entity";
import { EntityManager, In, MoreThan, Repository } from "typeorm";
import { ProductIdDto } from "../Orders/dto/createOrder.dto";
import { CategoriesService } from "src/categories/categories.service";



@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products) private readonly productsRepository: Repository<Products>,
        private readonly categoriesService: CategoriesService
    ) { }

    async getProductsService(page: number, limit: number) {
        const products = await this.productsRepository.find({
            skip: (page - 1) * limit,
            take: limit,
            relations: ['category']

        })

        return products
    }

    async getProductByIdService(id: string) {
        const product = await this.productsRepository.findOne({
            where: { id },
            relations: ['category']
        })

        if (!product) {
            throw new NotFoundException('Producto no encontrado')
        }

        return product
    }

    async createProductService(product: CreateProductDto) {
        const { name, category, stock } = product

        const existingProduct = await this.productsRepository.findOne({ where: { name } })


        if (existingProduct) {
            existingProduct.stock += stock
            return await this.productsRepository.save(existingProduct)
        }

        let productCategory = await this.categoriesService.getCategoryByNameService(category)

        if (!productCategory) {
            productCategory = await this.categoriesService.createCategoryService({ name: category })
        }

        const newProduct = this.productsRepository.create({
            ...product,
            category: productCategory
        })

        return await this.productsRepository.save(newProduct)


    }

    async updateProductService(id: string, product: UpdateProductDto) {
        const existingProduct = await this.productsRepository.findOne({
            where: { id }
        })

        if (!existingProduct) {
            throw new NotFoundException('Producto no encontrado')
        }

        if (product.category) {
            let productCategory = await this.categoriesService.getCategoryByNameService(product.category)

            if (!productCategory) {
                productCategory = await this.categoriesService.createCategoryService({ name: product.category })
            }

            existingProduct.category = productCategory
        }

        const { category, ...productData } = product

        Object.assign(existingProduct, productData)

        return await this.productsRepository.save(existingProduct)
    }

    async deleteProductService(id: string) {
        const productToDelete = await this.productsRepository.findOne({
            where: { id },
            select: ['id']
        })

        if (!productToDelete) {
            throw new NotFoundException('Producto no encontrado')
        }

        await this.productsRepository.delete(id)

        return productToDelete
    }

    async getProductsWithStockService(productsIds: Array<ProductIdDto>) {

        const ids = productsIds.map(product => product.id)

        return await this.productsRepository.find({
            where: {
                id: In(ids),
                stock: MoreThan(0)
            },
            select: ['id', 'price', 'stock']
        })


    }

    async reduceProductStockService(id: string, manager?: EntityManager) {

        const repository = manager ? manager.getRepository(Products) : this.productsRepository

        const result = await repository.update(
            { id, stock: MoreThan(0) },
            { stock: () => 'stock - 1' }
        )

        if (result.affected === 0) {
            throw new NotFoundException('Producto no encontrado o sin stock')
        }

    }

    async uploadImageService(id: string, url: string) {
        const product = await this.productsRepository.findOne({
            where: { id }
        })

        if (!product) {
            throw new NotFoundException('Producto no encontrado')
        }

        product.imgUrl = url

        return await this.productsRepository.save(product)
    }

}