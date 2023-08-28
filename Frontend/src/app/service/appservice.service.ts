import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Observable, Subject } from 'rxjs';
import { books } from 'src/app/models/books';
import { users } from 'src/app/models/users';
import { AppSelectors } from '../store/selectors/app.selectors';
import { AppStateModel } from '../store/state/app.state';

@Injectable({
  providedIn: 'root'
})
export class Appservice {
 
  baseUrl = "http://localhost:3000/";
  token : Subject<any> = new Subject();
  headers: HttpHeaders = new HttpHeaders();

  constructor(private http : HttpClient) { }


  registerUser(body : users): Observable<any>{
    return this.http.post(this.baseUrl+"register",body,{headers: this.headers});
  }

  login(body : any): Observable<any>{
    return this.http.post(this.baseUrl+"login",body);
  }

  getAllBooks(pageNumber : any): Observable<any>{
    return this.http.get(this.baseUrl+"books/?page="+pageNumber);
  }

  getAuthToken() {
    return this.token;
  }

  serach(searchText : any): Observable<any>{
    return this.http.get(this.baseUrl+"books/search/"+searchText)
  }

  filterBooks(queryString : string): Observable<any>{
    return this.http.get(this.baseUrl+"books/filter?"+queryString)
  }

  addToCart(userId : string, body : any): Observable<any>{
    return this.http.post(this.baseUrl+"cart/"+userId,body);
  }

  getAllCartItems(userId : string) : Observable<any>{
    return this.http.get(this.baseUrl+"cart/"+userId);
  }

  removeCartItem(userId : string, body : any) : Observable<any>{
    console.log(userId, body);
    
    return this.http.delete(this.baseUrl+"cart/"+userId,{body: body});
  }

  findBookById(bookId : any) : Observable<any>{
    return this.http.get(this.baseUrl+"books/"+bookId);
  }

  decreaseItemFromCart(userId: any , body : any) : Observable<any>{
    return this.http.patch(this.baseUrl+"cart/deceasequantity/"+userId,body)
  }

  increaseItemFromCart(userId: any , body : any) : Observable<any>{
    return this.http.patch(this.baseUrl+"cart/inceasequantity/"+userId,body)
  }
}
