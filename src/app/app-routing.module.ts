import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
/*
import { ContactsComponent } from './components/contacts/contacts.component';
*/
import { ProfileComponent } from './components/profile/profile.component';

import { LoginRegComponent } from './login-reg/login-reg.component'
import { AuthGuard } from './routGuard/auth.guard';

const routes: Routes = [

  { path: 'login-reg', component: LoginRegComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },/*
  {
    path: 'contact',
    component: ContactsComponent,
    canActivate: [AuthGuard]
  },*/
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', component: LoginRegComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }