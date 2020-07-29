import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MenuService } from '../menu.service';
import { OrderService } from '../order.service';
import { OrderItem } from '../orderItem.model';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdressAutocompleteComponent } from '../adress-autocomplete/adress-autocomplete.component';
import { Subscription } from 'rxjs';
import { OrderDetailComponent } from '../order-detail/order-detail.component';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  constructor(public menuService: MenuService, public orderService: OrderService, public dialog: MatDialog) { }
  menu = this.menuService.getMenu();
  toppings = this.menuService.getToppings();
  order: OrderItem[] = [];
  private orderSub: Subscription;
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
    this.dialog.open(AdressAutocompleteComponent, {disableClose: true});

  }

  showOrderDetail() {
    this.dialog.open(OrderDetailComponent);
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
    console.log(this.order);
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

  addTopping() {

    // tslint:disable-next-line: deprecation
    const name = event.target.name;

    // tslint:disable-next-line: deprecation
    const value = event.target.value;

    // tslint:disable-next-line: deprecation
    if (event.target.checked) {
      this.finalPrice += Number(value);
      this.chosenToppings.push(name);
      console.log(this.chosenToppings);
    } else {
      this.finalPrice -= Number(value);
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.chosenToppings.length; i++) {
        if (this.chosenToppings[i] === name) {
          this.chosenToppings.splice(i, 1);
        }
      }
      console.log(this.chosenToppings);
    }
  }

  addToOrderItem() {
    console.log(this.myData.itemName, this.myData.itemSize);
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
    console.log(orderItem);
    const or = this.orderService.getOrder();
    console.log(or);
  }
}
