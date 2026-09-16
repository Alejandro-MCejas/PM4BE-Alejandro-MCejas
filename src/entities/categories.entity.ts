import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";


@Entity({ name: 'categories' })
export class Categories {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string

    @OneToMany(() => Products, product => product.category)
    products: Products[]

}