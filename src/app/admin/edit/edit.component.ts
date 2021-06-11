import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/menu.service';
import { OrderService } from 'src/app/order.service';
import { AddDialogComponent } from './add-dialog/add-dialog/add-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  menu: any;
  menuUpdated: Subscription;
  couponsUpdated: Subscription;
  toppings: any;
  categories: any;
  coupons: any;
  constructor(private menuService: MenuService, private orderService: OrderService, public dialog: MatDialog,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.menuService.fetchToppings();
    this.menuService.fetchCategories();
    this.menuService.fetchMenu();
    this.orderService.fetchCoupons();
    this.coupons = this.orderService.getCoupons();
    this.toppings = this.menuService.getToppings();
    this.categories = this.menuService.getCategories();
    this.menuService.getLiveMenu();
    this.menuUpdated = this.menuService.getLiveMenuListener().subscribe((menuItems: Array<any>) => {
      this.menu = menuItems;
    });
    this.couponsUpdated = this.orderService.getCouponsUpdatedListener().subscribe((items: any) => {
      this.coupons = items;
    });
    console.log(this.toppings);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openEditDialog(object: any, type: string) {
    this.dialog.open(EditDialogComponent, {
      data: {
        item: object,
        itemType: type
      }
    });
  }

  openAddDialog(itemType: string) {
    this.dialog.open(AddDialogComponent, {
      data: {
        type: itemType
      }
    });
  }

  deleteCoupon(couponId: string) {
    this.orderService.deleteCoupon(couponId);
    this.openSnackBar('Usunięto kupon', '');
  }
}
