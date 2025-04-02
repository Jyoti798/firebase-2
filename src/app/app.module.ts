import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';


import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationModule } from './auth/auth.module';
import { Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing-module';
import { SigninComponent } from './auth/components/signin/signin.component';
import { NavComponent } from './shared/components/nav/nav.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
   HttpClientModule,
FormsModule,
AuthenticationModule ,
AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
