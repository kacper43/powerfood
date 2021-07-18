import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
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
        id: '',
        isActive: false,
        toppings: '',
        isNew: false,
        category: 'Pizza',
        type: 'none'

      };
      console.log(this.itemToChange);
    });
    this.data = data;
   }

   isActive: any;
   itemToChange: any;
   isNew: any = false;
   type: string = 'none';
   category: string = 'Pizza';

   ngOnInit() {
    this.itemToChange = cloneDeep(this.data.item);
    if (this.itemToChange.isActive) {
      this.isActive = '1';
    } else {
      this.isActive = '0';
    }

    if (this.itemToChange.isNew) {
      this.isNew = '1';
    } else {
      this.isNew = '0';
    }

    this.category = this.itemToChange.category;

    (!this.itemToChange.type || this.itemToChange.type == '') ? this.type = 'none' : this.type = this.itemToChange.type;

    this.type = this.itemToChange.type;
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
    if (this.isNew === '1') { this.isNew = true; }
    if (this.isNew === '0') { this.isNew = false; }
    this.itemToChange.isActive = this.isActive;
    this.itemToChange.isNew = this.isNew;
    this.itemToChange.type = this.type;
    this.itemToChange.category = this.category;
    for (const size of this.itemToChange.sizes) {
      size.price = Number(size.price);
    }

    this.menuService.changeMenuItem(this.itemToChange.firebaseId, this.itemToChange);
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
