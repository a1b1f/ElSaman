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

        return this.http.get<ResultViewModel>("http://medorafie-001-site1.btempurl.com/RecipeAPI/GetAPI",this.getheader());
    }

    GetFav(){
        return this.http.get<ResultViewModel>("http://medorafie-001-site1.btempurl.com/FavAPI/Get",this.getheader());
    }
    GetRecipeById(RecipeID:number){
        return this.http.get<ResultViewModel>("http://medorafie-001-site1.btempurl.com/RecipeAPI/GetAPI?ID="+RecipeID,this.getheader());
    }
    AddFav(Recipe_ID:number,userId:string){
        let fav = new addfav()
        fav.recipe_ID = Recipe_ID;
        fav.UserId = userId
        return this.http.post<ResultViewModel>("http://medorafie-001-site1.btempurl.com/FavAPI/Add",fav,this.getheader());
    }


    RempveFav(FavID:number){
        return this.http.post<ResultViewModel>("http://medorafie-001-site1.btempurl.com/FavAPI/Remove",{ID:FavID},this.getheader());
    }

}

export class addfav{
  fav_ID=0;
  recipe_ID = 0;
  qty= 1;
  UserId="";
  price=0;
  recipe_Name="";
  recipeImg=""

}
