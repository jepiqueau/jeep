import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-flipimages',
  templateUrl: 'flipimages.page.html',
  styleUrls: ['flipimages.page.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class FlipimagesPage implements OnInit {
  type: string;
  constructor() { }

  ngOnInit() {
      this.type = "horizontal";
      console.log('this.type ',this.type)
  }

}
