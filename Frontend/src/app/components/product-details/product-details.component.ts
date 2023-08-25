import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { NgxsOnInit, Store } from '@ngxs/store';
import { Cart } from 'src/app/models/Cart';
import { books } from 'src/app/models/books';
import { findBookById } from 'src/app/store/actions/app.actions';
import { AppSelectors } from 'src/app/store/selectors/app.selectors';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  id: any;
  @SelectSnapshot(AppSelectors.getBookDetails) bookdetails!: books[];

constructor(public store : Store,private router : ActivatedRoute){}
  ngOnInit(): void {
   this.id=  this.router.snapshot.params['id'];
   this.getProductById();
   console.log("deatails pae",this.bookdetails);
   
  }

  getProductById(){
    console.log(this.id);
 
  }
}
