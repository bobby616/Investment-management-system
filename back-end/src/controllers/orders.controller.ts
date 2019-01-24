import { UsersService } from "src/common/core/services/users.service";
import { OrderService } from "src/common/core/services/order.service";
import { CompaniesService } from "src/common/core/services/companies.service";
import { FundsService } from "src/common/core/services/funds.service";
import { Controller, Get, Post, Body, ValidationPipe, Param } from "@nestjs/common";
import { IndustriesService } from "src/common/core/services/industry.service";
import { IndustryDTO } from "src/models/industry/industry.dto";
import { IndustryUpdateDTO } from "src/models/industry/industryUpdate.dto";
import { OrderDTO } from "src/models/order/order.dto";

@Controller('orders')
export class OrdersController {

    constructor(
        private readonly usersService: UsersService,
        private readonly ordersService: OrderService,
        private readonly industryService: IndustriesService,
    ) { }

    @Post('/create/:id')
    async createOrder(@Body(new ValidationPipe({
        transform: true,
        whitelist: true,
    })) order: OrderDTO, clientId: string) {
        return this.ordersService.createOrder(clientId, order);
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
    async closeOrderByOrderID(@Body() orderId: string, clientId: string) {
        return this.ordersService.closeOrder(orderId);
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
