import { Orders } from "src/entities/orders.entity"
import { Products } from "src/entities/products.entity"

export class CreateOrderDetailDto {

    price: number

    order: Orders

    products: Products[]
}