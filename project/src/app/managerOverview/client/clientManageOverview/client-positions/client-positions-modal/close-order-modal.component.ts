import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-close-order-modal',
    templateUrl: './close-order-modal.component.html',
    styleUrls: ['./close-order-modal.component.css'],
})

@Injectable()
export class CloseOrderModalComponent implements OnInit {
    private openPrice: number;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
    ngOnInit(): void {
        this.openPrice = +this.data.openPrice;
    }
    getDialogInfo(close: boolean) {
        return close;
    }
}
