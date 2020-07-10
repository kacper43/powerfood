import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuPositionComponent } from './menu-position/menu-position.component';
import { AddPositionToOrderComponent } from './add-position-to-order/add-position-to-order.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdressComponent } from './adress/adress.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MenuComponent } from './menu/menu.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RoutesModule } from './routes.module';
import { EditMenuComponent } from './admin/edit-menu/edit-menu.component';
import { OrdersComponent } from './admin/orders/orders.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AdressAutocompleteComponent } from './adress-autocomplete/adress-autocomplete.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';


@NgModule({
   declarations: [
      AppComponent,
      MenuPositionComponent,
      AddPositionToOrderComponent,
      ShoppingCartComponent,
      AdressComponent,
      MenuComponent,
      OrderDetailComponent,
      LoginComponent,
      RegisterComponent,
      EditMenuComponent,
      OrdersComponent,
      AdressAutocompleteComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      BrowserAnimationsModule,
      MaterialModule,
      RoutesModule,
      FlexLayoutModule,
      GooglePlaceModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
