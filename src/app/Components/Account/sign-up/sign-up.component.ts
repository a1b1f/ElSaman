import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServices } from 'src/Services/Account';
import { SignUpViewModel } from 'src/ViewModels/SignUp';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private builder:FormBuilder,private acc:AccountServices,private router:Router) { }
  form:FormGroup=new FormGroup([]);

  ngOnInit(): void {
    this.form=this.builder.group(
      {
        NameEN:['',[Validators.required]],
        NameAR:['',[Validators.required]],
        Role:['',[Validators.required]],
        Email:['',[Validators.required]],
        Password:['',[Validators.required]],
        ConfirmPassword:['',[Validators.required],],
        Phone:['',[Validators.required],Validators.maxLength(11)],
    });
  }


  add(){
    let SignUP =new SignUpViewModel();
    SignUP.nameEN=this.form.value["NameEN"];
    SignUP.nameAR=this.form.value["NameAR"];
    SignUP.Role="User";
    SignUP.email=this.form.value["Email"];
    SignUP.Password=this.form.value["Password"];
    SignUP.ConfirnmPassword=this.form.value["ConfirmPassword"];
    SignUP.phone=this.form.value["Phone"];
    console.log(SignUP);

    this.acc.SignUp(SignUP,'Admin').subscribe(res=>{
      console.log(res)
      console.log('www')
      if(res.success){
        this.router.navigateByUrl('UserAPI/SignIn')
      }
      else{
        console.log(res)
        console.log('res')
        alert('Try again!!!!!!!')
        console.log(this.form.errors)
      }
    },err=>{
      console.log(err);
    })
  }

  onPasswordChange() {
    if (this.confirm_password.value == this.password.value) {
      this.confirm_password.setErrors(null);
    } else {
      this.confirm_password.setErrors({ mismatch: true });
    }
  }

  get password() {
    return this.form.controls['Password'];
  }

  get confirm_password() {
    return this.form.controls['ConfirmPassword'];
  }

}
