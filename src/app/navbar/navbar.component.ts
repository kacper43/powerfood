import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AdressAutocompleteComponent } from '../adress-autocomplete/adress-autocomplete.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public orderService: OrderService, public dialog: MatDialog) { }
  address = '';
  customAddress = [];
  private addressSub: Subscription;
  ngOnInit() {
    this.orderService.getAddress();
    this.addressSub = this.orderService.getAddressUpdatedListener().subscribe((address: string) => {
      this.address = address;
      this.customAddress = this.address.split(/[,]+/);
    });
  }

  changeAddress() {
    this.dialog.open(AdressAutocompleteComponent);
  }
}
