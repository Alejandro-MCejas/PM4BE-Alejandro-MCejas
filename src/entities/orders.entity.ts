import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { OrderDetails } from "./orderDetails.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({name: 'orders'})
export class Orders {

    @ApiProperty({
        description: 'The id of the order'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string 

    @ApiProperty({
        description: 'The user of the order'    
    })
    @ManyToOne(() => Users, user => user.orders)
    user: Users

    @ApiProperty({
        description: 'The date of the order'
    })
    @Column({type: 'date'})
    date: Date

    @ApiProperty({
        description: 'The orderDetails of the order'
    })
    @OneToOne(() => OrderDetails, orderDetail => orderDetail.order)
    orderDetails: OrderDetails
}