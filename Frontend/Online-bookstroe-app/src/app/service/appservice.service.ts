import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { books } from 'src/app/models/books';
import { users } from 'src/app/models/users';

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
    return this.http.post(this.baseUrl+userId,body);
  }

  getAllCartItems(userId : string) : Observable<any>{
    return this.http.get(this.baseUrl+userId);
  }

  removeCartItem(userId : string, body : any) : Observable<any>{
    console.log(userId, body);
    
    return this.http.delete(this.baseUrl+userId,body);
  }
}
