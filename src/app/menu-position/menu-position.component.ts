import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../menuItem.model';

@Component({
  selector: 'app-menu-position',
  templateUrl: './menu-position.component.html',
  styleUrls: ['./menu-position.component.css']
})
export class MenuPositionComponent implements OnInit {

  constructor() { }
  menuPos: MenuItem;

  ngOnInit() {
  }
}
