import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { EditMenuComponent } from './admin/edit-menu/edit-menu.component';
import { AdressAutocompleteComponent } from './adress-autocomplete/adress-autocomplete.component';
import { AddPositionToOrderComponent } from './add-position-to-order/add-position-to-order.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'orderdetail', component: OrderDetailComponent},
  { path: 'admin/orders', component: OrdersComponent},
  { path: 'admin/editmenu', component: EditMenuComponent},
  { path: 'autocomplete', component: AdressAutocompleteComponent},
  { path: 'add', component: AddPositionToOrderComponent},
  { path: 'menu-edit', component: MenuEditComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesModule {}
