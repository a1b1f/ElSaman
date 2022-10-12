import { Component, Input, OnInit } from '@angular/core';
import { AccountServices } from 'src/Services/Account';
import { addcart, CartServices } from 'src/Services/Cart';
import { productservice } from 'src/Services/productservice';
import { StoreService } from 'src/Services/StoreService';
import { Category } from 'src/ViewModels/category';
import { Product } from 'src/ViewModels/product';
import { Rating } from 'src/ViewModels/Rating';
import { PagingViewModel } from 'src/ViewModels/result-view-model';
import { Store } from 'src/ViewModels/Store';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  page: number = 1; //current page number
  count: number = 1; //total pages

  //number of elements to get form database per request
  tableSize: number = 6;
  tableSizes: any = [1, 5, 10, 20];
  Recipes:Product[]=[];
  unfiltered:Product[]=[];
  Rating:Rating[]=[];
  Categories:Category[]=[];
  recipeName:string="";
  restaurant:Store[]=[];
  restName:string="";
  @Input() recipe:Product= new Product();
CartItems:addcart[]=[];
 @Input() rateval:number=0;
 //isInCart:boolean=false;
 btnDis:string="btnDis";
 btn:string="btn";
  hidden:string="hidden";
 AddTOCart(recipeID:number) {

    this.cart.AddCart(1,recipeID,this.acc.getCurrentUserId()).subscribe(res=>this.recipe.isInCart=res.data);

}
  constructor(private cart:CartServices, private acc :AccountServices,
    private ProductService: productservice,private StoreServices:StoreService) { }

  ngOnInit(): void {
    this.fetchData()
    this.StoreServices.getStore(this.tableSize,this.page).subscribe(res =>
      {
        // console.log(res);
        this.restaurant=res.data.data
      })
  }
  fetchData() {
    console.log(this.tableSize,this.page)
    this.ProductService.getProduct(this.tableSize,this.page).subscribe(res => {
      let responce = res.data as PagingViewModel
      this.page = responce.pageIndex;
      this.tableSize = responce.pageSize;
      this.count = responce.count;
      this.Recipes = responce.data as Product[];
      // this.Recipes=this.Recipes.filter(i=> i.resturantID!=null)
      // console.log(res);
      console.log(this.Recipes);
    })
  }
  onTableDataChange(event: any) {
    console.log(event);
    this.page = event;
    this.fetchData();

      // this.RecipeService.getCategories().subscribe(res=>
      //   {

      //     this.Categories=res.data ;
      //   })


  }

// resturant

getNameres(valu:string){
  this.restName=valu;
}


getRestByName(){
  //console.log(this.restName)
  if(this.restName!=="")
      {
      this.StoreServices.getStoreByName(this.restName) .subscribe(res=>
        {
          console.log(res);
          this.restaurant=res.data
        })
      }

}

  getByCategory(cName:string){
    this.Categories.filter(i=>{
      if(i.nameEN==cName)
      {
        i.isChecked=!i.isChecked
      }
    })
    this.Recipes=[];
    this.Categories.forEach(c=>{
      if(c.isChecked==true)
      {
        this.ProductService.getByCategory(c.nameEN).subscribe(res=>
          {
            console.log(res);
            this.unfiltered=res.data
            this.Recipes.push(...this.unfiltered.filter(i=>i.isDeleted == false && i.nameEN.includes(this.recipeName)))
          })

      }

    })
  console.log(this.Categories)
  }
  getName(val:string){
    this.recipeName=val;
  }


  getRecipesByName(){
    console.log(this.recipeName)
    if(this.recipeName!=="")
        {
        this.ProductService.getProductByName(this.recipeName).subscribe(res=>
          {
            console.log(res);
            this.unfiltered=res.data
            this.Recipes=this.unfiltered.filter(i=>i.isDeleted == false)
          })
        }
  }

}
