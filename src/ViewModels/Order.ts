import { OrderItem } from "./OrderItem";

export class Order {
    id:number=0;
    orderLists:OrderItem[]=[];
    userId:string="";
    orderDate:Date=new Date();
}
