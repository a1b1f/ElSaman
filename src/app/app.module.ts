import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './Components/user/user.component';
import { FavComponent } from './Components/fav/fav.component';
import { CartComponent } from './Components/cart/cart.component';
import { OrderComponent } from './Components/order/order.component';
import { HomeComponent } from './Components/home/home.component';
import { NavComponent } from './Components/nav/nav.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ProductCardComponent } from './Components/Product/product-card/product-card.component';
import { ProductListComponent } from './Components/Product/product-list/product-list.component';
import { ProductDetailsComponent } from './Components/Product/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    FavComponent,
    CartComponent,
    OrderComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    ProductCardComponent,
    ProductListComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
