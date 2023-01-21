import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AccountServices } from 'src/Services/Account';
import { SignUpViewModel } from 'src/ViewModels/SignUp';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  AccountName:string="";
  navbarCollapsed = true

  @Input() accountname:SignUpViewModel= new SignUpViewModel();

  constructor(private LogOutt: AccountServices, private http: HttpClient) {
    // this.LogOutt.getLooggedStatus().subscribe(
    //   res => this.isloog = res
    // )
  }
  isloog = true;

  ngOnInit(): void {
    this.LogOutt.getLooggedStatus().subscribe(
      res => {
        this.isloog = res        
        
      }
    )

  }
  LogOut() {
    let token = localStorage.getItem("token");
    this.LogOutt.LogOut(token!).subscribe(res => { console.log(res) })
    this.LogOutt.setLooggedStatus(false);
    localStorage.removeItem("token");
  }

  getName(valu:string){
    console.log(this.accountname.nameEN);
console.log(this.AccountName);
    // this.AccountName=valu;
  }

}
