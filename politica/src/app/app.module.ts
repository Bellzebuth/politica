import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DebateComponent } from './components/debate/debate.component';
import { NewsComponent } from './components/news/news.component';
import { VoteComponent } from './components/vote/vote.component';
import { ProfilComponent } from './components/profil/profil.component';
import { MenuComponent } from './components/utils/menu/menu.component';
import { Error404Component } from './components/utils/error404/error404.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
