import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NotificatorService } from '../core/notificator.service';
import { FundsHttpService } from './fundsReques.service';
import { ClientService } from '../managerOverview/client/client.service';
import { ModalDTO } from '../models/modal.model';
import { UserInfoDTO } from '../models/user-info.model';
import { Client } from '../managerOverview/client/models/client.model';
import { DataService } from '../managerOverview/client/data.service';
import { AddSubstractDTO } from '../models/add-substract.motel';
import { StorageService } from '../core/storage.service';

@Injectable()
export class FundsService {
    constructor(
        private notificator: NotificatorService,
        private fundsHttpService: FundsHttpService,
        private clientService: ClientService,
        private readonly dataService: DataService,
        private readonly localStorage: StorageService,
    ) { }

    clientId: string = this.localStorage.getItem('clientId')

    public substractFund(modal: ModalDTO) {
        const clientCred = {
            id: this.clientId,
            amount: modal.total
        };
        this.clientService.getClient(clientCred.id).subscribe(
            (currentClient: Client) => {
                if (currentClient.funds.currentamount < clientCred.amount) {
                    return this.notificator.error('Transaction failed due to insufficient funds');
                }
                this.fundsHttpService.substractFund(clientCred).subscribe();
            }
        );
    }

    public updateFunds(clientCred: AddSubstractDTO): any {
        this.fundsHttpService.addFund(clientCred);
    }
}