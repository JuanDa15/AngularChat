import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [
    HomeComponent,
    ChatComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    BaseRoutingModule,
    ReactiveFormsModule
  ]
})
export class BaseModule { }
