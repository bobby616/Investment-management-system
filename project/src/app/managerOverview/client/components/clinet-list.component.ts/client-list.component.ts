import { OnInit, Component, Output, EventEmitter } from '@angular/core';
import { Client } from '../../models/client.model';
import { ClientService } from '../../client.service';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { Subscription } from 'rxjs';

@Component(
    {
        selector: 'app-client-list',
        styleUrls: ['./client-list.component.css'],
        templateUrl: './client-list.component.html'
    }
)

export class ClientListComponent implements OnInit {
    pageTitle = 'Clients list';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    errorMessage = '';
    filteredClients: Client[] = [];
    clients: Client[] = [];
    client: Client;
    ClientSubscription: Subscription;
    clientsSubscription: Subscription;
    constructor(
        private readonly clientService: ClientService,
        private readonly router: Router,
        private readonly dataService: DataService) {

    }

    _listFilter = '';
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredClients = this.listFilter ? this.performFilter(this.listFilter) : this.clients;
    }

    

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }

    performFilter(filterBy: string): Client[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.clients.filter((client: Client) =>
            client.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.ClientSubscription = this.dataService.currentData.subscribe(Client => this.client = Client)
        this.clientsSubscription = this.clientService.getClients().subscribe(
            clients => {
                this.clients = clients;
                this.filteredClients = this.clients;
            },
            error => this.errorMessage = <any>error
        );
    }

    ngOnDestroy(): void {
        if(this.clientsSubscription){
            this.clientsSubscription.unsubscribe();
        }
        if(this.ClientSubscription){
            this.ClientSubscription.unsubscribe();        }
    }
    manage(id): void {
        this.clientService.getClient(id).subscribe(client => {
            this.client = client;
            setTimeout(() => {
                this.dataService.changeIsClient(this.client);
                this.router.navigateByUrl(`/manager/clients/${id}`);
               }, 10)
        })
    }
}