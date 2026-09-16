import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";
import { UserRole } from "../Users/enum/role.enum";


@Entity({ name: 'users' })
export class Users {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string

    @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
    email: string

    @Column({ type: 'varchar', nullable: false })
    password: string

    @Column({ type: 'varchar' })
    phone: string

    @Column({ type: 'varchar', length: 50 })
    country: string

    @Column({ type: 'text' })
    address: string

    @Column({ type: 'varchar', length: 50 })
    city: string

    @OneToMany(() => Orders, order => order.user)
    orders: Orders[]

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    admin: UserRole
}