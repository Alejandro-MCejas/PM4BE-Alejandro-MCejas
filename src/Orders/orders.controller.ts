import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Res, UseGuards} from "@nestjs/common";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { OrdersService } from "./orders.service";
import { AuthGuard } from "src/Auth/AuthGuard.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Response } from "express";

@ApiBearerAuth()
@ApiTags('Orders')
@Controller('orders')
export class OrdersController { 
    constructor(private readonly ordersService: OrdersService){}
        
    @Post()
    @UseGuards(AuthGuard)
    async createOrder(@Body() order: CreateOrderDto) {
        return await this.ordersService.addOrder(order)

    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getOrder(@Param('id', new ParseUUIDPipe()) id: string){
        return await this.ordersService.getOrder(id)
    }

    @Delete(':id')
    async deleOrderController(@Param('id', new ParseUUIDPipe()) id: string, @Res() res: Response){

        const deletedOrder = await this.ordersService.deleteOrderService(id)

        return res.status(200).json({message: `La orden con el id ${deletedOrder.id} ha sido eliminada`})
    }
}