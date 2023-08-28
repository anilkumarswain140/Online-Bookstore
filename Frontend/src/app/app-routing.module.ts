import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupModule } from './components/signup/signup.module';
import { AuthGuard } from './service/auth.guard';

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
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },

  {
    path : "cart",
    loadChildren: () => import('./components/cart/cart.module').then(m => m.CartModule),
    canActivate: [AuthGuard]
  },

  {
    path : "productdetails",
    loadChildren: () => import('./components/product-details/product-details.module').then(m => m.ProductDetailsModule),
    canActivate: [AuthGuard]
  },

  {
    path : "admindashboard",
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path : "profile",
    loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path : "placeorder",
    loadChildren: () => import('./components/order/order.module').then(m => m.OrderModule),
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
