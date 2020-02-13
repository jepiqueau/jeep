import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-htmltoprint',
  templateUrl: 'htmltoprint.page.html',
  styleUrls: ['htmltoprint.page.scss'],
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
    const jeepCmpt: HTMLJeepHtmlToprintElement = this.cmpt.querySelector('jeep-html-toprint');
    jeepCmpt.emitPrint();
  }
}
