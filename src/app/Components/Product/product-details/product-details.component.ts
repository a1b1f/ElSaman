import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productservice } from 'src/Services/productservice';
import { Product } from 'src/ViewModels/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  Products:Product= new Product();

  constructor(private active:ActivatedRoute,private Productservice:productservice) { }

  ngOnInit(): void {
    console.log(this.active.snapshot.params["id"] )
    this.Productservice.getProductByID(this.active.snapshot.params["id"]).subscribe(res=>this.Products=res.data);
  }

}
