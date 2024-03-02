import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'services/auth.service';
// import { CartService } from 'services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  items: any[] = []; 

  constructor(private router: Router , public authService: AuthService) {}
 
 
  ngOnInit(): void {
   
  }


get isLoggedIn(): boolean {
  return this.authService.isLoggedIn();
}

logout() {
  this.authService.logout();
  this.router.navigate(['/login']);
}



// getUsername(): string{
//   const user = this.authService.getUser();
//   return user? user.password: '' ; 
// }

log(){
  this.authService.isLoggedIn();
}

// log(){
//   if(!this.authService.isLoggedIn()){
//     this.router.navigate(['/login']);
//   }else if(this.authService.isLoggedIn()){
//   this.router.navigate(['/home']);
// }

// }
}