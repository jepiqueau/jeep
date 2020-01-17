import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-htmltoprint',
  templateUrl: 'htmltoprint.page.html',
  styleUrls: ['htmltoprint.page.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class HtmltoprintPage implements OnInit {
  type: string;
  cmpt: any;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
  }
  handlePrintClick() {
    this.cmpt = document.querySelector("app-htmltoprint");
    const jeepCmpt: HTMLJeepHtmlToprintElement = this.cmpt.shadowRoot.querySelector('jeep-html-toprint');
    jeepCmpt.emitPrint();
  }
}
