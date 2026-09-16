import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "src/entities/orders.entity";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { UsersService } from "src/Users/users.service";
import { ProductsService } from "src/Products/products.service";
import { CreateOrderDetailDto } from "src/Order-detail/dto/createOrderDetail.dto";
import { OrderDetailService } from "src/Order-detail/order-detail.service";
import { CurrentUser } from "src/types/current-user.type";
import { UserRole } from "src/Users/enum/role.enum";


@Injectable()
export class OrdersService {
    constructor(@InjectRepository(Orders) private readonly ordersRepository: Repository<Orders>,
        private readonly usersService: UsersService,
        private readonly productsService: ProductsService,
        private readonly orderDetailService: OrderDetailService
    ) { }


    async addOrder(order: CreateOrderDto, userId: string) {

        const { products } = order

        const user = await this.usersService.getUserByIdService(userId)

        const productsWithStock = await this.productsService.getProductsWithStockService(products)

        if (productsWithStock.length === 0) {
            throw new NotFoundException(
                'No hay stock en ninguno de los productos recibidos'
            )
        }

        if (productsWithStock.length < products.length) {
            throw new NotFoundException(
                'No hay stock en algunos de los productos recibidos'
            )
        }

        return await this.ordersRepository.manager.transaction(
            async (manager) => {

                const newOrder = await manager.getRepository(Orders).save(
                    manager.getRepository(Orders).create({
                        user,
                        date: new Date()
                    })
                )

                for (const product of productsWithStock) {
                    await this.productsService.reduceProductStockService(
                        product.id,
                        manager
                    )
                }

                const total = await this.calculateTotal(productsWithStock)

                const orderDetail = new CreateOrderDetailDto()

                orderDetail.price = total
                orderDetail.order = newOrder
                orderDetail.products = productsWithStock

                const newOrderDetail = await this.orderDetailService.createOrderDetailService(orderDetail, manager)

                return {
                    order: {
                        id: newOrder.id,
                        date: newOrder.date,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    },
                    price: newOrderDetail.price,
                    orderDetailId: newOrderDetail.id
                }
            }
        )
    }

    private async calculateTotal(products: Array<{ id: string, price: number, stock: number }>) {
        let total = 0;

        for (const product of products) {
            total += Number(product.price)

        }

        return total
    }

    async getOrder(orderId: string, currentUser: CurrentUser) {
        const order = await this.ordersRepository.findOne({
            where: { id: orderId },
            relations: ['user']
        })

        if (!order) {
            throw new NotFoundException('La orden no existe')
        }

        const isAdmin = currentUser.roles === UserRole.ADMIN
        const isOwnOrder = order.user.id === currentUser.id

        if (!isAdmin && !isOwnOrder) {
            throw new ForbiddenException('No tienes permisos para consultar esta orden')
        }


        const orderDetail = await this.orderDetailService.getOrderDetailByOrderIdService(order.id)

        return {
            order: {
                id: order.id,
                date: order.date,
                user: {
                    id: order.user.id,
                    name: order.user.name,
                    email: order.user.email
                }
            },
            orderDetail: orderDetail.products
        }
    }

    async deleteOrderService(orderId: string) {
        const order = await this.ordersRepository.findOne({
            where: { id: orderId }
        })

        if (!order) {
            throw new NotFoundException('La orden no existe')
        }

        await this.ordersRepository.delete(orderId)

        return {
            message: `La orden con el id ${order.id} ha sido eliminada`
        }
    }
}