import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountServices } from 'src/Services/Account';
import { addcart, CartServices } from 'src/Services/Cart';
import { OrderServices } from 'src/Services/OrderServices';
import { Order } from 'src/ViewModels/Order';
import { OrderItem } from 'src/ViewModels/OrderItem';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderItems: OrderItem[] = [];
  TotalPrice: number = 0;
  cartItems: addcart[] = [];
  OrderDetails: Order = new Order();

  constructor(
    private order: OrderServices,
    private acc: AccountServices,
    private cart: CartServices,
    private route:Router
  ) {}

  ngOnInit(): void {
    this.show();
  }
  show() {
    this.order.GetCartByUser(this.acc.getCurrentUserId()).subscribe((res) => {
      // console.log(res.data.data)
      this.orderItems = res.data.data;
      console.log(this.orderItems);

      this.GetRecipeNames();
      this.GetTotalPrice();
    });
  }
  GetRecipeNames() {
    this.orderItems.forEach((element) => {
      this.cart.GetProductById(element.productID).subscribe((res) => {
        //console.log(element.recipe_ID)
        //console.log( res.data)
        element.productName = res.data.nameEN;
      });
    });
    //console.log(this.orderItems);
  }
  price: number = 0;
  GetTotalPrice() {
    this.cart.GetCart().subscribe((res) => {
      this.cartItems = res.data.data;
      this.cartItems.forEach((element) => {
        this.cart.GetProductById(element.productID!).subscribe((res) => {
          console.log(res.data.price);
          console.log(element);

          this.TotalPrice = this.TotalPrice + (res.data.price * element.qty+50);
        });
      });
    });
  }

  OrderNow() {
    var i = 0;
   // this.OrderDetails.orderItems = this.orderItems;
    console.log(this.OrderDetails.orderItems);
    this.OrderDetails.userId = this.acc.getCurrentUserId();

    this.order.AddOrder(this.OrderDetails).subscribe((res) => {
      if(res.success){
        this.route.navigateByUrl("/order/sent")
      }
    });
  }

}
