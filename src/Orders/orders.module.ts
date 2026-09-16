import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "src/entities/orders.entity";
import { UsersModule } from "src/Users/users.module";
import { ProductsModule } from "src/Products/products.module";
import { SharedModule } from "src/shared-module/shared-module.module";
import { OrderDetailModule } from "src/Order-detail/order-detail.module";


@Module({
    imports: [TypeOrmModule.forFeature([Orders]),
        SharedModule,
        UsersModule,
        ProductsModule,
        OrderDetailModule
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
})

export class OrdersModule { }