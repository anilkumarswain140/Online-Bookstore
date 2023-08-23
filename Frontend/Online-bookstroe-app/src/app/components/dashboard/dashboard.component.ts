import { Component, OnInit } from '@angular/core';
import { Appservice } from 'src/app/service/appservice.service';
import { books } from 'src/app/models/books';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  books! : books[];
  tiles = [
    // {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    // {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    // {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    // {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
   

  ];


  constructor(private appservice: Appservice) {

  }
  ngOnInit(): void {
   this.getAllBooks();
  }

  getAllBooks() {
    this.appservice.getAllBooks().subscribe(res => {
      
      this.books = res;
      console.log(this.books);
    })
  }

  search(){
    this.appservice.serach("ddd").subscribe(result=>{
      console.log(result);
      
    })
  }
}

