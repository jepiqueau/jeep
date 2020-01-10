import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-stretchyheader',
  templateUrl: './stretchyheader.page.html',
  styleUrls: ['./stretchyheader.page.scss'],
})
export class StretchyheaderPage implements OnInit {
  @HostListener('document:jeepStretchyHeaderToolbar', ['$event'])
  jeepStretchyHeaderToolbarHandler(event: CustomEvent) {
    const toolbar = document.querySelector('ion-toolbar')
    if(toolbar) toolbar.style.setProperty("--ion-color-base", `${event.detail.color}`,"important");
    if(toolbar) toolbar.style.setProperty("--ion-color-contrast", `${event.detail.contrastColor}`,"important");

  }

  constructor() { }

  ngOnInit() {
  }

}
