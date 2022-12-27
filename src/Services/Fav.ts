import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ResultViewModel } from "src/ViewModels/result-view-model";



@Injectable()


export class favServices{
    constructor (private http:HttpClient){}
    getheader(){
        let token = localStorage.getItem("token")
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
         });
        return { headers: headers };
    }

    GetAllFav( ){

        return this.http.get<ResultViewModel>("https://localhost:7129/ProductAPI/GetAPI",this.getheader());
    }
    GetProductById(RecipeID:number){
      return this.http.get<ResultViewModel>("https://localhost:7129/ProductAPI/GetDetails?ID="+RecipeID,this.getheader());
  }

    GetFav(){
        return this.http.get<ResultViewModel>("https://localhost:7129/FavAPI/Get",this.getheader());
    }
    GetRecipeById(RecipeID:number){
        return this.http.get<ResultViewModel>("https://localhost:7129/ProductAPI/GetDetails?ID="+RecipeID,this.getheader());
    }
    AddFav(productID:number,userId:string){
        let fav = new addfav()
        fav.productID = productID;
        fav.UserId = userId
        return this.http.post<ResultViewModel>("https://localhost:7129/FavAPI/Add",fav,this.getheader());
    }


    RempveFav(FavID:number){
        return this.http.post<ResultViewModel>("https://localhost:7129/FavAPI/Remove",{ID:FavID},this.getheader());
    }

}

export class addfav{
  id=0;
  productID = 0;
  qty= 1;
  UserId="";
  price=0;
  product_Name="";
  productImg=""
  imageUrl!: "";
}
