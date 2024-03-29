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
import { StrumentiCardComponent } from './components/strumenti-card/strumenti-card.component';
import { DetailsComponent } from './pages/details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecensioniComponent } from './components/recensioni/recensioni.component';
import { HttpClientModule } from '@angular/common/http';
import { CarouselComponent } from './components/carousel/carousel.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListComponent } from './pages/list/list.component';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { CreaRecensioneComponent } from './components/recensioni/crea-recensione/crea-recensione.component';
import { SpedizioniComponent } from './components/spedizioni/spedizioni.component';
import { ServizioclientiComponent } from './components/servizioclienti/servizioclienti.component';
import { ResierimborsiComponent } from './components/resierimborsi/resierimborsi.component';

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
    StrumentiCardComponent,
    DetailsComponent,
    RecensioniComponent,
    CarouselComponent,
    PaginatorComponent,
    ListComponent,
    CreaRecensioneComponent,
    SpedizioniComponent,
    ServizioclientiComponent,
    ResierimborsiComponent,
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
