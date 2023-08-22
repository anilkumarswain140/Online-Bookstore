import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Appservice } from 'src/app/service/appservice.service';
import { users } from 'src/models/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  registerForm!: FormGroup;

  constructor(private router : Router, private appservice : Appservice){

  }
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'email': new FormControl(null,[Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      'password': new FormControl(null, [Validators.required]),
    })
  }


  login(user : users){
    this.appservice.login(user).subscribe(res =>{
      console.log(res);
      if(res){
        this.router.navigateByUrl("/dashboard");
      }
    })
  }

}
