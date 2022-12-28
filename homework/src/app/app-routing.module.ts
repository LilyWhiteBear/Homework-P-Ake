import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkPageComponent } from './main/link-page/link-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Routing } from './utils/constant/routing';

const routes: Routes = [
  {
    path: Routing.Common.Main,
    component: NavbarComponent,
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  {
    path: Routing.Common.Authen,
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: '**',
    component: LinkPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
