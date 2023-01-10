import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ResultViewModel } from "src/ViewModels/result-view-model";



@Injectable()


export class CartServices{
    constructor (private http:HttpClient){}
    getheader(){
        let token = localStorage.getItem("token")
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
         });
        return { headers: headers };
    }

    GetAllCart( ){

        return this.http.get<ResultViewModel>("http://elsaman-001-site1.atempurl.com/ProductAPI/GetAPI",this.getheader());
    }

    GetCart(){
        return this.http.get<ResultViewModel>("http://elsaman-001-site1.atempurl.com/CartAPI/Get",this.getheader());
    }
    GetProductById(RecipeID:number){
        return this.http.get<ResultViewModel>("http://elsaman-001-site1.atempurl.com/ProductAPI/GetDetails?ID="+RecipeID,this.getheader());
    }
    AddCart(Qty:number,ProducrID:number,userId:string){
      console.log(ProducrID)
        let cart = new addcart()
        cart.qty=Qty;
        cart.productID = ProducrID;
        cart.UserId = userId
        return this.http.post<ResultViewModel>("http://elsaman-001-site1.atempurl.com/CartAPI/Add",cart,this.getheader());
    }
    UpdateCart(Qty:number,ID:number,ProductID:number,userId:string){
        let cart = new addcart()
        cart.qty=Qty;
        cart.id = ID;
        cart.productID=ProductID
        cart.UserId = userId
        return this.http.post<ResultViewModel>("http://elsaman-001-site1.atempurl.com/CartAPI/Update",cart,this.getheader());
    }

    RempveCart(CartID:number){
        return this.http.post<ResultViewModel>("http://elsaman-001-site1.atempurl.com/CartAPI/Remove",{ID:CartID},this.getheader());
    }

}
export class addcart{
    id=0;
    productID= 5;
    qty= 1;
    UserId="";
    price=0;
    productName=""
    imageUrl!: "";
}
