import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {RouterModule} from '@angular/router';
import { MainComponent } from './main/main.component';
import {AppRoutingModule} from './app-routing.module';
import { CartComponent } from './main/cart/cart.component';
import { CatalogComponent } from './main/catalog/catalog.component';
import { ItemComponent } from './main/catalog/item/item.component';
import {SharedModule} from './shared/shared.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartDrawerComponent } from './main/cart-drawer/cart-drawer.component';
import { CartDrawerItemComponent } from './main/cart-drawer-item/cart-drawer-item.component';
import { CartItemComponent } from './checkout/cart-item/cart-item.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CartComponent,
    CatalogComponent,
    ItemComponent,
    CheckoutComponent,
    CartDrawerComponent,
    CartDrawerItemComponent,
    CartItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    RouterModule.forRoot([]),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
