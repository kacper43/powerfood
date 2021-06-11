import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MenuService } from '../menu.service';
import { OrderService } from '../order.service';
import { OrderItem } from '../orderItem.model';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdressAutocompleteComponent } from '../adress-autocomplete/adress-autocomplete.component';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { AngularFirestore } from 'angularfire2/firestore';
import { RestaurantClosedDialogComponent } from '../restaurant-closed-dialog/restaurant-closed-dialog.component';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  constructor(public menuService: MenuService, public orderService: OrderService,
              public dialog: MatDialog, public database: AngularFirestore, private deviceService: DeviceDetectorService) { }

  shoppingCartClass: string;
  isShoppingCartHidden: boolean;
  shoppingCartBtnClass: string;
  distance: number;
  fullPrice = 0;
  private fullPriceSub: Subscription;
  minCost: number;
  private minCostSub: Subscription;
  hidden = false;
  categories = [];
  order: OrderItem[] = [];
  private orderSub: Subscription;
  private statusUpdated: Subscription;
  menu: any = [];
  toppings: any;
  hour: string;
  minutes: string;
  restaurantStatus: any;
  dayOfTheWeek: number;
  isOpened: boolean;
  spinner = true;


  shoppingCartToggle() {
    if (this.isShoppingCartHidden) {
      this.shoppingCartClass = 'shopping-cart';
      this.shoppingCartBtnClass = 'shopping-cart-btn';
    } else {
      this.shoppingCartClass = 'shopping-cart hidden';
      this.shoppingCartBtnClass = 'shopping-cart-btn btn-hidden';
    }
    this.isShoppingCartHidden = !this.isShoppingCartHidden;
    this.hidden = !this.hidden;
  }

  lowerQuantity(item) {
    if (item.quantity > 1) {
      item.quantity--;
      this.orderService.calcFullPrice();
    }
  }

  increaseQuantity(item) {
    item.quantity++;
    this.orderService.calcFullPrice();
  }



  ngOnInit() {
    this.spinner = true;
    // this.menuService.addCategory('Sosy i napoje', ['80ml', '0,33L', '0,85L']);
    // this.menuService.addTopping('parmezan', [
    //   {
    //     size: '30cm',
    //     price: 4
    //     },
    //   {
    //     size: '40cm',
    //     price: 5
    //   },
    //   {
    //     size: '50cm',
    //     price: 6
    //   }
    // ]);

    // this.database.collection('menu').add({
    //   id: 43,
    //   name: 'Sos ostry',
    //   category: 'Sosy i napoje',
    //   sizes: [
    //     {
    //       size: '80ml',
    //       price: 2
    //     }
    //   ],
    //   toppings: ''
    // });
    this.orderService.checkRestaurantStatus();
    this.restaurantStatus = this.orderService.getRestaurantStatus();
    this.statusUpdated = this.orderService.getRestaurantStatusListener().subscribe((resStatus: any) => {
      this.restaurantStatus = resStatus;
     // console.log(this.restaurantStatus);

      this.orderService.setCurrentDate();
      this.hour = this.orderService.getHours();
      this.dayOfTheWeek = this.orderService.getDayOfTheWeek();

      switch (this.dayOfTheWeek) {
        case 0: // niedziela
          if ((this.hour >= '00' && this.hour < '02') || (this.hour >= '12' && this.hour < '22')) {
            this.isOpened = true;
          } else {
            this.isOpened = false;
          }
          break;
        case 1: // poniedziałek
          if (this.hour >= '12' && this.hour < '22') {
            this.isOpened = true;
          } else {
            this.isOpened = false;
          }
          break;
        case 2: // wtorek
          if (this.hour >= '12' && this.hour < '22') {
            this.isOpened = true;
          } else {
            this.isOpened = false;
          }
          break;
        case 3: // środa
          if (this.hour >= '12' && this.hour < '22') {
            this.isOpened = true;
          } else {
            this.isOpened = false;
          }
          break;
          case 4: // czwartek
          // if (this.hour >= '12' && this.hour <= '23') {
            this.isOpened = true;
          // } else {
            // this.isOpened = false;
          // }
          break;
          case 5: // piątek
          if (this.hour >= '12' && this.hour <= '23') {
            this.isOpened = true;
          } else {
            this.isOpened = false;
          }
          break;
          case 6: // sobota
          if ((this.hour >= '00' && this.hour < '02') || (this.hour >= '12' && this.hour <= '23')) {
            this.isOpened = true;
          } else {
            this.isOpened = false;
          }
          break;

      }
      if (this.isOpened) {

        if (this.restaurantStatus) {
          this.menuService.fetchToppings();
          this.menuService.fetchCategories();
          this.menuService.fetchMenu();
          this.menu = this.menuService.getMenu();
          this.orderService.fetchCoupons();
          this.toppings = this.menuService.getToppings();
          this.categories = this.menuService.getCategories();
          this.shoppingCartClass = 'shopping-cart hidden';
          this.isShoppingCartHidden = true;
          this.shoppingCartBtnClass = 'shopping-cart-btn btn-hidden';

          this.orderService.getOrder();
          this.orderSub = this.orderService.getOrderUpdatedListener().subscribe((order: OrderItem[]) => {
            this.order = order;
          });
          this.orderService.getMinCost();
          this.minCostSub = this.orderService.getMinCostUpdatedListener().subscribe((cost: number) => {
            this.minCost = cost;
          });
          this.orderService.getFullPrice();
          this.fullPriceSub = this.orderService.getFullPriceListener().subscribe((price: number) => {
            this.fullPrice = price;
          });
          this.distance = this.orderService.getDistance();
          if (this.deviceService.isDesktop()) {
            this.dialog.open(AdressAutocompleteComponent, {disableClose: true});
            this.spinner = false;

          } else {
            this.dialog.open(AdressAutocompleteComponent, {disableClose: true, width: '100vw'});
            this.spinner = false;

          }
        } else {
          this.dialog.open(RestaurantClosedDialogComponent, {
            data: {
              info: 'busy'
            },
            disableClose: true
          });
          this.spinner = true;
        }
      } else {
        this.dialog.open(RestaurantClosedDialogComponent, {
          data: {
            info: 'closed'
          },
          disableClose: true,
        });
        this.spinner = true;
      }
    });
    this.spinner = true;
  }

  showOrderDetail() {
    if (this.deviceService.isDesktop()) {
      this.dialog.open(OrderDetailComponent);
    } else {
      this.dialog.open(OrderDetailComponent, {width: '100vw'});
    }

  }

  ngOnDestroy() {
    this.orderSub.unsubscribe();
  }
  openDialog(name, size, price) {
    this.dialog.open(AddPositionToOrderComponent, {
      data: {
        itemName: name,
        itemSize: size,
        itemPrice: price,
        allToppings: this.toppings
      }
    });
  }

  deleteOrderItem(index) {
    this.orderService.deleteOrderItem(index);
    this.orderService.calcFullPrice();
  }
  getShoppingCart() {
    this.order = this.orderService.getOrder();
  }
}

