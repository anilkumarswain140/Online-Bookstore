import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { addBook } from 'src/app/store/actions/app.actions';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent {
  createbookForm: any;
  constructor(private formBuilder: FormBuilder, private store: Store) {
    this.createbookForm = formBuilder.group({
      title: ["", Validators.required],
      authers: [[], Validators.required],
      shortDescription: ["", Validators.required],
      category: [[], [Validators.required]],
      price: ["", Validators.required],
      thumbnailUrl: ["", [Validators.required]],
    });
  }

  createBook(body: any) {
    this.store.dispatch(new addBook(body));
  }
}
