import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";
import { Products } from "./products.entity";


@Entity({ name: 'orderDetails' })
export class OrderDetails {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number

    @OneToOne(() => Orders, order => order.orderDetails, { onDelete: 'CASCADE' })
    @JoinColumn()
    order: Orders

    @ManyToMany(() => Products, product => product.orderDetails, { onDelete: 'CASCADE' })
    products: Products[]
}