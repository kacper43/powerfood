import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/order.service';
import { Order } from 'src/app/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  ordersList: Array<Order> = [];
  newOrderCheck;
  newOrders = false;
  audio = new Audio('./got-it-done.ogg');
  constructor(public orderService: OrderService) { }

  ngOnInit() {
    this.audio.play();
    const date = new Date();
    const currentDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    this.ordersList = this.orderService.getOrders();
    this.newOrderCheck = setInterval(() => {
      this.checkOrders();
    }, 2000);
  }
  ngOnDestroy() {
    if (this.newOrderCheck) {
      clearInterval(this.newOrderCheck);
    }
  }

  checkOrders() {
    for (let order of this.ordersList) {
      if (order.orderStatus === 'pending') {
        this.audio.play();
      }
    }
  }

  playsound() {
    this.audio.pause();
  }
}
