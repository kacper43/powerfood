import { Injectable } from '@angular/core';
import { OrderItem } from './orderItem.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }
  private order: OrderItem[] = [];
  private orderUpdated = new Subject<OrderItem[]>();
  private addressUpdated = new Subject<string>();
  distance: number;
  activeItem: OrderItem;
  googleAddress = 'Nie podano adresu';
  orderMinCost: number;
  private orderMinCostUpdated = new Subject<number>();
  fullPrice = 0;
  private fullPriceUpdated = new Subject<number>();
  coupons: Array<{code: string, percentage: number}> = [
    {
      code: 'zmmxncbvlaksfhewoo',
      percentage: 69
    },
    {
      code: 'bulibuli',
      percentage: 40
    },
    {
      code: 'traficar',
      percentage: 69
    }
  ];



  zones: Array<{distance: number, minCost: number}> = [
    {
      distance: 0.5,
      minCost: 15
    },
    {
      distance: 1,
      minCost: 20
    },
    {
      distance: 2,
      minCost: 25
    },
    {
      distance: 3,
      minCost: 35
    },
    {
      distance: 4,
      minCost: 40
    },
  ];

  getCoupons() {
    return this.coupons;
  }

  getZones() {
    return this.zones;
  }

  setDistance(dist) {
    this.distance = dist;
  }

  getDistance() {
    return this.distance;
  }

  setMinCost(cost) {
    this.orderMinCost = cost;
    this.orderMinCostUpdated.next(this.orderMinCost);
  }

  getMinCost() {
    return this.orderMinCost;
  }

  setAddress(address) {
    this.googleAddress = address;
    this.addressUpdated.next(this.googleAddress);
  }

  getMinCostUpdatedListener() {
    return this.orderMinCostUpdated.asObservable();
  }

  getAddressUpdatedListener() {
    return this.addressUpdated.asObservable();
  }
  getAddress() {
    return this.googleAddress;
  }

  add(orderItem) {
    this.order.push(orderItem);
    this.orderUpdated.next([...this.order]);
  }

  getOrder() {
    return this.order;
  }

  getOrderUpdatedListener() {
    return this.orderUpdated.asObservable();
  }

  deleteOrderItem(index) {
    console.log('index: ' + index);
    this.order.splice(index, 1);
    console.log(this.order);
    this.orderUpdated.next(this.order);
  }

  calcFullPrice() {
    this.fullPrice = 0;
    for (let orderItem of this.order) {
      this.fullPrice += (orderItem.price * orderItem.quantity);
    }
    this.fullPriceUpdated.next(this.fullPrice);
  }

  getFullPrice() {
    return this.fullPrice;
  }

  getFullPriceListener() {
    return this.fullPriceUpdated.asObservable();
  }


}
