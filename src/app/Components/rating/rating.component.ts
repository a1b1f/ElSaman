import { Component, Input, OnInit } from '@angular/core';
import { AccountServices } from 'src/Services/Account';
import { RatingServices } from 'src/Services/Rating';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() value:number=0;
  @Input() recipeId:number=0;
  emptystar:number=0;
  constructor(private acc :AccountServices , private rate: RatingServices) { }
  ngOnInit(): void {
   // this.emptystar=5-this.value;
  }
  // getemptyStar():boolean{
  //   this.emptystar--
  //   return this.emptystar>=0;
  // }

  // getStar():boolean{
  //   this.value--
  //   return this.value>=0;
  // }

  changerate(value:number){
    console.log(this.recipeId,value)
////
  }

  Addrate(value:number) {
    this.rate.AddRate(this.value,this.recipeId,this.acc.getCurrentUserId()).subscribe(res=>console.log(res));
  }

}
