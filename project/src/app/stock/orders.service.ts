import { NotificatorService } from '../core/notificator.service';
import { Injectable } from '@angular/core';
import { StocksService } from './stock.service';
import { FundsService } from './funds.service';
import { ModalDTO } from '../models/modal.model';
import { CreateOrderDTO } from '../models/create-order.model';
import { OrdersHttpService } from './ordersHTTP.service';
import { CompanyDTO } from '../models/company.model';
import { UserInfoDTO } from '../models/user-info.model';
import { DataService } from '../managerOverview/client/data.service';
import { Client } from '../managerOverview/client/models/client.model';
import { take } from 'rxjs/operators';

@Injectable()
export class OrdersService {
    client: string;

    constructor(
        private notificationService: NotificatorService,
        private orderHttpService: OrdersHttpService,
        private stockService: StocksService,
        private fundsService: FundsService,
        private readonly dataService: DataService,
    ) { }

    clientToManageId = this.dataService.currentData.subscribe(client => {
        this.client = client.id;
    });

    saveOrder(result: ModalDTO, companyAbbr) {
        this.stockService.retrieveCompanyInfo({ abbr: companyAbbr }).subscribe((companyInfo: CompanyDTO) => {
            const order: CreateOrderDTO = {
                openDate: result.openDate,
                openPrice: result.price,
                units: result.units,
                clientId: this.client,
                companyId: companyInfo.id,
                direction: result.direction
            };
            /* this.orderHttpService.createOrder(order).subscribe(); */
            this.fundsService.user.subscribe((response: Client) => {
                if (Object.keys(response).length !== 0 && response.funds.currentamount > result.total) {
                    this.orderHttpService.createOrder(order).pipe(ta,ke(1)).subscribe();
                    setTimeout(() => {
                        this.notificationService.success('Order is successful');
                    }, 3500);
                }
            });
        });
    }
}
