import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { CartComponent } from './cart.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatGridListModule,
    MatIconModule,
    MatCardModule
    
  ]
})
export class CartModule { }
