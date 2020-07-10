import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-add-position-to-order',
  templateUrl: './add-position-to-order.component.html',
  styleUrls: ['./add-position-to-order.component.css']
})
export class AddPositionToOrderComponent {

  constructor(public menuService: MenuService, public orderService: OrderService) { }

  toppings = this.menuService.getToppings();



}
