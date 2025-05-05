import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../entities/users.entity";
import { Repository } from "typeorm";


@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>) { }


    async getUsersService(page: number, limit: number) {
        const user = await this.usersRepository.find({
            skip: (page - 1) * limit,
            take: limit,
            select: ['id', 'email', 'name', 'address', 'phone', 'country', 'city', 'admin'],
        })

        return user
    }

    async getUserByIdService(id: string) {

        const user = await this.usersRepository.findOne({
            where: { id },
            select: ['id', 'email', 'name', 'address', 'phone', 'country', 'city'],
            relations: ['orders']
        })

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
            return null
        }

        Object.assign(existingUser, user)

        return await this.usersRepository.save(existingUser)
    }

    async deleteUserService(id: string) {
        const userToDelete = await this.usersRepository.findOne({ where: { id } })
        await this.usersRepository.delete(id)
        return userToDelete
    }

    async findUserByEmailService(email: string) {
        return await this.usersRepository.findOne({
            where: { email }
        })
    }
}