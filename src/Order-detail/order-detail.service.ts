import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from '../entities/orderDetails.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateOrderDetailDto } from './dto/createOrderDetail.dto';

@Injectable()
export class OrderDetailService {
    constructor(@InjectRepository(OrderDetails) private readonly orderDetailRepository: Repository<OrderDetails>) { }

    async createOrderDetailService(orderDetail: CreateOrderDetailDto, manager?: EntityManager) {
        const repository = manager ? manager.getRepository(OrderDetails) : this.orderDetailRepository

        const newOrderDetail = await repository.save(
            repository.create(orderDetail)
        )

        return newOrderDetail
    }


    async getOrderDetailByOrderIdService(orderId: string) {
        const orderDetail = await this.orderDetailRepository.findOne({
            where: { order: { id: orderId } },
            relations: ['products']
        })

        if (!orderDetail) {
            throw new NotFoundException('Los detalles de la orden no existen')
        }

        return orderDetail
    }
}
