import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { ResultViewModel } from "src/ViewModels/result-view-model";


@Injectable()
export class StoreService
{
    constructor(private Http:HttpClient) { }
    getStore(pageSize :number,pageIndex:number){
        return this.Http.get<ResultViewModel>(`https://localhost:7129/StoreAPI/Get?pageSize=${pageSize}&pageIndex=${pageIndex}`);
    }
    getStoreByName(rName:string){
        return this.Http.get<ResultViewModel>("https://localhost:7129/StoreAPI/Get?nameEN="+rName);
    }
    getStoreByID(id:number){
        return this.Http.get<ResultViewModel>("https://localhost:7129/StoreAPI/Get?id="+id);

    }

    Show(StoreID:number){
        return this.Http.get<ResultViewModel>("https://localhost:7129/RecipeAPI/GetAPI?ResturantID="+StoreID);
    }

}
