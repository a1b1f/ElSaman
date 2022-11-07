import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavComponent } from './Components/fav/fav.component';
import { CartComponent } from './Components/cart/cart.component';
import { HomeComponent } from './Components/home/home.component';
import { NavComponent } from './Components/nav/nav.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ProductCardComponent } from './Components/Product/product-card/product-card.component';
import { ProductListComponent } from './Components/Product/product-list/product-list.component';
import { ProductDetailsComponent } from './Components/Product/product-details/product-details.component';
import { productservice } from 'src/Services/productservice';
import { AccountServices } from 'src/Services/Account';
import { CartServices } from 'src/Services/Cart';
import { favServices } from 'src/Services/Fav';
import { StoreService } from 'src/Services/StoreService';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from './Components/rating/rating.component';
import { OurTeamComponent } from './Components/our-team/our-team.component';
import { SignUpComponent } from './Components/Account/sign-up/sign-up.component';
import { LoginComponent } from './Components/Account/login/login.component';
import { OrderComponent } from './Components/Order/order/order.component';
import { AfterorderComponent } from './Components/Order/afterorder/afterorder.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgImageSliderModule } from 'ng-image-slider';
import { OrderServices } from 'src/Services/OrderServices';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FavComponent,
    CartComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    ProductCardComponent,
    ProductListComponent,
    ProductDetailsComponent,
    RatingComponent,
    OurTeamComponent,
    SignUpComponent,
    OrderComponent,
    AfterorderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgImageSliderModule,
  ],
  providers: [
    AccountServices,
    productservice,
   StoreService,
    CartServices,
    favServices,
    OrderServices

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
