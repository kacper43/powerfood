import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public menuService: MenuService, public orderService: OrderService) { }
  menu = this.menuService.getMenu();
  ngOnInit() {

  }
  addToOrder(name: string, size: string, price: number) {
    this.orderService.add(name, size, price);
  }
}
