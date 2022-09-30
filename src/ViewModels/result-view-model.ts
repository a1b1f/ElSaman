export class ResultViewModel{
  success:boolean=false;
  IsAuthorized:boolean=false;
  Message:string='';
  data:any;
}
export class PagingViewModel{
  pageIndex:number=1;
  pageSize:number = 5;
  count:number=1;
  data :any;
}
