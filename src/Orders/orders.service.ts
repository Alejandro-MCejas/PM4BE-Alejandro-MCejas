import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "src/entities/orders.entity";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { UsersService } from "src/Users/users.service";
import { ProductsService } from "src/Products/products.service";
import { CreateOrderDetailDto } from "src/Order-detail/dto/createOrderDetail.dto";
import { OrderDetailService } from "src/Order-detail/order-detail.service";


@Injectable()
export class OrdersService {
    constructor(@InjectRepository(Orders) private readonly ordersRepository: Repository<Orders>,
        private readonly usersService: UsersService,
        private readonly productsService: ProductsService,
        private readonly orderDetailService: OrderDetailService
    ) { }


    async addOrder(order: CreateOrderDto) {
        const { userId, products } = order
        const user = await this.usersService.getUserByIdService(userId)


        const productsWithStock = await this.productsService.getProductsWithStockService(products)


        if (productsWithStock.length === 0) {
            throw new Error('No hay stock en ninguno de los productos recibidos')
        }

        if (productsWithStock.length < products.length) {
            throw new Error('No hay stock en algunos de los productos recibidos')
        }

        const structureOfOrder = {
            user,
            date: new Date()
        }

        const newOrder = await this.ordersRepository.save(
            this.ordersRepository.create(structureOfOrder)
        )



        for (const product of productsWithStock) {
            await this.productsService.reduceProductStockService(product.id)
        }

        const total = await this.calculateTotal(productsWithStock)


        const orderDetail = new CreateOrderDetailDto()
        orderDetail.price = total
        orderDetail.order = newOrder
        orderDetail.products = productsWithStock


        const newOrderDetail = await this.orderDetailService.createOrderDetailService(orderDetail)

        const orderResponse = {
            order: {
                id: newOrder.id,
                date: newOrder.date,
                user: newOrder.user
            },
            price: newOrderDetail.price,
            orderDetailId: newOrderDetail.id
        }

        return orderResponse
    }

    private async calculateTotal(products: Array<{ id: string, price: number, stock: number }>) {
        let total: number = 0;
        for (const product of products) {
            total += Number(product.price)

        }

        return total
    }

    async getOrder(orderId: string) {
        const order = await this.ordersRepository.findOneBy({ id: orderId })

        if (!order) {
            throw new Error('La orden no existe')
        }


        const orderDetail = await this.orderDetailService.getOrderDetailByOrderIdService(order.id, ['products'])

        const orderResponse = {
            order,
            orderDetail: orderDetail.products
        }

        return orderResponse
    }

    async deleteOrderService(orderId: string) {
        const order = await this.ordersRepository.findOne({ where: { id: orderId } })

        if (!order) {
            throw new Error('La orden no existe')
        }

        await this.ordersRepository.delete(order)

        return order
    }
}