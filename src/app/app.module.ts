import { OrderDialogComponent } from './admin/orders/order-dialog/order-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { MenuPositionComponent } from './menu-position/menu-position.component';
import { AdressComponent } from './adress/adress.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MenuComponent, AddPositionToOrderComponent } from './menu/menu.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RoutesModule } from './routes.module';
import { EditMenuComponent } from './admin/edit-menu/edit-menu.component';
import { OrdersComponent } from './admin/orders/orders.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AdressAutocompleteComponent } from './adress-autocomplete/adress-autocomplete.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { MenuEditComponent } from './menu-edit/menu-edit.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from './navbar/navbar.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { RestaurantClosedDialogComponent } from './restaurant-closed-dialog/restaurant-closed-dialog.component';
import { AuthService } from './auth/auth.service';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
   declarations: [
      AppComponent,
      MenuPositionComponent,
      AddPositionToOrderComponent,
      AdressComponent,
      MenuComponent,
      OrderDetailComponent,
      LoginComponent,
      RegisterComponent,
      EditMenuComponent,
      OrdersComponent,
      AdressAutocompleteComponent,
      MenuEditComponent,
      NavbarComponent,
      OrderDialogComponent,
      OrderStatusComponent,
      RestaurantClosedDialogComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      BrowserAnimationsModule,
      MaterialModule,
      RoutesModule,
      FlexLayoutModule,
      GooglePlaceModule,
      MatDialogModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      AngularFireAuthModule,
      NgxPrintModule
   ],
   providers: [AuthService, AngularFireAuth, DeviceDetectorService],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      AddPositionToOrderComponent,
      AdressAutocompleteComponent,
      OrderDetailComponent,
      OrderDialogComponent,
      RestaurantClosedDialogComponent
   ]
})
export class AppModule { }
