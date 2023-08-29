import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Store } from '@ngxs/store';
import { books } from 'src/app/models/books';
import { StarRatingColor } from 'src/app/shared/input-stars/input-stars.component';
import { AppSelectors } from 'src/app/store/selectors/app.selectors';


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
