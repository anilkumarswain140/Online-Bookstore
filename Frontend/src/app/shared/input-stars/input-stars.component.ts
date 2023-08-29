import { Component, ElementRef, EventEmitter, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-input-stars',
  templateUrl: './input-stars.component.html',
  styleUrls: ['./input-stars.component.css']
})
export class InputStarsComponent {
  @Input('rating') public rating: number = 3;
  @Input('starCount') public starCount: number = 5;
  @Input('color') public color: string = 'accent';



 ratingArr : any= [];

  constructor() {
  }


  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
 

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}
export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
