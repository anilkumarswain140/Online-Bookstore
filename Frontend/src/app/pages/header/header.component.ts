import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Store } from '@ngxs/store';
import { Cart } from 'src/app/models/Cart';
import { GetAllBooks, SearchBooks, getCartItems, setAuth } from 'src/app/store/actions/app.actions';
import { AppSelectors } from 'src/app/store/selectors/app.selectors';
import { AppStateModel } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() mySearch: EventEmitter<string> = new EventEmitter;
  @ViewChild('searchbar') searchbar!: ElementRef;
  searchText = '';
  sidenavWidth = 4;
  ngStyle!: string;
  toggleSearch: boolean = false;
  public isOpen: boolean = false
  @SelectSnapshot(AppSelectors.getAppState) appstate!: AppStateModel;
  @SelectSnapshot(AppSelectors.getCatItems) cartItems!: Cart[];


  constructor(private store: Store, public router : Router) { }
  openSearch() {
    this.toggleSearch = true;
    this.searchbar.nativeElement.focus();
  }
  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
    this.store.dispatch(new GetAllBooks(0))
  }

  search(event: any) {
    this.mySearch.emit(event.target.value);
  }

  onQueryPass() {
    console.log(this.searchText);
    if (this.searchText) {
      this.store.dispatch(new SearchBooks(this.searchText))
    }
    else{
      this.store.dispatch(new GetAllBooks(0))
    }
  }

  getAllCartItems() {
    this.store.dispatch(new getCartItems(this.appstate.userData[0].id))
  }

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




  toggleMenu(){
    this.isOpen = !this.isOpen
  }

  closeEmitterHandler(){
    this.isOpen = !this.isOpen
  }

  logout(){
   this.store.dispatch(new setAuth());
    this.router.navigateByUrl('/login');
  }
}
