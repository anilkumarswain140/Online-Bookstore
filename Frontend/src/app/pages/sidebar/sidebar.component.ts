import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Store } from '@ngxs/store';
import { getCartItems, setAuth } from 'src/app/store/actions/app.actions';
import { AppSelectors } from 'src/app/store/selectors/app.selectors';
import { AppStateModel } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  links = [
    {
      path: 'dashboard',
      name: 'Dashboard',
      icon: 'home'
    },
    
    {
      path: 'profile',
      name: 'profile',
      icon: 'person_pin'
    },
  ]
  public isOpen: boolean = false
  @Output() closeEmitter = new EventEmitter()
  @SelectSnapshot(AppSelectors.getAppState) appstate!: AppStateModel;
  constructor(private router:Router, private store : Store) { }

  ngOnInit() {
  }

  closeEventEmitter(){
    this.closeEmitter.emit()
    this.isOpen = false;
    
  }
  getAllCartItems() {
    this.store.dispatch(new getCartItems(this.appstate.userData[0].id))
    this.closeEventEmitter();

  }
  navigateTo(path:string){
    this.router.navigate([path])
    this.closeEventEmitter()
    this.closeEventEmitter();

  }

  logout(){
    this.store.dispatch(new setAuth());
     this.router.navigateByUrl('/login');
     this.closeEventEmitter();
   }
}
