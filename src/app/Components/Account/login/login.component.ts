import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route,Router } from '@angular/router';
import { AccountServices } from 'src/Services/Account';
import { LoginViewModel } from 'src/ViewModels/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm:FormGroup=new FormGroup([]);
  constructor(private builder:FormBuilder,private acc:AccountServices,private router:Router) { }
  ngOnInit(): void {
    this.registerForm=this.builder.group(
      {
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    },
    )

  }
  add(){
    let log =new LoginViewModel();
    log.Email=this.registerForm.value["email"]
    log.Password=this.registerForm.value["password"]
    this.acc.login(log).subscribe(res=>{
      if(res.success){
        console.log(res.data);
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('userId',res.data.userId);
        localStorage.setItem('username',log.Email);
        this.router.navigateByUrl('/')
        console.log(res);
      }else{
        alert('try Again!!');
        console.log(res);
      }
    },err=>console.log(err))
  }

}
