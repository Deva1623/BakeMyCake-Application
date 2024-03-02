import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService , private router:Router , private snackBar: MatSnackBar){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (!this.authService.isLoggedIn()) {
      this.snackBar.open('You have To login First.', 'Close', { duration: 3000 });
      this.router.navigate(['login']);
      return false;
    } 
   

     if (this.authService.isAuthorised()) {
      this.snackBar.open('You are Authorised.', 'Close', { duration: 3000 });
      return true;
     }else if (this.authService.getUser()?.role === 'user') {
      if (state.url === '/request-view') {
        this.snackBar.open('You are not authorized to access the "request view."', 'Close', { duration: 3000 });
        this.router.navigate(['home']);
        return false;
      }
      return true;


    } else {
      return false;
    }

    
  }
}



// if (!this.authService.isLoggedIn()) {
//   this.snackBar.open('You have To login First.', 'Close', { duration: 3000 });
//   this.router.navigate(['login']);
//   return false;
// } else if (!this.authService.isAuthorised()) {
//   this.snackBar.open('You are not Authorised.', 'Close', { duration: 3000 });
//   this.router.navigate(['home']); 
//   return false;

  
// } else {
//   return true;
// }
// }

// //     if (!this.authService.isLoggedIn()) {
// //       this.router.navigate(['login']);
// //       return false;
// //     }

// //     const userRole = this.authService.getUserRole();

// //     if (route.data && route.data['adminOnly']) {  //&& route.data['adminOnly']
// //       if (userRole === 'admin') {
// //         this.router.navigate(['/request-view']);
// //         return true;
// //       } else {
// //  return false;
// //       }
// //     }

// return true;
// //   }
