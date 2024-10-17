import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({name: 'categories'})
export class Categories{

    @ApiProperty({
        description: 'The id of the category'
    })
    @PrimaryGeneratedColumn('uuid')
    id:string

    @ApiProperty({
        description: 'The name of the category'
    })
    @Column({type: 'varchar', length: 50, nullable: false})
    name: string

    @ApiProperty({
        description: 'The products of the category'
    })
    @OneToMany(() => Products, product => product.category)
    products: Products[]

}