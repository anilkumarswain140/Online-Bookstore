import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { books } from 'src/app/models/books';
import { users } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class Appservice {

  constructor(private http : HttpClient) { }


  registerUser(body : users): Observable<any>{
    return this.http.post("http://localhost:3000/register",body);
  }

  login(body : users): Observable<any>{
    return this.http.post("http://localhost:3000/login",body);
  }

  getAllBooks(): Observable<any>{
    return this.http.get("http://localhost:3000/books");
  }
}
