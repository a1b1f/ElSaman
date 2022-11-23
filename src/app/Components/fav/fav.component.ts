import { Component, OnInit } from '@angular/core';
import { AccountServices } from 'src/Services/Account';
import { addfav, favServices } from 'src/Services/Fav';
import { productservice } from 'src/Services/productservice';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.css']
})
export class FavComponent implements OnInit {

  FavtItem: addfav[] = [];
  userId:string=this.acc.getCurrentUserId();

  constructor(    private fav: favServices,
    private productservice: productservice,
    private acc: AccountServices) { }

  ngOnInit(): void {
    this.show();

  }
  show() {
    this.fav.GetFav().subscribe((res) => {
      this.FavtItem = res.data.data;
      //console.log(res.data.data)
      //console.log(this.FavtItem);
      this.getProductNames();
      this.getProductImages();

    });
}
getProductNames() {
  this.FavtItem.forEach((element) => {
    console.log(element)
    this.fav
      .GetRecipeById(element.ProductID)
      .subscribe((res) => {
        //console.log(res);
        (element.product_Name = res.data.nameEN)

      });
  });
}
getProductImages() {
  this.FavtItem.forEach((element) => {
    console.log(element)
    this.fav
      .GetRecipeById(element.ProductID)
      .subscribe((res) => {
        console.log(res);
        (element.productImg = res.data.imageUrl)

      });
  });
}
remove(FavID: number,productID:number) {
  this.fav.RempveFav(FavID).subscribe((res) =>{
    console.log(res);
    this.show()});
}

}
