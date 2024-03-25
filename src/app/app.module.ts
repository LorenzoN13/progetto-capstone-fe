import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { Pages404Component } from './pages/pages404/pages404.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { EditProfileComponent } from './pages/user-profile/edit-profile/edit-profile.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AddToShopComponent } from './components/add-to-shop/add-to-shop.component';
import { PaymentComponent } from './components/payment/payment.component';
import { StrumentiCardComponent } from './components/strumenti-card/strumenti-card.component';
import { DetailsComponent } from './pages/details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecensioniComponent } from './components/recensioni/recensioni.component';
import { BancomatComponent } from './components/payment/bancomat/bancomat.component';
import { TransferComponent } from './components/payment/transfer/transfer.component';
import { ValutazioniComponent } from './components/valutazioni/valutazioni.component';
import { HttpClientModule } from '@angular/common/http';
import { OrdineComponent } from './components/ordine/ordine.component';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateComponent,
    EditComponent,
    Pages404Component,
    UserProfileComponent,
    EditProfileComponent,
    FooterComponent,
    HeaderComponent,
    AddToShopComponent,
    PaymentComponent,
    StrumentiCardComponent,
    DetailsComponent,
    RecensioniComponent,
    BancomatComponent,
    TransferComponent,
    ValutazioniComponent,
    OrdineComponent,
    CarouselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
