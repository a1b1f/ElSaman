import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServices } from 'src/Services/Account';
import { SignUpViewModel } from 'src/ViewModels/SignUp';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  formSubmitted?:boolean;

  constructor(private builder:FormBuilder,private acc:AccountServices,private router:Router) { }
  signUpForm:FormGroup=new FormGroup(
    {
      nameAr:new FormControl('',[Validators.required,Validators.minLength(1)]),
      email:new FormControl('',Validators.email),
      password:new FormControl('',Validators.required),
      ConfirmPassword:new FormControl('',Validators.required),
      image:new FormControl(''),
      phone:new FormControl('',[Validators.required,Validators.maxLength(11)]),
    });

  ngOnInit(): void {
  }


  add(){
    this.formSubmitted=true;
    let SignUP =new SignUpViewModel();
    SignUP.nameEN=this.signUpForm.value["nameEn"];
    SignUP.nameAR=this.signUpForm.value["nameAr"];
    SignUP.Role="User";
    SignUP.email=this.signUpForm.value["email"];
    SignUP.password=this.signUpForm.value["password"];
    SignUP.ConfirnmPassword=this.signUpForm.value["ConfirmPassword"];
    SignUP.phone=this.signUpForm.value["phone"];
    SignUP.image=this.signUpForm.value["image"];
    console.log(this.signUpForm)

    if(this.signUpForm.valid){
      console.log(SignUP);

      this.acc.SignUp(SignUP,'User').subscribe(res=>{
        console.log(res)
        console.log('www')
        if(res.success){
          this.router.navigateByUrl('login')
        }
        else{
          console.log(res)
          console.log('res')
          alert('Try again!!!!!!!')
          console.log(this.signUpForm.errors)
        }
      },err=>{
        console.log(err);
      })
    }
  }

  onPasswordChange() {
    if (this.confirm_password.value == this.password.value) {
      this.confirm_password.setErrors(null);
    } else {
      this.confirm_password.setErrors({ mismatch: true });
    }
  }

  get password() {
    return this.signUpForm.controls['password'];
  }

  get confirm_password() {
    return this.signUpForm.controls['ConfirmPassword'];
  }



}
