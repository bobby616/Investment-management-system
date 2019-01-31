import { UsersService } from "src/common/core/services/users.service";
import { OrderService } from "src/common/core/services/order.service";
import { CompaniesService } from "src/common/core/services/companies.service";
import { FundsService } from "src/common/core/services/funds.service";
import { Controller, Get, Post, Body, ValidationPipe, Param } from "@nestjs/common";
import { IndustriesService } from "src/common/core/services/industry.service";
import { IndustryDTO } from "src/models/industry/industry.dto";
import { IndustryUpdateDTO } from "src/models/industry/industryUpdate.dto";
import { OrderDTO } from "src/models/order/order.dto";
import { CloseOrderDTO } from "src/models/order/closeOrder.dto";

@Controller('orders')
export class OrdersController {

    constructor(
        private readonly usersService: UsersService,
        private readonly ordersService: OrderService,
        private readonly industryService: IndustriesService,
    ) { }

    @Post('/create')
    async createOrder(@Body() order: OrderDTO) {
        return this.ordersService.createOrder(order);
    }

    @Get('/all')
    async getAllOrders(){
        return this.ordersService.getOrdersAll();
    }

    @Get('/client/:id')
    async getOrdersByClient(@Param('id') id: string){
        return this.ordersService.getOrdersByClient(id);
    }

    @Post('/close')
    async closeOrderByOrderID(@Body() order: CloseOrderDTO) {
        return this.ordersService.closeOrder(order);
    }

    @Get('/getClosed')
    async getClosedOrders(@Body() id: string){
        return this.ordersService.getClosedOrders(id);
    }

    @Get('/getOpen')
    async getOpenOrders(@Body() id: string){
        return this.ordersService.getOpenOrders(id);
    }

    @Get('/Interval')
    async getInterval(@Body() date1: Date, date2: Date){
        return this.ordersService.getOrdersInInterval(date1, date2);
    }

}
