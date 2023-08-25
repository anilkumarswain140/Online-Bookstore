import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Appservice } from 'src/app/service/appservice.service';
import { users } from 'src/app/models/users';
import { Store } from '@ngxs/store';
import { GetAllBooks, login } from 'src/app/store/actions/app.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  registerForm!: FormGroup;
  userData! : users[]
  constructor(private router : Router, private appservice : Appservice, private store : Store){

  }
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'email': new FormControl('anil@g.com',[Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      'password': new FormControl('anilks123', [Validators.required]),
    })
  }


  login(user : users){
        this.store.dispatch(new login(user))
      }

  

}
