import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() mySearch: EventEmitter<string> = new EventEmitter;
  @ViewChild('searchbar') searchbar! : ElementRef;
  searchText = '';
  sidenavWidth = 4;
  ngStyle!: string;
  toggleSearch: boolean = false;
  openSearch() {
    this.toggleSearch = true;
    this.searchbar.nativeElement.focus();
  }
  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
  }

  search(event: any) {
    this.mySearch.emit(event.target.value);
  }
}
