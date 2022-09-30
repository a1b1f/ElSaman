import { Component, OnInit } from '@angular/core';
import { productservice } from 'src/Services/productservice';
import { Category } from 'src/ViewModels/category';
import { Product } from 'src/ViewModels/product';
import { PagingViewModel } from 'src/ViewModels/result-view-model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  page: number = 1; //current page number
  count: number = 1; //total pages

  //number of elements to get form database per request
  tableSize: number = 10;
  tableSizes: any = [1, 5, 10, 20];
  Products:Product[]=[];
  unfiltered:Product[]=[];
  Categories:Category[]=[];
  recipeName:string="";
  constructor( private ProductService: productservice) { }

  ngOnInit(): void {
    this.fetchData()
  }
  fetchData() {
    //console.log(this.tableSize,this.page)
    this.ProductService.getProduct(this.tableSize,this.page).subscribe(res => {
      let responce = res.data as PagingViewModel
      this.page = responce.pageIndex;
      this.tableSize = responce.pageSize;
      this.count = responce.count;
      this.unfiltered = responce.data as Product[];
      this.Products=this.unfiltered.filter(i=> i.StoreID==null) as Product[]
      this.getProductByName();
      this.ProductService.getCategories().subscribe(res=>
        {
          this.Categories=res.data ;
          var c = new Category();
          c.nameEN="All";
          this.Categories.push(c);
        })
    })
  }
 onTableDataChange(event: any) {
   // console.log(event);
    this.page = event;
    this.fetchData();
  }


  getName(val:string){
    this.recipeName=val;
  }

  getProductByName(){
    //console.log(this.recipeName)
    if(this.recipeName!=="")
        {
        this.ProductService.getProductByName(this.recipeName).subscribe(res=>
          {
            //console.log(res);
            this.unfiltered=res.data.data

            this.Products=this.unfiltered.filter(i=>i.isDeleted == false)
          })
        }
        else{
          this.ProductService.getProduct(this.tableSize,this.page).subscribe(res => {
            let responce = res.data as PagingViewModel
            this.page = responce.pageIndex;
            this.tableSize = responce.pageSize;
            this.count = responce.count;
            this.Products = responce.data as Product[];})

        }
  }
  getByCategory(cName:string){
    this.Categories.filter(i=>{
      if(i.nameEN==cName)
      {
        i.isChecked=!i.isChecked
      }
    })
    this.Products=[];
    this.Categories.forEach(c=>{
      if(c.isChecked==true )
      {
        if(c.nameEN=="All"){
          this.ProductService.getProduct(this.tableSize,this.page).subscribe(res => {
            let responce = res.data as PagingViewModel
            this.page = responce.pageIndex;
            this.tableSize = responce.pageSize;
            this.count = responce.count;
            this.Products = responce.data as Product[];
            this.Products= this.Products.filter(i=>  i.nameEN.includes(this.recipeName))
          })
        }
        else {
        this.ProductService.getByCategory(c.nameEN).subscribe(res=>
          {
            //console.log(res);
            this.unfiltered=res.data.data
            this.Products.push(...this.unfiltered.filter(i=>  i.nameEN.includes(this.recipeName)))
          })
        }

      }
    })
  }
}
