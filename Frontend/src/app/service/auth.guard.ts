import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { AppSelectors } from '../store/selectors/app.selectors';
import { AppStateModel } from '../store/state/app.state';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
   
  @SelectSnapshot(AppSelectors.getAppState) appstate!: AppStateModel;
  constructor(
    private router: Router) { }
canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> {
    var isAuthenticated = this.appstate.isAutherized;
    var role = this.appstate.role;
    if (!isAuthenticated) {
        this.router.navigate(['/login']);
    }
    // if(isAuthenticated || role == 'admin'){
    //   this.router.navigate(['/admindashboard']);

    // }
    return isAuthenticated;
}
  
}
