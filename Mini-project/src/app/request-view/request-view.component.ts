import { Component , OnInit} from '@angular/core';
import { Order } from 'models/order';
import { AdminordersService } from 'services/adminorders.service';
 import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.component.html',
  styleUrls: ['./request-view.component.css']
})
export class RequestViewComponent implements OnInit{
   
  orders: Order[] = [];
  displayedColumns: string[] = ['itemName','quantity','price','total','customerName','email','contactNumber','address','specialInstructions', 'actions'];
//-----------------------------------------------------------------------------

  constructor(private orderService: AdminordersService , private snackbar: MatSnackBar){}
  ngOnInit(): void {
   this.fetchOrders();
  }
  //----------------------------------------------------------------------------
   fetchOrders(){
    this.orderService.getOrders().subscribe(
      (data)=>{
        console.log('Fetched data:', data);
        this.orders = data;

      },
      (error)=>{
        console.error(error);
      }
    );
   }
//-----------------------------------------------------------------------------
processOrder(order:Order){
  this.orderService.markAsProcessed(order.id).subscribe(
    ()=>{
      order.processed = true;
      
      this.snackbar.open('Order processed successfully', 'Done', {duration: 5000});
    },
    (error)=>{
      console.error(error);
      this.snackbar.open('Something Went Wrong' , 'OK' , {duration:3000});
    }
  );
}
}




















/* removeOrder(order: Order){
  this.orderService.deleteOrder(order.id).subscribe(
    ()=>{
      const indexPosition = this.orders.findIndex((ord)=> ord.id === order.id);
      if(indexPosition){
        this.orders.splice(indexPosition , 1);
      }
      this.snackbar.open('Order processed successfully' , 'Done' ,{
        duration: 5000
      });
    },
    (error: any)=>{
      console.error(error);
    }
  );
}*/