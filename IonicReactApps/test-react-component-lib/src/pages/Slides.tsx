import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import React , {Component} from 'react';
import { JeepSlides, JeepSlide } from '@jeepq/react';
import "./Slides.css";

type Props = {}
class Slides extends Component<Props> {
  root = document.documentElement;

  handleHeaderVisibility(ev: CustomEvent){
    console.log('onHeaderVisibility');
    const header = document.querySelector(".ionheader");
    if(ev.detail && ev.detail.visibility) {
      console.log('ev.detail.visibility ',ev.detail.visibility)
      if(ev.detail.visibility === 'visible') {
        if(header && header.classList.contains('hidden')) header.classList.remove('hidden');
      } else {
        if(header) header.classList.add('hidden');
      }
    }
  }

  render() {
    const options: string = JSON.stringify({
      direction: "horizontal",
      duration: 3000,
      fullscreen:{
        hidden:true
      },
      navigation: {
        hidden: true
      },
      pagination: {
        bulletsDisplay:7,
        clickable: true,
        hidden: true
      }
    });
    return (
    <IonPage>
      <IonHeader className="ionheader">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>FlipImages Test</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <JeepSlides className="paginationnavigationhorizontal" options={options} onJeepSlidesHeaderVisibility={this.handleHeaderVisibility.bind(this)}>
          <div slot="slides">
          <JeepSlide stitle="Section One" cstyle=":host{--slide-background: #49b293;\
              --slide-display:block;--slide-header-top:2vmin;--slide-content-top:4vmin;--slide-content-padding: 0 2vmin;\
              --slide-content-text-align:left;--slide-content-font-size:4.5vmin;}">
              <h4 style= {{marginTop:"2vmin",marginBottom:"2vmin",fontSize:"5vmin",fontWeight:"bold"}}>
                Below a list of items :                
              </h4>
              <ul style={{marginTop:"0.5vmin"}}>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec.</li>
                <li>Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.</li>
              </ul>
            </JeepSlide> 
            <JeepSlide cstyle=":host{--slide-background: #c94e4b;}">Section Two</JeepSlide>
            <JeepSlide cstyle=":host{--slide-background: #4cc1be;}">Section Three</JeepSlide>
            <JeepSlide cstyle=":host{--slide-background: #8360a6;}">Section Four</JeepSlide>
            <JeepSlide cstyle=":host{--slide-background: #4c67c1;}">Section Five</JeepSlide>
            <JeepSlide cstyle=":host{--slide-background: rgb(178, 180, 72);}">Section Six</JeepSlide>
            <JeepSlide>
              <img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/italy-mountains.jpeg"
                style={{width:"100%",maxWidth:"var(--slide-min-width)",height:"auto",maxHeight:"var(--slide-height)",
                boxSizing:"border-box",border:"1vmin solid var(--gslider-slide-background)"}}></img>
            </JeepSlide>
            <JeepSlide>
              <img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/lake-sunset-twilight.jpeg"
              style={{width:"100%",maxWidth:"var(--slide-min-width)",height:"auto",maxHeight:"var(--slide-height)",
              boxSizing:"border-box",border:"1vmin solid var(--gslider-slide-background)"}}></img>
            </JeepSlide>
            <JeepSlide>
              <img src="https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/deerl.jpg" alt="deer"
              style={{width:"100%",maxWidth:"var(--slide-min-width)",height:"auto",maxHeight:"var(--slide-height)",
              boxSizing:"border-box",border:"1vmin solid var(--gslider-slide-background)"}}></img>
            </JeepSlide>
            <JeepSlide cstyle=":host{--slide-background: #eeeeee;--slide-color:#000;}">Section Ten</JeepSlide>        
            <JeepSlide cstyle=":host{--slide-background: rgb(184, 71, 184);}">Section Eleven</JeepSlide>
            <JeepSlide cstyle=":host{--slide-background: rgb(57, 153, 148);}">Section Twelve</JeepSlide>        
          </div>        
        </JeepSlides>
      </IonContent>
    </IonPage>
    );
  };
};

export default Slides;
