import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountServices } from 'src/Services/Account';
import { ResultViewModel } from 'src/ViewModels/result-view-model';

@Component({
  selector: 'app-afterorder',
  templateUrl: './afterorder.component.html',
  styleUrls: ['./afterorder.component.css']
})
export class AfterorderComponent implements OnInit {


  constructor(private http:HttpClient,private acc:AccountServices) { }
  orderID:number=0;

  ngOnInit(): void {
    //Loading.next(true);
    this.getLastOrder();
  }
  getLastOrder(){
    this.http.get<ResultViewModel>("http://medorafie-001-site1.btempurl.com/OrderAPI/GetLastOrder?userId="+this.acc.getCurrentUserId())
    .subscribe(res=>{
      this.orderID=res.data;
      //Loading.next(false);
    })
  }

}
