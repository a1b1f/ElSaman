import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ResultViewModel } from "src/ViewModels/result-view-model";
@Injectable()
export class productservice {
  constructor(private http:HttpClient){}
  getProduct(pageSize :number,pageIndex:number){
    return this.http.get<ResultViewModel>(`https://localhost:7129/ProductAPI/GetAPI?pageSize=${pageSize}&pageIndex=${pageIndex}`);
}

getProductByID(id:number){
  return this.http.get<ResultViewModel>("https://localhost:7129/ProductAPI/GetDetails?id="+id);

}

getProductByName(rName:string){
  return this.http.get<ResultViewModel>("https://localhost:7129/ProductAPI/GetAPI?nameEN="+rName);
}

getCategories(){
  return this.http.get<ResultViewModel>("https://localhost:7129/CategoryAPI/Get");
}
getByCategory(cName:string){
  return this.http.get<ResultViewModel>("https://localhost:7129/ProductAPI/GetAPI?category="+cName)
}

getRating(){
  return this.http.get<ResultViewModel>("https://localhost:7129/ProductAPI/GetAPI");
}
}
