import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'services/auth.service';

import { NgForm } from '@angular/forms';
import { DatalossGuard } from '../guards/dataloss.guard';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent {

 email:  string = '';
 password: string = ''; 
 
//  isLoading:boolean = false;
isdataSubmitted: boolean = false;

 @ViewChild('loginForm') loginForm: NgForm; 

constructor(private authService : AuthService, private router: Router , private snackbar: MatSnackBar ){}

onSubmit() {
  if (this.loginForm.valid) {
    const message = this.authService.login(this.loginForm.value.email, this.loginForm.value.password);

    if (message === 'logout not done') {
      this.snackbar.open(message, 'Close', {duration: 3000,});
      this.loginForm.reset();

    } else if (message === 'invalid credential') {
      this.snackbar.open(message, 'Close', {duration: 3000,});
      this.loginForm.reset();
      
    } else {
      const user = this.authService.getUser();
      if (user) {
        if (user.role === 'user') {
          this.router.navigate(['home']);
        } else if (user.role === 'admin') {
          this.router.navigate(['request-view']);
        }
        this.snackbar.open('Login success', 'Close', {duration: 3000,});
      }
    }
  }
  
}

canDeactivate(){
  if(!this.isdataSubmitted){
    this.isdataSubmitted = confirm("You have unsaved changes. Are you sure you want to leave?");
    return this.isdataSubmitted;
  }
  return true  //leave despite unsaved changes
}

}


































// onSubmit(){
//   const user = this.authService.login(this.email, this.password);
//   if(user){
//     if(user.role === 'user'){
//       this.snackbar.open('Welcome user Now you can place your order', 'OK', {
//         duration: 5000 , panelClass: ['green-snackbar'],
//      });
//       this.router.navigate(['home']);

//     }else if(user.role === 'admin'){
//       this.router.navigate(['request-view']);
//       this.snackbar.open('Welcome Admin Now you can See orders placed by Customer', 'OK', {
//         duration: 5000 , panelClass: ['green-snackbar'],
//     });
//     // this.router.navigate(['/request-view']);
//   }else{
//     this.snackbar.open('User does not exist', 'OK', {
//       duration: 5000
//   });
//   }
  
// }

