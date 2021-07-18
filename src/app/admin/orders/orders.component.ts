import { Subscription } from 'rxjs';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/order.service';
import { Order } from 'src/app/order.model';
import { MatDialog } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  ordersList: Array<Order> = [];
  ordersUpdated: Subscription;
  statusUpdated: Subscription;
  newOrderCheck;
  newOrders = false;
  audio = new Audio();
  restaurantStatus: any;
  isAuth = false;
  authSubscription: Subscription;
  constructor(public orderService: OrderService, public dialog: MatDialog, public database: AngularFirestore,
              private authService: AuthService) { }

  ngOnInit() {
    // this.orderService.addZone(0.5, 15);
    console.log(environment.status);
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
    this.orderService.setCurrentDate();
    this.orderService.fetchOrders();
    this.ordersList = this.orderService.getOrders();
    this.ordersUpdated = this.orderService.getOrdersListener().subscribe((orders: Array<any>) => {
      this.ordersList = orders;
      console.log(this.ordersList);
    });
    this.newOrderCheck = setInterval(() => {
      this.checkOrders();
    }, 2000);
    this.audio.src = 'http://www.schillmania.com/projects/soundmanager2/demo/mpc/audio/CHINA_1.mp3';
    this.audio.volume = 1;
    this.audio.load();
    this.orderService.checkRestaurantStatus();
    this.restaurantStatus = this.orderService.getRestaurantStatus();
    this.statusUpdated = this.orderService.getRestaurantStatusListener().subscribe((resStatus: any) => {
      this.restaurantStatus = resStatus;
    });
  }
  ngOnDestroy() {
    if (this.newOrderCheck) {
      clearInterval(this.newOrderCheck);
    }
    this.authSubscription.unsubscribe();
  }

  playSound() {
    this.audio.play();
  }

  changeRestaurantStatus(statusInfo) {
    this.database.collection(environment.status).doc('status').update({status: statusInfo});
  }

  logout() {
    this.authService.logout();
  }
  addToDb() {
    const menua = {id: 10,
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
    if(typeof this.ordersList != 'undefined') {
      for (const order of this.ordersList) {
        if (order.orderStatus === 'pending') {
          this.audio.play();
        }
      }
    }
  }

  acceptOrder(order) {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      data: order
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log("CLICK!");

      document.getElementById('print-section-0-button').click();
    })
  }

  passToOtherRestaurant(order: any) {
    if(order.restaurant == "SZAFRANA") {
      order.restaurant = "DLUGA";
    } else if(order.restaurant == "DLUGA") {
      order.restaurant = "SZAFRANA";
    }
    order.orderStatus = "pending"
    console.log(order);

    this.orderService.passOrder(order);
  }


}
