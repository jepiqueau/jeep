import { h, Component, Listen, Element } from '@stencil/core';


@Component({
  tag: 'app-stretchyheader-viewme',
  styleUrl: 'app-stretchyheader-viewme.css',
  shadow:true
})
export class AppStretchyheaderViewme {
  @Element() el!: HTMLAppStretchyheaderElement;

    @Listen('jeepStretchyHeaderToolbar')
    jeepStretchyHeaderToolbarHandler(event: CustomEvent) {
      const toolbar = this.el.shadowRoot.querySelector('ion-toolbar')
      if(toolbar) toolbar.style.setProperty("--ion-color-base", `${event.detail.color}`,"important");
      if(toolbar) toolbar.style.setProperty("--ion-color-contrast", `${event.detail.contrastColor}`,"important");
    }


    render() {
  
      return [
        <jeep-stretchy-header headerheight="25%" 
        headerbackground="linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.75)) , 
        url(https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/italy-mountains.jpeg)"
        headerbackgroundblur toolbarcontrastcolor="#ffffff">
          <ion-header>
            <ion-toolbar id="toolbar" color="light">
              <ion-buttons slot="start">
                <ion-back-button icon="arrow-round-back" defaultHref="/stretchyheader"></ion-back-button>
              </ion-buttons>
                <ion-title>Stretchy Header</ion-title>
            </ion-toolbar>
          </ion-header>
        </jeep-stretchy-header>,

        <ion-content class="ion-padding">
          <h1>A Stretchy Header Web Component</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cum eum obcaecati corrupti nulla, eos minus, impedit corporis at quidem illum cupiditate illo excepturi architecto soluta veritatis aliquam, quibusdam aut.</p>      
        </ion-content>
      ];

    }
}

