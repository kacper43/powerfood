import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import * as cloneDeep from 'lodash/cloneDeep';
import { MenuService } from 'src/app/menu.service';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<EditDialogComponent>,
              // tslint:disable-next-line: variable-name
              private menuService: MenuService, private _snackBar: MatSnackBar, private orderService: OrderService) {
    dialogRef.afterClosed().subscribe(result => {
      this.itemToChange = {
        name: '',
        sizes: [],
        category: '',
        id: '',
        isActive: false,
        toppings: ''
      };
      console.log(this.itemToChange);
    });
    this.data = data;
   }

   isActive: any;
   itemToChange: any;

   ngOnInit() {
    this.itemToChange = cloneDeep(this.data.item);
    if (this.itemToChange.isActive) {
      this.isActive = '1';
    } else {
      this.isActive = '0';
    }

    console.log(this.itemToChange);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  updateItem(f: NgForm) {
    if (this.isActive === '1') { this.isActive = true; }
    if (this.isActive === '0') { this.isActive = false; }
    this.itemToChange.isActive = this.isActive;
    for (const size of this.itemToChange.sizes) {
      size.price = Number(size.price);
    }

    this.menuService.changeMenuItem(this.itemToChange.id, this.itemToChange);
    this.openSnackBar('Pozycja uaktualniona!', 'OK');
    this.dialogRef.close();
  }

  updateCoupon(f: NgForm) {
    this.orderService.updateCoupon(this.itemToChange.id, this.itemToChange.code, this.itemToChange.percentage);
    this.openSnackBar('Kupon zaktualizowany', 'OK');
    this.dialogRef.close();
  }

  newSize() {
    this.itemToChange.sizes.push({
      price: 0,
      size: 'Podaj rozmiar'
    });
    console.log(this.itemToChange.sizes);
  }

  removeSize(i: number) {
    this.itemToChange.sizes.splice(i, 1);
    console.log(this.itemToChange.sizes);
  }

}
