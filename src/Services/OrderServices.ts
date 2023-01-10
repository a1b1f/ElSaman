import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Order } from "src/ViewModels/Order";
import { ResultViewModel } from "src/ViewModels/result-view-model";


@Injectable()
export class OrderServices{

    getheader(){
        let token = localStorage.getItem("token")
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
         });
        return { headers: headers };
    }
    constructor(private http:HttpClient){}
    GetCartByUser(userId:string){
        return this.http.get<ResultViewModel>("https://localhost:7129/CartAPI/GetByUser?userId="+userId);
    }
    AddOrder(OrderDetails:Order){

        return this.http.post<ResultViewModel>("https://localhost:7129/OrderAPI/Add",OrderDetails);
    }
    GetAllOrders(userId:string){
        return this.http.get<ResultViewModel>("https://localhost:7129/OrderAPI/Get?userId="+userId);
    }
    GetAllOrderLists(OrderID:number){
        return this.http.get<ResultViewModel>("https://localhost:7129/OrderListAPI/GetByOrderID?OrderID="+OrderID);
    }
    getLastOrder(userId:string)
    {
        return  this.http.get<ResultViewModel>("https://localhost:7129/OrderAPI/GetLastOrder?userId="+userId)

    }
    GetFavByUser(userId:string){
      return this.http.get<ResultViewModel>("https://localhost:7129/FavAPI/GetByUser?userId="+userId);
  }
}



