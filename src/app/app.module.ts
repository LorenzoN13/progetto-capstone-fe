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
import { HttpClientModule } from '@angular/common/http';
import { OrdineComponent } from './components/ordine/ordine.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListComponent } from './pages/list/list.component';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { CartIconComponent } from './components/header/cart-icon/cart-icon.component';
import { CreaRecensioneComponent } from './components/recensioni/crea-recensione/crea-recensione.component';

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
    OrdineComponent,
    CarouselComponent,
    PaginatorComponent,
    ListComponent,
    CartIconComponent,
    CreaRecensioneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(far,fas,fab)
  }
}
