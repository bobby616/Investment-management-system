import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
    private buyPrice: number;
    private sellPrice: number;
    private price: number;
    private units: number;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
    ngOnInit(): void {
        this.buyPrice = +this.data.buyprice;
        this.sellPrice = +this.data.sellprice;
    }
    getDialogInfo() {
        const total = (this.units * this.price).toFixed(2);
        const direction = this.price > this.sellPrice ? 'Buy' : 'Sell';
        return {
            price: this.price,
            units: this.units,
            total,
            direction,
            openDate: new Date(),
        };
    }
}
