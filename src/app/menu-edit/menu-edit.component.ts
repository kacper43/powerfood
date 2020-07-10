import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../menu.service';
import { MenuItem } from '../menuItem.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css']
})
export class MenuEditComponent implements OnInit {

  constructor(public menuService: MenuService) { }
  elementData: Array<MenuItem>;
  displayedColumns: string[] = ['id', 'name', 'toppings', 'category', 'delete'];


  ngOnInit() {
    this.elementData = this.menuService.getMenu();
  }

  deletePosition(id) {
    this.elementData = this.elementData.filter(item => item.id !== id);
    this.menuService.deletePosition(id);
  }
}
