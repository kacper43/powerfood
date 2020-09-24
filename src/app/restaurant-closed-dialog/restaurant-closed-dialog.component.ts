import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-restaurant-closed-dialog',
  templateUrl: './restaurant-closed-dialog.component.html',
  styleUrls: ['./restaurant-closed-dialog.component.css']
})
export class RestaurantClosedDialogComponent implements OnInit {
  dialogInfo: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<RestaurantClosedDialogComponent>) {
                this.dialogInfo = data;
               }

  ngOnInit() {
  }

}
