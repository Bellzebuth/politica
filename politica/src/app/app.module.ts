import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

//import Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DebateComponent } from './components/debate/debate.component';
import { NewsComponent } from './components/news/news.component';
import { VoteComponent } from './components/vote/vote.component';
import { ProfilComponent } from './components/profil/profil.component';
import { MenuComponent } from './utils/menu/menu.component';
import { Error404Component } from './utils/error404/error404.component';

//import primeNG
import { AvatarModule } from "primeng/avatar";
import { CardModule } from 'primeng/card';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    DebateComponent,
    NewsComponent,
    VoteComponent,
    ProfilComponent,
    MenuComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AvatarModule,
    CardModule,
    AutoCompleteModule,
    InputTextModule,
    ButtonModule,
    InputSwitchModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
