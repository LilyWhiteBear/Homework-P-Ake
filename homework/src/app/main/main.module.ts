import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkPageComponent } from './link-page/link-page.component';
import { MainRoutingModule } from '../utils/routes/main-routing/main-routing.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';
import { ValidateFormComponent } from './validate-form/validate-form.component';
import { CidFormDirective } from './directive/cid-form.directive';
import { EmailFormDirective } from './directive/email-form.directive';
import { BaseFormDirective } from './directive/base-form.directive';
import { AccountFormDirective } from './directive/account-form.directive';
import { OtpFillerDirective } from './directive/otp-filler.directive';
import { PersonalStepComponent } from './steps/personal-step/personal-step.component';
import { PaymentStepComponent } from './steps/payment-step/payment-step.component';
import { OtpStepComponent } from './steps/otp-step/otp-step.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    LinkPageComponent,
    CalendarComponent,
    TableComponent,
    ValidateFormComponent,
    CidFormDirective,
    EmailFormDirective,
    BaseFormDirective,
    AccountFormDirective,
    OtpFillerDirective,
    PersonalStepComponent,
    PaymentStepComponent,
    OtpStepComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ProgressSpinnerModule,
    InputTextModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    StepsModule
  ],
  exports: [
    LinkPageComponent
  ]
})
export class MainModule { }
