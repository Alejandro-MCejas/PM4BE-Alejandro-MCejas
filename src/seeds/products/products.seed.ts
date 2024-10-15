import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/entities/categories.entity";
import { Products } from "src/entities/products.entity";
import { Repository } from "typeorm";
import { productsMock } from "./products-mock";


@Injectable()
export class ProductsSeed {
    constructor(
        @InjectRepository(Products) private readonly productsRepository: Repository<Products>,
        @InjectRepository(Categories) private readonly categoriesRepository: Repository<Categories>
    ) { }

    async findCategoryByName(category: string) {
        const foundCategory = this.categoriesRepository.findOne({
            where: { name: category }
        })

        if (!foundCategory) {
            throw new Error(`Category ${category} not found`)
        }

        return foundCategory
    }


    async seedProducts(){
        const existingProductNames = (await this.productsRepository.find()).map(product => product.name)

        for (const productData of productsMock) {
            if(!existingProductNames.includes(productData.name)){
                const product = new Products()
                product.name = productData.name
                product.description = productData.description
                product.price = productData.price
                product.stock = productData.stock
                product.category = await this.findCategoryByName(productData.category)
                await this.productsRepository.save(product)
            }
        }
    }
}