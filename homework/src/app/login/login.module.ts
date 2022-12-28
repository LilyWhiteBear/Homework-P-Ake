import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AuthRoutingModule } from '../utils/routes/auth-routing/auth-routing.module';
import { StreamingLoginDirective } from './directive/streaming-login.directive';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
  declarations: [
    LoginPageComponent,
    StreamingLoginDirective,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    PasswordModule,
    FormsModule,
    DividerModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    ProgressSpinnerModule
  ],
  exports: [
    LoginPageComponent
  ]
})
export class LoginModule { }
