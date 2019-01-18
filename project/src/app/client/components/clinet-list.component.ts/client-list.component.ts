import { OnInit, Component } from '@angular/core';
import { Client } from '../../models/client.model';
import { ClientService } from '../../client.service';

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

    constructor(
        private clientService: ClientService) {

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
        this.clientService.getClients().subscribe(
            clients => {
                this.clients = clients;
                this.filteredClients = this.clients;
            },
            error => this.errorMessage = <any>error
        );
    }

}