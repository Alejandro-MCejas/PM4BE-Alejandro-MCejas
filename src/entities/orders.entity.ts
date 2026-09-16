import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { OrderDetails } from "./orderDetails.entity";


@Entity({name: 'orders'})
export class Orders {

    @PrimaryGeneratedColumn('uuid')
    id: string 

    @ManyToOne(() => Users, user => user.orders)
    user: Users

    @Column({type: 'date'})
    date: Date

    @OneToOne(() => OrderDetails, orderDetail => orderDetail.order)
    orderDetails: OrderDetails
}