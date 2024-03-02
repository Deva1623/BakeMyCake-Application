import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderViewComponent } from '../order-view/order-view.component';
import { LoginComponent } from '../login/login.component';
import { SignuoComponent } from '../signuo/signuo.component';

@Injectable({
  providedIn: 'root'
})
export class DatalossGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      // return component.canDeactivate();
      if (component instanceof OrderViewComponent) {
        return (component as OrderViewComponent).canDeactivate();
      } 
      else if (component instanceof LoginComponent) {
        return (component as LoginComponent).canDeactivate();
      }
      else if (component instanceof SignuoComponent){
        return (component as SignuoComponent).canDeactivate();
      }
      return true;
  }
  
}
