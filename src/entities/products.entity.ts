import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "./categories.entity";
import { OrderDetails } from "./orderDetails.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({ name: 'products' })
export class Products {

    @ApiProperty({
        description: 'The id of the product'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({
        description: 'The name of the product'
    })
    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string

    @ApiProperty({
        description: 'The description of the product'
    })
    @Column({ type: 'text', nullable: false })
    description: string

    @ApiProperty({
        description: 'The price of the product'
    })
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number

    @ApiProperty({
        description: 'The stock of the product'
    })
    @Column({ type: 'int', nullable: false })
    stock: number

    @ApiProperty({
        description: 'The image of the product'
    })
    @Column({ type: 'varchar', default: '' })
    imgUrl: string

    @ApiProperty({
        description: 'The category of the product'
    })
    @ManyToOne(() => Categories, category => category.products) 
    category: Categories

    @ApiProperty({
        description: 'The orderDetails of the product'
    })
    @ManyToMany(() => OrderDetails, orderDetail => orderDetail.products)
    @JoinTable()
    orderDetails: OrderDetails[]
}