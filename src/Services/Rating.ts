import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Rating } from "src/ViewModels/Rating";
import { ResultViewModel } from "src/ViewModels/result-view-model";


@Injectable()


export class RatingServices{
    constructor (private http:HttpClient){}
    getheader(){
        let token = localStorage.getItem("token")
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
         });
        return { headers: headers };
    }


    AddRate(value:number,Recipe_ID:number,userId:string){
      let rate = new Rating()
      rate.RatingValue=value;
      rate.RecipeID = Recipe_ID;
      rate.UserID = userId
      return this.http.post<ResultViewModel>("http://elsaman-001-site1.atempurl.com/RatingAPI/Add",rate,this.getheader());

    }


  }
