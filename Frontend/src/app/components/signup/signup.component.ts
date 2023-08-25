import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Appservice } from 'src/app/service/appservice.service';
import { users } from 'src/app/models/users';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(private appservice : Appservice ,private router : Router){
    
  }

  ngOnInit(): void {
    
    this.registerForm = new FormGroup({
      'username': new FormControl(null,[Validators.required]),
      'email': new FormControl(null,[Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      'password': new FormControl(null, [Validators.required]),
    })
    
  }
submit(user : users){
 
  this.appservice.registerUser(user).subscribe(res =>{
    console.log(res);
    if(res){
      this.router.navigateByUrl('login');
    }
  })
}


}
