import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {

  selectedValue = '45';
  order: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<OrderDialogComponent>, public orderService: OrderService) {
    this.order = data;
  }

  ngOnInit() {
  }

  acceptOrder(id, deliveryTime) {
    this.orderService.changeOrderState(id, deliveryTime, 'accepted');
    this.orderService.sendEmail(this.order.name, this.order.email, 'accepted', this.order.fullPrice,
                                this.order.paymentMethod, deliveryTime);
    this.dialogRef.close();


  }

  declineOrder(id) {
    this.orderService.changeOrderState(id, 0, 'declined');
    this.orderService.sendEmail(this.order.name, this.order.email, 'declined', this.order.fullPrice,
                                this.order.paymentMethod, 0);
    this.dialogRef.close();
  }
}
