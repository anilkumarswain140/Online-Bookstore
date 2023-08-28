import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

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
      path: 'cart',
      name: 'cart',
      icon: 'add_shopping_cart'
    },
    {
      path: 'profile',
      name: 'profile',
      icon: 'person_pin'
    },
  ]
  public isOpen: boolean = false
  @Output() closeEmitter = new EventEmitter()

  constructor(private router:Router) { }

  ngOnInit() {
  }

  closeEventEmitter(){
    this.closeEmitter.emit()
    this.isOpen = false;
    
  }

  navigateTo(path:string){
    this.router.navigate([path])
    this.closeEventEmitter()
  }
}
