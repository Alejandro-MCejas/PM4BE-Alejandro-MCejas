import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { Users } from "src/entities/users.entity";
import { UserRole } from "./enum/role.enum";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

describe('UsersService', () => {
    let service: UsersService;
    let repository: Repository<Users>;

    const mockUser: Users = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Alejandro',
        email: 'hVJ9S@example.com',
        password: 'Password123@',
        phone: '9832892',
        country: 'Argentina',
        address: 'Cordoba 530',
        city: 'Cordoba',
        orders: [],
        admin: UserRole.USER
    };

    beforeEach(async () => {

        const mockUsersRepository = {
            find: jest.fn().mockResolvedValue([mockUser])
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(Users),
                    useValue: mockUsersRepository
                }
            ]
        }).compile();

        service = module.get<UsersService>(UsersService);
        repository = module.get<Repository<Users>>(
            getRepositoryToken(Users)
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return users', async () => {
        const result = await service.getUsersService(1, 10);

        expect(result).toEqual([mockUser]);
    });

});