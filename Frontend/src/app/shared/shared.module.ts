import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputStarsComponent } from './input-stars/input-stars.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
     ],
    declarations: [
        InputStarsComponent
    ],
    exports: [
        InputStarsComponent
    ]
})
export class SharedModule {}