import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from 'src/app/main/calendar/calendar.component';
import { LinkPageComponent } from 'src/app/main/link-page/link-page.component';
import { PaymentComponent } from 'src/app/main/payment/payment.component';
import { OtpStepComponent } from 'src/app/main/steps/otp-step/otp-step.component';
import { PaymentStepComponent } from 'src/app/main/steps/payment-step/payment-step.component';
import { PersonalStepComponent } from 'src/app/main/steps/personal-step/personal-step.component';
import { TableComponent } from 'src/app/main/table/table.component';
import { ValidateFormComponent } from 'src/app/main/validate-form/validate-form.component';
import { Routing } from '../../constant/routing';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: Routing.Main.Link, component: LinkPageComponent},
      { path: Routing.Main.Calendar, component: CalendarComponent },
      { path: Routing.Main.Table, component: TableComponent}, 
      { 
        path: Routing.Main.Form, component: ValidateFormComponent,
        children: [
          { path: Routing.Main.Steps.Step1, component: PersonalStepComponent },
          { path: Routing.Main.Steps.Step2, component: PaymentStepComponent },
          { path: Routing.Main.Steps.Step3, component: OtpStepComponent },
        ] 
      },
      { path: Routing.Main.Payment, component: PaymentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
