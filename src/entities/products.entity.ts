import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "./categories.entity";
import { OrderDetails } from "./orderDetails.entity";


@Entity({ name: 'products' })
export class Products {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string

    @Column({ type: 'text', nullable: false })
    description: string

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number

    @Column({ type: 'int', nullable: false })
    stock: number

    @Column({ type: 'varchar', default: 'https://imageExample.com' })
    imgUrl: string

    @ManyToOne(() => Categories, category => category.products)
    category: Categories

    @ManyToMany(() => OrderDetails, orderDetail => orderDetail.products)
    @JoinTable()
    orderDetails: OrderDetails[]
}