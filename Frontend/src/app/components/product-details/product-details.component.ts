import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { NgxsOnInit, Store } from '@ngxs/store';
import { Cart } from 'src/app/models/Cart';
import { books } from 'src/app/models/books';
import { findBookById } from 'src/app/store/actions/app.actions';
import { AppSelectors } from 'src/app/store/selectors/app.selectors';
import { StarRatingColor } from './input-stars/input-stars.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  @SelectSnapshot(AppSelectors.getBookDetails) bookdetails!: books[];
  reviews: any = {}
  rating:number = 3;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;

  constructor(public store: Store, private router: ActivatedRoute,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.getProductById();
    this.bookdetails[0].review.forEach((element: any) => {

      this.reviews['review'] = element;

    });

  }


  getProductById() {

  }

 
}
