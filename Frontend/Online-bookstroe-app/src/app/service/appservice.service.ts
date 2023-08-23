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

  login(body : users): Observable<any>{
    return this.http.post(this.baseUrl+"login",body);
  }

  getAllBooks(): Observable<any>{
    return this.http.get(this.baseUrl+"books/?p=1");
  }

  getAuthToken() {
    return this.token;
  }

  serach(searchText : any){
    return this.http.get(this.baseUrl+"search/"+searchText)
  }
}