@Component({
  selector: 'app-add-position-to-order',
  templateUrl: '../add-position-to-order.html'
})
export class AddPositionToOrderComponent {
  finalPrice = 0;
  orderData: OrderItem = {name: 'a', size: 'a', toppings: [], price: 0, quantity: 1};
  myData: any;
  chosenToppings = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public orderService: OrderService,
              private dialogRef: MatDialogRef<AddPositionToOrderComponent>) {
    this.finalPrice += data.itemPrice;
    this.myData = data;
  }

  addTopping(event) {
    const name = event.source.name;
    const value = event.source.value;

    if (event.checked) {
      this.finalPrice += Number(value);
      this.chosenToppings.push(name);
    } else {
      this.finalPrice -= Number(value);

      for (let i = 0; i < this.chosenToppings.length; i++) {
        if (this.chosenToppings[i] === name) {
          this.chosenToppings.splice(i, 1);
        }
      }
    }
  }

  addToOrderItem() {
    this.orderData.name = this.myData.itemName;
    this.orderData.size = this.myData.itemSize;
    this.orderData.toppings = this.chosenToppings;
    this.orderData.price = this.finalPrice;
    this.orderData.quantity = 1;
    this.addToShoppingCart(this.orderData);
    this.orderService.calcFullPrice();
    this.dialogRef.close();
  }

  addToShoppingCart(orderItem: OrderItem) {
    this.orderService.add(orderItem);
    const or = this.orderService.getOrder();
  }
}
