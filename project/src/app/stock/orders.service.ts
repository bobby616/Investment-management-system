import { NotificatorService } from '../core/notificator.service';
import { Injectable } from '@angular/core';
import { StocksService } from './stock.service';
import { FundsService } from './funds.service';
import { ModalDTO } from '../models/modal.model';
import { CreateOrderDTO } from '../models/create-order.model';
import { OrdersHttpService } from './ordersHTTP.service';
import { CompanyDTO } from '../models/company.model';
import { UserInfoDTO } from '../models/user-info.model';

@Injectable()
export class OrdersService {
    constructor(
        private notificationService: NotificatorService,
        private orderHttpService: OrdersHttpService,
        private stockService: StocksService,
        private fundsService: FundsService,
    ) { }
    saveOrder(result: ModalDTO, companyAbbr) {
        this.stockService.retrieveCompanyInfo({ abbr: companyAbbr }).subscribe((companyInfo: CompanyDTO) => {
            const order: CreateOrderDTO = {
                openDate: result.openDate,
                openPrice: result.price,
                units: result.units,
                clientEmail: localStorage.getItem('client_email'),
                companyId: companyInfo.id,
                direction: result.direction
            };
            this.fundsService.user.subscribe((response: UserInfoDTO) => {
                if (Object.keys(response).length !== 0 && response.funds.currentamount > result.total) {
                    this.orderHttpService.createOrder(order).subscribe();
                    setTimeout(() => {
                        this.notificationService.success('Order is successful');
                    }, 3500);
                }
            });
        });
    }
}
