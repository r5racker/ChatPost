import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegComponent } from './login-reg/login-reg.component';
import { HomeComponent } from './components/home/home.component';
import { MessagesService } from './messages.service';
import { HttpClientModule } from '@angular/common/http'
import { UserService } from './user.service';

import { ProfileComponent } from './components/profile/profile.component';
/*
import { ContactsComponent } from './components/contacts/contacts.component';
*/
@NgModule({
  declarations: [
    AppComponent,
    LoginRegComponent,
    HomeComponent,
    ProfileComponent/*,
    ContactsComponent*/
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MessagesService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
