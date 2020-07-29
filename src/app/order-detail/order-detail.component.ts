import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  coupons = [];
  activeCoupon = 1;
  showGoodCoupon = false;
  fullPrice: number;
  codeMessage = '';
  priceAfterCoupon: number;

  constructor(private dialogRef: MatDialogRef<OrderDetailComponent>, public orderService: OrderService) { }

  ngOnInit() {
    this.coupons = this.orderService.getCoupons();
    this.fullPrice = this.orderService.getFullPrice();
    console.log(this.coupons[0].code);
    this.priceAfterCoupon = this.fullPrice;
  }

  checkCode(code) {
    console.log(code);
    for (let c of this.coupons) {
      if (code === c.code) {
        this.activeCoupon = c.percentage;
        this.codeMessage = 'Podano poprawny kod. Otrzymujesz ' + this.activeCoupon + '% zniżki';
        this.priceAfterCoupon = this.fullPrice - (this.fullPrice * (this.activeCoupon / 100));
        this.priceAfterCoupon = parseFloat(this.priceAfterCoupon.toFixed(2));
        this.showGoodCoupon = true;
        return 0;
      } else {
        this.activeCoupon = 1;
        this.codeMessage = 'Podano błędny kod.';
        this.showGoodCoupon = false;
      }
    }
  }
  submitOrder() {
    this.dialogRef.close();
    alert('Tu będzie widok dla klientów z godziną dostawy itp.');
  }
}
