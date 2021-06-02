import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPage } from './login/login.page';
import { AuthPage } from './auth.page';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutPage } from './logout/logout.page';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
  declarations: [LoginPage, AuthPage, LogoutPage, UnauthorizedComponent],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
})
export class AuthModule {}
