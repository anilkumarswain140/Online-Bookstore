import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent {
updateCustomerForm: any;
constructor(private formBuilder: FormBuilder,){
  this.updateCustomerForm = this.formBuilder.group({
    id: [""],
    name: ["", Validators.required],
    phone: [""],
    email: ["", Validators.email],
    age : [],
    address: []
  });
}

updateBook(){
  
}
}
