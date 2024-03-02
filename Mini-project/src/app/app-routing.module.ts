import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderViewComponent } from './order-view/order-view.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RequestViewComponent } from './request-view/request-view.component';
import { SignuoComponent } from './signuo/signuo.component';
import { AuthGuard } from './guards/auth.guard';
import { DatalossGuard } from './guards/dataloss.guard';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [

  {path: '' , pathMatch: 'full' ,component: HomeViewComponent},
  {path: "home" , component: HomeViewComponent},
  {path: "order-view" , component: OrderViewComponent},
  {path: "order-view/:id" , component: OrderViewComponent ,canActivate:[AuthGuard], canDeactivate: [DatalossGuard]},
  {path: "login" , component: LoginComponent , canDeactivate: [DatalossGuard]},
  {path: "sign-up" , component: SignuoComponent , canDeactivate: [DatalossGuard]},
  {path: "request-view" , component: RequestViewComponent , canActivate: [AuthGuard] },
  {path: "feedback" , component: FeedbackComponent},
  {path: "**" , component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
