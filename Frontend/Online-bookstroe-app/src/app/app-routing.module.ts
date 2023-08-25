import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupModule } from './components/signup/signup.module';

const routes: Routes = [

  {
    path : "",
    redirectTo : "signup",
    pathMatch : "full"
  },
  {
    path : "signup",
    loadChildren: () => import('./components/signup/signup.module').then(m => m.SignupModule)
  },

  {
    path : "login",
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)
  },

  {
    path : "dashboard",
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },

  {
    path : "cart",
    loadChildren: () => import('./components/cart/cart.module').then(m => m.CartModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
