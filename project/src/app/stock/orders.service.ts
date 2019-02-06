import { NotificatorService } from '../core/notificator.service';
import { Injectable } from '@angular/core';
import { StocksService } from './stock.service';
import { FundsService } from './funds.service';
import { ModalDTO } from '../models/modal.model';
import { CreateOrderDTO } from '../models/create-order.model';
import { OrdersHttpService } from './ordersRequest.service';
import { CompanyDTO } from '../models/company.model';
import { UserInfoDTO } from '../models/user-info.model';
import { DataService } from '../managerOverview/client/data.service';
import { Client } from '../managerOverview/client/models/client.model';
import { take } from 'rxjs/operators';
import { ClientService } from '../managerOverview/client/client.service';
import { CloseOrderDTO } from '../models/close-order.model';
import { StockDTO } from '../models/stock.dto';
import { StorageService } from '../core/storage.service';

@Injectable()
export class OrdersService {

    constructor(
        private notificationService: NotificatorService,
        private orderHttpService: OrdersHttpService,
        private stockService: StocksService,
        private fundsService: FundsService,
        private readonly dataService: DataService,
        private clientService: ClientService,
        private localStorage: StorageService
    ) { }

    client: string = this.localStorage.getItem('clientId')

    saveOrder(result: ModalDTO, companyAbbr) {
        this.stockService.getCompanyByAbbr({ abbr: companyAbbr }).subscribe((company: CompanyDTO) => {
            console.log(company)
            const order: CreateOrderDTO = {
                openDate: result.openDate,
                openPrice: result.price,
                units: result.units,
                clientId: this.client,
                companyId: company.id,
                direction: result.direction
            };
            this.clientService.getClient(this.client).subscribe((currentClient: Client) => {
                    if (currentClient.funds.currentamount > result.total) {
                        this.orderHttpService.createOrder(order).subscribe();
                    }
                    setTimeout(() => {
                        this.notificationService.success('Order is successful');
                    }, 10);
            });
        });
    }

    closeOrder(orderBody: CloseOrderDTO, CompanyAbbr) {
        this.stockService.getCompanyByAbbr({ abbr: CompanyAbbr }).subscribe((company: CompanyDTO) => {
            orderBody.companyId = company.id;
            this.stockService.getLastPricesForOneCompany(company.id).subscribe((prices: StockDTO) => {
                orderBody.closePrice = prices.startprice;
                this.orderHttpService.closeOrder(orderBody).subscribe((updatedOrder: any) => {
                    this.fundsService
                        .updateFunds({ id: this.client, amount: updatedOrder.result});
                        this.notificationService.success('Position closed');
                        window.location.reload();
                });
            });
        });
    }
}
