import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/entities/categories.entity";
import { In, Repository } from "typeorm";
import { categoriesMock } from "./categories-mock";


@Injectable()
export class CategoriesSeed {
    constructor(@InjectRepository(Categories) private readonly categoriesRepository: Repository<Categories>) { }

    async seedCategories() {
        const existingCategoriesCount = await this.categoriesRepository.count()

        if (existingCategoriesCount > 0) {
            return
        }

        for (const categoryName of categoriesMock) {
            const category = new Categories();
            category.name = categoryName;

            await this.categoriesRepository.save(category);
        }
    }
}