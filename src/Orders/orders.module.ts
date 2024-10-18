import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "src/entities/orders.entity";
import { Users } from "src/entities/users.entity";
import { OrderDetails } from "src/entities/orderDetails.entity";
import { Products } from "src/entities/products.entity";
import { UsersModule } from "src/Users/users.module";
import { ProductsModule } from "src/Products/products.module";
import { UsersService } from "src/Users/users.service";
import { ProductsService } from "src/Products/products.service";
import { OrderDetailService } from "../Order-detail/order-detail.service";
import { SharedModule } from "src/shared-module/shared-module.module";
import { CategoriesModule } from "src/categories/categories.module";




@Module({
    imports: [TypeOrmModule.forFeature([Orders, Users, OrderDetails, Products]),
        SharedModule,
        UsersModule,
        ProductsModule, 
        CategoriesModule
    ],
    controllers: [OrdersController],
    providers: [OrdersService, UsersService, ProductsService, OrderDetailService],
})

export class OrdersModule { }