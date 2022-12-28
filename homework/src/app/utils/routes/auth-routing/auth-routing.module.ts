import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routing } from '../../constant/routing';
import { LoginPageComponent } from 'src/app/login/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: Routing.Authen.Login, component: LoginPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
