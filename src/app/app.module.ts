import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/log-system/login/login.component';
import { RegisterComponent } from './pages/log-system/register/register.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { Pages404Component } from './pages/pages404/pages404.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { EditProfileComponent } from './pages/user-profile/edit-profile/edit-profile.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AddToShopComponent } from './components/add-to-shop/add-to-shop.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { StrumentiCardComponent } from './components/strumenti-card/strumenti-card.component';
import { DetailsComponent } from './pages/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CreateComponent,
    EditComponent,
    Pages404Component,
    UserProfileComponent,
    EditProfileComponent,
    FooterComponent,
    HeaderComponent,
    AddToShopComponent,
    CartComponent,
    PaymentComponent,
    StrumentiCardComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
