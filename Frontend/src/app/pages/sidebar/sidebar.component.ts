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
      path: 'ships',
      name: 'Ships',
      icon: 'waves'
    },
    {
      path: 'tasks',
      name: 'Tasks',
      icon: 'view_list'
    },
    {
      path: 'hosts',
      name: 'Hosts',
      icon: 'group'
    },
    {
      path: 'expenses',
      name: 'Expenses',
      icon: 'monetization_on'
    }
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
