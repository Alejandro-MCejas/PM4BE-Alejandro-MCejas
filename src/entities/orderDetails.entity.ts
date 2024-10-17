import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";
import { Products } from "./products.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({ name: 'orderDetails' })
export class OrderDetails {

    @ApiProperty({
        description: 'The id of the orderDetails'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({
        description: 'The price of the orderDetails'
    })
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number

    @ApiProperty({
        description: 'The id of the order'
    })
    @OneToOne(() => Orders, order => order.orderDetails)
    @JoinColumn()
    order: Orders

    @ApiProperty({
        description: 'The id of the products in the order'
    })
    @ManyToMany(() => Products, product => product.orderDetails)
    products: Products[]
}