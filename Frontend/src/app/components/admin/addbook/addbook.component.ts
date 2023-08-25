import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent {
createbookForm: any;
constructor(private formBuilder: FormBuilder,){
  this.createbookForm = formBuilder.group({
    id: [0],
    name: ["", Validators.required],
    phone: [""],
    email: ["", Validators.email],
    age : ["", [Validators.min(0), Validators.max(100), Validators.pattern('^[0-9]*')]],
    address: []
  });
}

createBook(){}
}
