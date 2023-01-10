import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ResultViewModel } from "src/ViewModels/result-view-model";
@Injectable()
export class productservice {
  constructor(private http:HttpClient){}
  getProduct(pageSize :number,pageIndex:number){
    return this.http.get<ResultViewModel>(`http://elsaman-001-site1.atempurl.com/ProductAPI/GetAPI?pageSize=${pageSize}&pageIndex=${pageIndex}`);
}

getProductByID(id:number){
  return this.http.get<ResultViewModel>("http://elsaman-001-site1.atempurl.com/ProductAPI/GetDetails?id="+id);

}

getProductByName(rName:string){
  return this.http.get<ResultViewModel>("http://elsaman-001-site1.atempurl.com/ProductAPI/GetAPI?nameEN="+rName);
}

getCategories(){
  return this.http.get<ResultViewModel>("http://elsaman-001-site1.atempurl.com/CategoryAPI/Get");
}
getByCategory(cName:string){
  return this.http.get<ResultViewModel>("http://elsaman-001-site1.atempurl.com/ProductAPI/GetAPI?category="+cName)
}

getRating(){
  return this.http.get<ResultViewModel>("http://elsaman-001-site1.atempurl.com/ProductAPI/GetAPI");
}
}
