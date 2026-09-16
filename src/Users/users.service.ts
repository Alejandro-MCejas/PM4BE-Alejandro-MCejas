import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../entities/users.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs'


@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>) { }


    async getUsersService(page: number, limit: number) {

        const users = await this.usersRepository.find({
            skip: (page - 1) * limit,
            take: limit,
            select: ['id', 'email', 'name', 'address', 'phone', 'country', 'city', 'admin'],
        })

        return users
    }

    async getUserByIdService(id: string) {

        const user = await this.usersRepository.findOne({
            where: { id },
            select: ['id', 'email', 'name', 'address', 'phone', 'country', 'city', 'admin'],
        })

        if (!user) {
            throw new NotFoundException('Usuario no encontrado')
        }

        return user
    }

    async createUserService(user: CreateUserDto) {
        return await this.usersRepository.save(
            this.usersRepository.create(user)
        )
    }

    async updateUserService(id: string, user: UpdateUserDto) {
        const existingUser = await this.usersRepository.findOne({ where: { id } })

        if (!existingUser) {
            throw new NotFoundException('Usuario no encontrado')
        }

        const userData = { ...user }

        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10)
        }

        Object.assign(existingUser, userData)

        return await this.usersRepository.save(existingUser)
    }

    async deleteUserService(id: string) {

        const userToDelete = await this.usersRepository.findOne({
            where: { id },
            select: ['id']
        })

        if (!userToDelete) {
            throw new NotFoundException('Usuario no encontrado')
        }

        await this.usersRepository.delete(id)

        return userToDelete
    }

    async findUserByEmailService(email: string) {

        return await this.usersRepository.findOne({
            where: { email }
        })
    }
}