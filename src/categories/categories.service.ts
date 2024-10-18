import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Categories) private readonly categoriesRepository: Repository<Categories>) { }

    async getCategoriesService() {
        return await this.categoriesRepository.find()
    }

    async getCategoryByNameService(name: string) {
        return await this.categoriesRepository.findOne({ where: { name } })
    }

    async createCategoryService(category: { name: string }) {
        return await this.categoriesRepository.save(
            this.categoriesRepository.create(category)
        )
    }
}
