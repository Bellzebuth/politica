import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components import
import { DebateComponent } from './components/debate/debate.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewsComponent } from './components/news/news.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RegisterComponent } from './components/register/register.component';
import { VoteComponent } from './components/vote/vote.component';
import { Error404Component } from './components/utils/error404/error404.component';

// Guard imports
import { ProfilGuard } from "../app/security/profil.guard";
import { LoginGuard } from '../app/security/login.guard';
import { DebateGuard } from '../app/security/debate.guard';
import { RootGuard } from '../app/security/root.guard';
import { NewsGuard } from '../app/security/news.guard';
import { VoteGuard } from '../app/security/vote.guard';
import { RegisterGuard } from '../app/security/register.guard';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {
    path:'profil',
    component:ProfilComponent,
    canActivate:[ProfilGuard],
  },
  {
    path:'debate',
    component:DebateComponent,
    canActivate:[DebateGuard],
  },
  {path:'news', component: NewsComponent},
  {path:'vote', component: VoteComponent},
  {path:'login',component:LoginComponent},
  {path:'register', component: RegisterComponent},
  
  {
    path: 'root',
    loadChildren: () => import('./root/root.module').then(m => m.RootModule),
    canActivate:[RootGuard],
    canLoad:[RootGuard]
  },
  {path:"**", component: Error404Component}
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
