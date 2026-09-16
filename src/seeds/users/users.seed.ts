import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";
import { usersMock } from "./users-mock";
import * as bcrypt from 'bcryptjs'


@Injectable()
export class UsersSeed {
    constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>) { }

    async seedUsers() {
        const existingUsersCount = await this.usersRepository.count();

        if (existingUsersCount > 0) {
            return;
        }

        for (const user of usersMock) {
            
            if (!user.email || !user.password) {
                throw new Error('Seed user credentials are not configured');
            }

            const hashedPassword = await bcrypt.hash(user.password, 10);

            await this.usersRepository.save({
                ...user,
                password: hashedPassword
            });
        }
    }
}