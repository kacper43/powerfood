import { Injectable } from '@angular/core';
import { OrderItem } from './orderItem.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from './order.model';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private database: AngularFirestore) { }
  private order: OrderItem[] = [];
  private orderUpdated = new Subject<OrderItem[]>();
  private addressUpdated = new Subject<string>();
  private ordersUpdated = new Subject<any[]>();
  private statusUpdated = new Subject<any>();
  distance: number;
  activeItem: OrderItem;
  googleAddress = 'Nie podano adresu';
  orderMinCost: number;
  private orderMinCostUpdated = new Subject<number>();
  fullPrice = 0;
  private fullPriceUpdated = new Subject<number>();
  private orders: Array<any>;
  private currentDate: any;
  private currentTime: any;
  private currentHour: string;
  private currentMinutes: string;
  private dayOfWeek: number;
  coupons: Array<{code: string, percentage: number}> = [];
  zones: Array<{distance: number, minCost: number}> = [];
  restaurantStatus: any;

  checkRestaurantStatus() {

    this.database.collection('status').doc('status').snapshotChanges().subscribe( a => {

        // tslint:disable-next-line: no-shadowed-variable
      const data = a.payload.data() as {status: any};
      // console.log(data);
      this.restaurantStatus = data.status;
      this.statusUpdated.next(data.status);


    }, error => {
      // console.log(error);
    });
  }

  getRestaurantStatus() {
    return this.restaurantStatus;
  }

  fetchCoupons() {
    let coupon: any;
    this.coupons = [];
    this.database.collection('coupons').get().toPromise().then( querySnapshot => {
      querySnapshot.forEach( doc => {
        coupon = doc.data();
        this.coupons.push({
          code: coupon.code,
          percentage: coupon.percentage
        });
      });
    });
  }

  fetchZones() {
    let zone: any;
    this.zones = [];
    this.database.collection('zones', ref => ref.orderBy('distance')).get().toPromise().then( querySnapshot => {
      querySnapshot.forEach( doc => {
        zone = doc.data();
        this.zones.push({
          distance: zone.distance,
          minCost: zone.minCost
        });
      });
    });
  }

  addCoupon(couponCode: string, couponPercentage: number) {
    this.database.collection('coupons').add({
      code: couponCode,
      percentage: couponPercentage
    });
  }

  addZone(zoneDistance: number, zoneMinCost: number) {
    this.database.collection('zones').add({
      distance: zoneDistance,
      minCost: zoneMinCost
    });
  }

  setCurrentDate() {
    const date = new Date();
    this.currentTime = (('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2)).toString();
    this.currentHour = ('0' + date.getHours()).slice(-2);
    this.currentMinutes = ('0' + date.getMinutes()).slice(-2);
    this.currentDate =
    (date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2)).toString();
    this.dayOfWeek = date.getDay();
  }

  getHours() {
    return this.currentHour;
  }

  getDayOfTheWeek() {
    return this.dayOfWeek;
  }
  getMinutes() {
    return this.currentMinutes;
  }
  getCurrentDate() {
    return this.currentDate;
  }

  getCurrentTime() {
    return this.currentTime;
  }

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

  getTrimmedAddress() {
    const customAddress = this.googleAddress.split(/[,]+/);
    return customAddress[0];
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

  getRestaurantStatusListener() {
    return this.statusUpdated.asObservable();
  }

  deleteOrderItem(index) {
    this.order.splice(index, 1);
    this.orderUpdated.next(this.order);
  }

  calcFullPrice() {
    this.fullPrice = 0;
    for (const orderItem of this.order) {
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

  addOrder(order: Order, id) {
    this.database.collection('orders').doc(id.toString()).set(order);
  }

  getOrders() {
    return this.orders;
  }

  getOrdersListener() {
    return this.ordersUpdated.asObservable();
  }
  fetchOrders() {
    let ordersBuffer = [];
    this.setCurrentDate();
    this.database.collection('orders', ref => ref.where('orderDate', '==', this.currentDate)
    .orderBy('orderTime', 'desc')).snapshotChanges().subscribe( data => {
      ordersBuffer = [];
      data.map( a => {
        // tslint:disable-next-line: no-shadowed-variable
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        ordersBuffer.push(data);
        ordersBuffer[ordersBuffer.length - 1].id = id;
      });
      this.orders = ordersBuffer;
      this.ordersUpdated.next(this.orders);
    }, error => {
      // console.log(error);
    });

  }

  changeOrderState(id, delivery, state) {
    this.database.collection('orders').doc(id).update({orderStatus: state});
    this.database.collection('orders').doc(id).update({deliveryTime: delivery});
  }
}
