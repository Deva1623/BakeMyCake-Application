import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; //for getting id from paramatere url

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from 'services/item.service';
import { Item } from 'models/data';
import { Order } from 'models/order';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit{

  color: string = "#6d6eb5";
  radius: number = 100;
//---------------------------
  orderForm: FormGroup;
  inputValue: number = 1;
  
  selectedItem: Item ;
  order:Order;
  //------------------------------
  isdataSubmitted: boolean = false;
 //-------------------------------  
  constructor(private route: ActivatedRoute , private fb: FormBuilder, private itemService: ItemService ,
     private snackbar : MatSnackBar, private router:Router, private authService: AuthService){}

  ngOnInit(): void {
   this.route.paramMap.subscribe(param => {  // listens to changes in the route parameter
    let id = param.get("id") ?? "";          //extracts the "id"
    this.itemService.getItem(id).subscribe(data => {
      this.selectedItem = data;
    
    });
  });
  this.createForm();

  if(this.authService.isLoggedIn()){
    const user = this.authService.getUser();
    if(user){
      const fullAddress = `${user.address?.street || ''}, ${user.address?.city || ''}, ${user.address?.zipCode || ''}`;
      this.orderForm.patchValue({customerName: `${user.firstName}` , email: user.email ,  contactNumber: user.phone,
    address: fullAddress });
    }
  }


  this.orderForm.get('price').valueChanges.subscribe(()=>{
    this.calculateTotal();
  });
  this.orderForm.get('quantity').valueChanges.subscribe(() => {
    this.calculateTotal();
  });
 
  }
  //------------------------------------------------
  createForm(){
  this.orderForm= this.fb.group({
    itemName: ['', Validators.required],
    quantity: [0],
    price: [0],
    total: [0],
    customerName: ['', Validators.required],
    email: ['', [Validators.required,  this.emailValidator]],
    contactNumber: ['', [Validators.required,Validators.maxLength(10), Validators.minLength(10) , Validators.pattern(/^[1-9]\d*$/)]],
    address: ['', Validators.required],
  
    specialInstructions: [''],
  });
}
//-----------------------------------------------------------------------------
onSubmit() {
  if (this.orderForm.valid) {
    const orderData = this.orderForm.value;

    this.itemService.submitOrder(orderData).subscribe(
      (response) => {
        console.log('Order Submitted:', response);
        this.orderForm.reset();
        this.snackbar.open('Order placed successfully' , 'Thank you' , {
         duration:3000,panelClass:['green-snackbar']
        })
        this.router.navigate(['feedback']);
      },
      (error) => {
        console.error('Failed to submit order:', error);
        this.snackbar.open('failed to placed order' , 'ok' , {
          duration:3000,panelClass:['red-snackbar']
         });
      }
    );
  }
}
//------------------------------------------
increaseValue(){
  this.inputValue++;
}
decreaseValue(){
  if(this.inputValue > 1){
    this.inputValue--;
  }
}
//-------------------------------------------
canDeactivate(){
  if(!this.isdataSubmitted){
    this.isdataSubmitted = confirm("You have unsaved changes. Are you sure you want to leave?");
    return this.isdataSubmitted;
  }
  return true  //leave despite unsaved changes
}
//--------------------------------------------
calculateTotal(){
  const price = this.orderForm.get('price').value;
  const quantity = this.orderForm.get('quantity').value;
  this.orderForm.get('total').setValue(price*quantity);
}
//---------------------------------------------------------
get customerName(){
  return this.orderForm.get('customerName');
}
get email(){
  return this.orderForm.get('email');
}
get contactNumber(){
  return this.orderForm.get('contactNumber');
}
get address(){
  return this.orderForm.get('address');
}

//----------------------------------------
emailValidator(control: AbstractControl): {[key:string]: boolean} | null {
  if(control.value){
    const requiredPattern = /^[^0-9][a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/;
    if(!requiredPattern.test(control.value)){
      return {invalidEmail: true}
    }
  }
  return null;
}

}
