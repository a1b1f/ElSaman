import { Component, OnInit } from '@angular/core';
import { AccountServices } from 'src/Services/Account';
import { addcart, CartServices } from 'src/Services/Cart';
import { productservice } from 'src/Services/productservice';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  CartItem: addcart[] = [];
  constructor(
    private cart: CartServices,
    private productservice: productservice,
    private acc: AccountServices
  ) {}
  ngOnInit(): void {
    this.show();
  }
  show() {
    this.cart.GetCart().subscribe((res) => {
      this.CartItem = res.data.data;
      this.GetRecipeNames();
      this.GetRecipePrices();
    });
  }
  GetRecipeNames() {
    this.CartItem.forEach((element) => {
      this.cart
        .GetRecipeById(element.recipe_ID)
        .subscribe((res) =>
         {
          console.log( res.data.nameEN)
          element.recipe_Name = res.data.nameEN
        });
    });
    //console.log(this.CartItem);
  }
  GetRecipePrices() {
    this.CartItem.forEach((element) => {
      this.cart.GetRecipeById(element.recipe_ID).subscribe((res) => {
        //console.log(res.data)
        element.price = res.data.price * element.qty;
      });
    });
    //console.log(this.CartItem);
  }
  minus(recipeID: number) {
    //console.log(recipeID);
    var index = this.CartItem.findIndex((i) => i.recipe_ID == recipeID);
    this.CartItem[index].qty--;
    this.cart.UpdateCart(this.CartItem[index].qty,this.CartItem[index].id,this.CartItem[index].recipe_ID,this.acc.getCurrentUserId()).subscribe()
    this.GetRecipePrices();
  }
  plus(recipeID: number) {
    //console.log(recipeID);
    var index = this.CartItem.findIndex((i) => i.recipe_ID == recipeID);
    console.log(this.CartItem[index])
    this.CartItem[index].qty++;
    this.cart.UpdateCart(this.CartItem[index].qty,this.CartItem[index].id,recipeID,this.acc.getCurrentUserId()).subscribe()
    this.GetRecipePrices();

  }
  remove(CartID: number) {
    this.cart.RempveCart(CartID).subscribe((res) => this.show());
  }
}
