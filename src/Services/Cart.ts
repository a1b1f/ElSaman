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

        return this.http.get<ResultViewModel>("http://medorafie-001-site1.btempurl.com/RecipeAPI/GetAPI",this.getheader());
    }

    GetCart(){
        return this.http.get<ResultViewModel>("http://medorafie-001-site1.btempurl.com/CartAPI/Get",this.getheader());
    }
    GetRecipeById(RecipeID:number){
        return this.http.get<ResultViewModel>("http://medorafie-001-site1.btempurl.com/RecipeAPI/GetDetails?ID="+RecipeID,this.getheader());
    }
    AddCart(Qty:number,Recipe_ID:number,userId:string){
        let cart = new addcart()
        cart.qty=Qty;
        cart.recipe_ID = Recipe_ID;
        cart.UserId = userId
        return this.http.post<ResultViewModel>("http://medorafie-001-site1.btempurl.com/CartAPI/Add",cart,this.getheader());
    }
    UpdateCart(Qty:number,ID:number,recipeID:number,userId:string){
        let cart = new addcart()
        cart.qty=Qty;
        cart.id = ID;
        cart.recipe_ID=recipeID
        cart.UserId = userId
        return this.http.post<ResultViewModel>("http://medorafie-001-site1.btempurl.com/CartAPI/Update",cart,this.getheader());
    }

    RempveCart(CartID:number){
        return this.http.post<ResultViewModel>("http://medorafie-001-site1.btempurl.com/CartAPI/Remove",{ID:CartID},this.getheader());
    }

}
export class addcart{
    id=0;
    recipe_ID = 0;
    qty= 1;
    UserId="";
    price=0;
    recipe_Name=""

}
