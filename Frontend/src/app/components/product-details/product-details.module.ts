import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ProductDetailsComponent } from './product-details.component';
import { InputStarsComponent } from './input-stars/input-stars.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [ProductDetailsComponent, InputStarsComponent],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule
  ]
})
export class ProductDetailsModule { }
