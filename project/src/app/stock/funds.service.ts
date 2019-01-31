import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NotificatorService } from '../core/notificator.service';
import { FundsHttpService } from './fundsHTTP.service';
import { ClientService } from '../managerOverview/client/client.service';
import { ModalDTO } from '../models/modal.model';
import { UserInfoDTO } from '../models/user-info.model';
import { Client } from '../managerOverview/client/models/client.model';
import { DataService } from '../managerOverview/client/data.service';

@Injectable()
export class FundsService {
    public user = new BehaviorSubject<object>({});
    clientId: string;
    
    constructor(
        private notificationService: NotificatorService,
        private fundsHttpService: FundsHttpService,
        private clientService: ClientService,
        private readonly dataService: DataService,
    ) { }

    clientToManageId = this.dataService.currentData.subscribe(client => {
        this.clientId = client.id;
    });

    substractFund(modal: ModalDTO) {
        const clientCred = {
            id: this.clientId,
            amount: modal.total
        };
        this.clientService.getClient(clientCred.id).subscribe(
            (response: Client) => {
                if (response.funds.currentamount < clientCred.amount) {
                    return this.notificationService.error('Transaction failed due to not enough money',);
                }
                this.fundsHttpService.substractFund(clientCred).subscribe();
                this.notificationService.success('Payed successfully');
                this.user.next(response);
            }
        );
    }
}