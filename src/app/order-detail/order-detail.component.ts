import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { OrderService } from '../order.service';
import { Order } from '../order.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  generatedId: any;
  coupons = [];
  activeCoupon = 1;
  showGoodCoupon = false;
  fullPrice: number;
  codeMessage = ' ';
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

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);

  constructor(private dialogRef: MatDialogRef<OrderDetailComponent>,
              public orderService: OrderService, public database: AngularFirestore) { }

  ngOnInit() {
    this.coupons = this.orderService.getCoupons();
    this.fullPrice = this.orderService.getFullPrice();
    // console.log(this.coupons[0].code);
    this.priceAfterCoupon = this.fullPrice;
    this.generatedId = this.database.createId();
  }

  checkCode(code) {
   // console.log(code);
    for (const c of this.coupons) {
    //  console.log(code + ' ? ' + c.code);
      if (code === c.code) {
        this.activeCoupon = c.percentage;
        this.codeMessage = 'Podano poprawny kod. Otrzymujesz ' + this.activeCoupon + '% zniżki';
        this.priceAfterCoupon = this.fullPrice - (this.fullPrice * (this.activeCoupon / 100));
        this.priceAfterCoupon = parseFloat(this.priceAfterCoupon.toFixed(2));
        this.showGoodCoupon = true;
        return 1;
      } else {
        this.activeCoupon = 1;
        this.codeMessage = 'Podano błędny kod.';
        this.showGoodCoupon = false;
        this.priceAfterCoupon = this.fullPrice;

      }
    }
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  submitOrder(form: NgForm) {
    this.orderService.setCurrentDate();
    this.order.id = this.getRandomInt(1, 10000);
    this.order.name = form.value.name;
    this.order.phone = form.value.phone;
    this.order.email = form.value.email;
    this.order.flatNr = form.value.flat;
    this.order.floor = form.value.floor;
    this.order.paymentMethod = form.value.payment;
    this.order.comment = form.value.comment;
    this.order.orderItems =  this.orderService.getOrder();
    this.order.fullPrice = this.priceAfterCoupon;
    this.order.orderDate = this.orderService.getCurrentDate();
    // console.log(this.order.orderDate);
    this.order.orderTime = this.orderService.getCurrentTime();
    this.orderService.addOrder(this.order, this.generatedId);
    this.dialogRef.close();
  }
}
