import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { OrderService } from '../order.service';
import { Order } from '../order.model';
import { NgForm } from '@angular/forms';

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
  order: Order = {
    id: 0,
    name: '',
    phone: '',
    email: '',
    address: this.orderService.getAddress(),
    flatNr: '',
    floor: '',
    paymentMethod: '',
    comment: '',
    orderItems: [],
    fullPrice: 0,
    orderStatus: 'pending'
  };

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
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  submitOrder(form: NgForm) {
    this.order.id = this.getRandomInt(1, 10000);
    this.order.name = form.value.name;
    this.order.phone = form.value.phone;
    this.order.email = form.value.email;
    this.order.flatNr = form.value.flat;
    this.order.floor = form.value.floor;
    this.order.paymentMethod = form.value.payment;
    this.order.comment = form.value.comment;
    this.order.orderItems =  this.orderService.getOrder();
    this.order.fullPrice = this.orderService.getFullPrice();
    this.orderService.addOrder(this.order);
    this.dialogRef.close();
  }
}
