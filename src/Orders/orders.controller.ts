import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { OrdersService } from "./orders.service";
import { AuthGuard } from "src/Auth/AuthGuard.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RequestUser } from "src/decorators/CurrentUser.decorator";
import { CurrentUser } from "src/types/current-user.type";
import { RoleGuard } from "src/Users/RoleGuard.guard";
import { Roles } from "src/decorators/roles.decorator";
import { UserRole } from "src/Users/enum/role.enum";

@ApiBearerAuth()
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    @UseGuards(AuthGuard)
    async createOrder(@Body() order: CreateOrderDto, @RequestUser() currentUser: CurrentUser) {
        return await this.ordersService.addOrder(order, currentUser.id)
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getOrder(@Param('id', new ParseUUIDPipe()) id: string, @RequestUser() currentUser: CurrentUser) {
        return await this.ordersService.getOrder(id, currentUser)
    }

    @Delete(':id')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async deleteOrderController(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.ordersService.deleteOrderService(id)
    }
}