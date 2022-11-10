import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AccountServices } from 'src/Services/Account';
import { addcart, CartServices } from 'src/Services/Cart';
import { productservice } from 'src/Services/productservice';
import { OrderServices } from 'src/Services/OrderServices';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit , OnChanges {
  CartItem: addcart[] = [];
  constructor(
    private cart: CartServices,
    private productservice: productservice,
    private order:OrderServices,
    private acc: AccountServices
  ) {}
  ngOnChanges(): void {


  }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.show();
  }
  show() {
    this.order.GetCartByUser(this.acc.getCurrentUserId()).subscribe((res) => {
      this.CartItem = res.data.data;
      console.log( res.data.data )

      console.log( this.CartItem )
      this.getProductNames();
      this.getProductPrices();
      this.getProductImage();
    });

  }
  getProductImage(){
    this.CartItem.forEach((element) => {
      console.log(element.productID)
      this.cart
        .GetProductById(element.productID!)
        .subscribe((res) =>
         {
         // console.log( res.data)
          element.imageUrl = res.data.imageUrl
        });
    });
  }
  getProductNames() {
    this.CartItem.forEach((element) => {
      console.log(element)
      this.cart
        .GetProductById(element.productID!)
        .subscribe((res) =>
         {
          console.log( res.data.nameEN)
          element.productName = res.data.nameEN
        });
    });
    //console.log(this.CartItem);
  }
  getProductPrices() {
    this.CartItem.forEach((element) => {
      this.cart.GetProductById(element.productID!).subscribe((res) => {
        //console.log(res.data)
        element.price = res.data.price * element.qty;
      });
    });
    //console.log(this.CartItem);
  }
  minus(recipeID: number) {
    //console.log(recipeID);
    var index = this.CartItem.findIndex((i) => i.productID == recipeID);
    this.CartItem[index].qty--;
    this.cart.UpdateCart(this.CartItem[index].qty,this.CartItem[index].id,this.CartItem[index].productID!,this.acc.getCurrentUserId()).subscribe()
    this.getProductPrices();
  }
  plus(recipeID: number) {
    //console.log(recipeID);
    var index = this.CartItem.findIndex((i) => i.productID == recipeID);
    console.log(this.CartItem[index])
    this.CartItem[index].qty++;
    this.cart.UpdateCart(this.CartItem[index].qty,this.CartItem[index].id,recipeID,this.acc.getCurrentUserId()).subscribe()
    this.getProductPrices();

  }
  remove(CartID: number) {
    this.cart.RempveCart(CartID).subscribe((res) => this.show());
  }
}
