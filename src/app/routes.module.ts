import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { EditMenuComponent } from './admin/edit-menu/edit-menu.component';

import { MenuEditComponent } from './menu-edit/menu-edit.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'menu', component: MenuComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'admin/orders', component: OrdersComponent, canActivate: [AuthGuard]},
  { path: 'admin/editmenu', component: EditMenuComponent, canActivate: [AuthGuard]},
  { path: 'menu-edit', component: MenuEditComponent, canActivate: [AuthGuard]},
  { path: 'orderstatus/:id', component: OrderStatusComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class RoutesModule {}
