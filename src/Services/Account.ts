import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { EditProfileViewModel } from "src/ViewModels/EditProfileViewModel";
import { LoginViewModel } from "src/ViewModels/Login";
import { ResultViewModel } from "src/ViewModels/result-view-model";
import { SignUpViewModel } from "src/ViewModels/SignUp";


@Injectable()
export class AccountServices{
  Logged:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    constructor(private http:HttpClient){
      this.Logged.next(this.IsLoggedIn());
    }

    getLooggedStatus(){
      return this.Logged.asObservable();
   }
   setLooggedStatus(status:boolean){
       return this.Logged.next(status);
    }
getCurrentUserId():string{
   return localStorage.getItem("userId")??""
  //return "0390521a-4c6b-4ad0-a45c-6b0a15167719"
}
    login(log:LoginViewModel){
      return this.http.post<ResultViewModel>("http://elsaman-001-site1.atempurl.com/UserAPI/SignIn",log);
    }

    SignUp(log:SignUpViewModel,Role:string){
      let signup=new SignUpViewModel()
      signup.Role=Role;

      return this.http.post<ResultViewModel>("http://elsaman-001-site1.atempurl.com/UserAPI/SignUp",log);
    }

    EditProfile(log:EditProfileViewModel,userid:string){
      let Editprofile=new EditProfileViewModel()
      return this.http.post<ResultViewModel>("http://elsaman-001-site1.atempurl.com/UserAPI/Edit",log);
    }


    LogOut(token:string){
      return this.http.post<ResultViewModel>("http://elsaman-001-site1.atempurl.com/UserAPI/SignOut",{token:token});
    }

    IsLoggedIn():boolean{
      let token =localStorage.getItem('token')
      if(token != null){
          return true;
      }
      return false;
  }
  GetUserInfo(ID:string ){
    return this.http.get<ResultViewModel>("http://elsaman-001-site1.atempurl.com/UserAPI/GetById?ID="+ID)}

}
