import { Component, OnInit } from '@angular/core';
import { AccountServices } from 'src/Services/Account';
import { addfav, favServices } from 'src/Services/Fav';
import { OrderServices } from 'src/Services/OrderServices';
import { productservice } from 'src/Services/productservice';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.css']
})
export class FavComponent implements OnInit {
  FavtItem: addfav[] = [];
  constructor(
    private cart: favServices,
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
    this.order.GetFavByUser(this.acc.getCurrentUserId()).subscribe((res) => {
      this.FavtItem = res.data.data;
      console.log( res.data.data )

      console.log( this.FavtItem )
      this.getProductNames();
      this.getProductPrices();
      this.getProductImage();
    });

  }
  getProductImage(){
    this.FavtItem.forEach((element) => {
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
    this.FavtItem.forEach((element) => {
      console.log(element)
      this.cart
        .GetProductById(element.productID!)
        .subscribe((res) =>
         {
          console.log( res.data.nameEN)
          element.product_Name = res.data.nameEN
        });
    });
    //console.log(this.CartItem);
  }
  getProductPrices() {
    this.FavtItem.forEach((element) => {
      this.cart.GetProductById(element.productID!).subscribe((res) => {
        console.log(res.data)
        element.price = res.data.price ;
      });
    });
    //console.log(this.CartItem);
  }

  remove(favId: number) {
    console.log(favId)
    this.cart.RempveFav(favId).subscribe((res) => this.show());
  }
  removeAll(){
    this.FavtItem=[];
  }

}
