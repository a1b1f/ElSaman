import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServices } from 'src/Services/Account';
import { OrderServices } from 'src/Services/OrderServices';
import { EditProfileViewModel } from 'src/ViewModels/EditProfileViewModel';
import { Order } from 'src/ViewModels/Order';
import { SignUpViewModel } from 'src/ViewModels/SignUp';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private builder:FormBuilder,private acc:AccountServices,private router:Router,
    private order:OrderServices, private http:HttpClient) { }
 form:FormGroup=new FormGroup([]);
 Order:Order=new Order();
 profile:SignUpViewModel = new SignUpViewModel();
 id:string=this.acc.getCurrentUserId();

 ngOnInit(): void {

   this.profileInfo()
   this.form=this.builder.group(
     {
       NameEN:['',[Validators.required]],
       NameAR:['',[Validators.required]],
       Role:['',[Validators.required]],
       Email:['',[Validators.required]],
       Phone:['',[Validators.required]],

   });
   this.getLastOrder();

 }
 profileInfo(){
   this.acc.GetUserInfo(this.acc.getCurrentUserId()).subscribe(res =>{
     console.log(res)
     this.profile=res.data[0]

   })
 }
getLastOrder(){
 this.order.GetAllOrders(this.id).subscribe(res=>{
   console.log(res.data)
   this.Order=res.data.data[0];
 },err=>console.log(err) )
}

 add(){
   let SignUP =new EditProfileViewModel();
   SignUP.NameAR=this.form.value["NameAR"];
   SignUP.password=this.form.value["Email"];
   SignUP.phone=this.form.value["Phone"];
   SignUP.Role="User";
   SignUP.id=this.acc.getCurrentUserId();
   console.log(SignUP);

   this.acc.EditProfile(SignUP,this.acc.getCurrentUserId()).subscribe(res=>{
   //this.acc.EditProfile(SignUP,'Admin').subscribe(res=>{
     console.log(res)
     console.log(this.acc.getCurrentUserId())
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
