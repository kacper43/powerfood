import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }
  private order: any = [];

  add(name: string, size: string, price: number) {
    this.order.push({name, size, price});
  }

  getOrder() {
    return this.order;
  }
}
