import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(public orderService: OrderService) { }
  cart: any;
  quantity: number;
  ngOnInit() {
    this.cart = this.orderService.getOrder();
    this.quantity = 1;
  }
  getOrder() {
  this.cart = this.orderService.getOrder();
  console.log(this.cart);
  }
}
