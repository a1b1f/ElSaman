import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Account/login/login.component';
import { SignUpComponent } from './Components/Account/sign-up/sign-up.component';
import { CartComponent } from './Components/cart/cart.component';
import { FavComponent } from './Components/fav/fav.component';
import { HomeComponent } from './Components/home/home.component';
import { AfterorderComponent } from './Components/Order/afterorder/afterorder.component';
import { OrderComponent } from './Components/Order/order/order.component';
import { OurTeamComponent } from './Components/our-team/our-team.component';
import { ProductCardComponent } from './Components/Product/product-card/product-card.component';
import { ProductDetailsComponent } from './Components/Product/product-details/product-details.component';
import { ProductListComponent } from './Components/Product/product-list/product-list.component';

const routes: Routes = [
  {path:"",redirectTo:"Home",pathMatch:"full"},
  {path:"Home",component:HomeComponent},
  {path:"Product",component:ProductListComponent},
  {path:"Product/Card",component:ProductCardComponent},
  {path:"Product/details/:id",component:ProductDetailsComponent},
  {path:"Cart",component:CartComponent},
  {path:"Fav",component:FavComponent},
  {path:"Team",component:OurTeamComponent},
  {path:"order",component:OrderComponent},
  {path:"order/sent",component:AfterorderComponent},
  {path:"signup",component:SignUpComponent},
  {path:"login",component:LoginComponent}







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
