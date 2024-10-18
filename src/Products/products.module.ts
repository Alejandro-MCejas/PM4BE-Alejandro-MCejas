import { Module } from '@nestjs/common'
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { SharedModule } from 'src/shared-module/shared-module.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
    imports: [TypeOrmModule.forFeature([Products]), SharedModule, CategoriesModule],
    controllers: [ProductsController],
    providers: [ProductsService, CloudinaryService],
    exports: [ProductsService]
})
export class ProductsModule{}