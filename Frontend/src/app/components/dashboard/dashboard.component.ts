import { Component, OnInit } from '@angular/core';
import { Appservice } from 'src/app/service/appservice.service';
import { books } from 'src/app/models/books';
import { Store } from '@ngxs/store';
import { AppSelectors } from 'src/app/store/selectors/app.selectors';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { GetAllBooks, addToCart, filterBooks, findBookById } from 'src/app/store/actions/app.actions';
import { AppStateModel } from 'src/app/store/state/app.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @SelectSnapshot(AppSelectors.getBooks) books!: books[];
  @SelectSnapshot(AppSelectors.getAppState) appstate!: AppStateModel;
  gridColumns = 3;
  categories = ['Internet', 'Frontend', 'Java', 'Microoft'];
  ratings = ["Asc" , "Desc"];
  pagination = [1,2,3,4,5]
  query : any;
  min : any;
  max: any
  category: any;
  rating: any;
  pagenumber = 1;
  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }
  constructor(private appservice: Appservice, private store: Store,private router : Router) {

  }
  ngOnInit(): void {
    this.store.dispatch(new GetAllBooks(0));
    if (this.appstate.role == "admin") {
      this.router.navigate(["/admindashboard"]);
    }
  }

  preventClosing($event: any) {
    $event.stopPropagation();
    //Another instructions
  }

  ratingSelected(value : any){
    
    this.rating = value;
    this.filterBooks();
  }
  getSelectedcategory(value: any){
    this.category = value;
    this.filterBooks()
  }


  filterBooks(){
    this.query = "";
    if(this.min && this.max && !this.category && !this.rating){
      this.query = "min="+this.min+"&max="+this.max 
    }
    else  if(this.min && this.max && this.category && !this.rating){
      this.query = "min="+this.min+"&max="+this.max+"&category="+this.category;
    }
    else  if(this.min && this.max && !this.category && this.rating){
      this.query = "min="+this.min+"&max="+this.max+"&sort="+this.rating;
    }
    else  if(!this.min && !this.max && this.category && !this.rating){
      this.query = "min=100&max=20000&category="+this.category;
    }
    else  if(!this.min && !this.max && !this.category && this.rating){
      this.query = "min=100&max=20000&sort="+this.rating;
    }

    this.store.dispatch(new filterBooks(this.query));
  }

  reset(){
    this.store.dispatch(new GetAllBooks(0));
  }

  nextPage(pn:any){
    this.store.dispatch(new GetAllBooks(pn-1));
    this.pagenumber = pn;
  }

  addToCart(productId: any){
    let body = {
      "productId": productId
   }
    this.store.dispatch(new addToCart(this.appstate.userData[0].id,body))
  }

  goTProductDetailsPage(id: any){

       
    this.store.dispatch(new findBookById(id));

  }
}



