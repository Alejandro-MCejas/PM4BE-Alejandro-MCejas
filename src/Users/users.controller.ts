import { Body, Controller, Delete, ForbiddenException, Get, Param, ParseUUIDPipe, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { AuthGuard } from "src/Auth/AuthGuard.guard";
import { RoleGuard } from "./RoleGuard.guard";
import { Roles } from "src/decorators/roles.decorator";
import { UserRole } from "./enum/role.enum";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { RequestUser } from "src/decorators/CurrentUser.decorator";
import { CurrentUser } from "src/types/current-user.type";
import { UserResponseDto } from "./dto/UserResponseDto.dto";


@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    @ApiOkResponse({
        type: UserResponseDto,
        isArray: true
    })
    async getUsersController(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
        return await this.usersService.getUsersService(page, limit)
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @ApiOkResponse({
        type: UserResponseDto
    })
    async getUserByIdController(@Param('id', new ParseUUIDPipe()) id: string, @RequestUser() currentUser: CurrentUser) {
        const isAdmin = currentUser.roles === UserRole.ADMIN

        const isOwnUser = currentUser.id === id

        if (!isAdmin && !isOwnUser) {
            throw new ForbiddenException('No tienes permisos para consultar este usuario')
        }

        return await this.usersService.getUserByIdService(id)
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async updateUserController(@Param('id', new ParseUUIDPipe()) id: string, @Body() user: UpdateUserDto, @RequestUser() currentUser: CurrentUser) {
        const isAdmin = currentUser.roles === UserRole.ADMIN

        const isOwnUser = currentUser.id === id

        if (!isAdmin && !isOwnUser) {
            throw new ForbiddenException('No tienes permiso para modificar este usuario')
        }

        const updatedUser = await this.usersService.updateUserService(id, user)

        return { id: updatedUser.id }
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteUserController(@Param('id', new ParseUUIDPipe()) id: string, @RequestUser() currentUser: CurrentUser) {
        const isAdmin = currentUser.roles === UserRole.ADMIN

        const isOwnUser = currentUser.id === id

        if (!isAdmin && !isOwnUser) {
            throw new ForbiddenException('No tienes permiso para eliminar este usuario')
        }

        const deletedUser = await this.usersService.deleteUserService(id)

        return {
            message: `El usuario con el id ${deletedUser.id} ha sido eliminado`
        }
    }
}