import { Subscription } from 'rxjs';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/order.service';
import { Order } from 'src/app/order.model';
import { MatDialog } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  ordersList: Array<Order> = [];
  ordersUpdated: Subscription;
  newOrderCheck;
  newOrders = false;
  const audio = new Audio();
  constructor(public orderService: OrderService, public dialog: MatDialog, public database: AngularFirestore) { }

  ngOnInit() {
    const date = new Date();
    const currentDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    this.orderService.fetchOrders();
    this.ordersList = this.orderService.getOrders();
    this.ordersUpdated = this.orderService.getOrdersListener().subscribe((orders: Array<any>) => {
      this.ordersList = orders;
    });
    this.newOrderCheck = setInterval(() => {
      this.checkOrders();
    }, 2000);
    this.audio.src = 'http://www.schillmania.com/projects/soundmanager2/demo/mpc/audio/CHINA_1.mp3';
    this.audio.load();
  }
  ngOnDestroy() {
    if (this.newOrderCheck) {
      clearInterval(this.newOrderCheck);
    }
  }

  playSound() {
    this.audio.play();
  }

  addToDb() {
    let menua =
    {id: 10,
      name: 'Spinaci con polo',
      toppings: 'Sos śmietanowy, szpinak, kurczak, suszone pomidory, czosnek, gorgonzola D.O.P.',
      sizes: [
        {
          size: '500ml',
          price: 24
        }
      ],
      category: 'Makarony'
    };
    this.database.collection('menu').add(menua);
  }



  checkOrders() {
    for (const order of this.ordersList) {
      if (order.orderStatus === 'pending') {
        this.audio.play();
      }
    }
  }

  acceptOrder(order) {
    this.orderService.changeOrderState(order.id, 'accepted');
    //this.dialog.open(OrderDialogComponent);

  }
}
