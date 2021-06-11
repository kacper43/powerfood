import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  itemContainer: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AddDialogComponent>,
              private orderService: OrderService, private _snackBar: MatSnackBar) {
    this.data = data;
  }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  createCoupon(f: NgForm) {
    this.orderService.addCoupon(f.value.code, f.value.percentage);
    this.openSnackBar('Dodano nowy kupon', 'OK');
    this.dialogRef.close();
  }
}
