import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//---------extra imports------------------------------------------------
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ImageCardsComponent } from './home-view/image-cards/image-cards.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { ImageService } from 'services/image.service';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SearchComponent } from './home-view/search/search.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { CategoryFilterComponent } from './home-view/category-filter/category-filter.component';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRippleModule} from '@angular/material/core';
import { RequestViewComponent } from './request-view/request-view.component';
import { MatTableModule } from '@angular/material/table';
import { SignuoComponent } from './signuo/signuo.component';
import { MatRadioModule } from '@angular/material/radio';
import {MatBadgeModule} from '@angular/material/badge';
import { AuthService } from 'services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { FeedbackComponent } from './feedback/feedback.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeViewComponent,
    ImageCardsComponent,
    LoginComponent,
    SearchComponent,
    OrderViewComponent,
    CategoryFilterComponent,
    PageNotFoundComponent,
    RequestViewComponent,
    SignuoComponent,
    FeedbackComponent,
         
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatRadioModule,
    MatBadgeModule,
    MatRippleModule,
    MatCheckboxModule,
    MatAutocompleteModule
  
  ],
  providers: [ImageService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
