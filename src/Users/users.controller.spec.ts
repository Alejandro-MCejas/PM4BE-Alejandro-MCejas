import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UserRole } from "./enum/role.enum";
import { Users } from "src/entities/users.entity";
import { AuthGuard } from "src/Auth/AuthGuard.guard";
import { RoleGuard } from "./RoleGuard.guard";

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;

    const mockUser: Users = {
        id: 'asvf-asdf-asdf-asdf',
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

        const mockUsersService: Partial<UsersService> = {
            getUsersService: jest.fn().mockResolvedValue([mockUser])
        };

        const mockAuthGuard = {
            canActivate: jest.fn(() => true),
        };

        const mockRoleGuard = {
            canActivate: jest.fn(() => true),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: mockUsersService
                }
            ],
        })
            .overrideGuard(AuthGuard)
            .useValue(mockAuthGuard)
            .overrideGuard(RoleGuard)
            .useValue(mockRoleGuard)
            .compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return users', async () => {
        const result = await controller.getUsersController(1, 5);

        expect(result).toEqual([mockUser]);
    });
});