import { Component, Host, h, Element } from '@stencil/core';

@Component({
  tag: 'app-htmltoprint-viewme',
  styleUrl: 'app-htmltoprint-viewme.css',
  shadow: true
})
export class AppHtmltoprintViewme {
  @Element() el!: HTMLAppHtmltoprintElement;

  componentDidLoad() {
    /*
    var slotStyle = "<style>";
    slotStyle += "h2 {margin:15px;font: 20px Calibri;font-weight: bold;text-align: center;}";
    slotStyle += "h3 {margin:15px;font: 12px Calibri;font-weight: normal;text-align: left;}";
    slotStyle += "table {width: 100%;font: 15px Calibri;}";
    slotStyle += "table, th, td {border: solid 1px #AAA; border-collapse: collapse;";
    slotStyle += "padding: 2px 3px;}";
    slotStyle += ".left {text-align: left;}";
    slotStyle += ".center {text-align: center;font-weight: normal;}";
    slotStyle += ".table-tr-header {background-color:rgb(193,195,203);}";
    slotStyle += "</style>";
    this.el.shadowRoot.querySelector('jeep-html-toprint').setAttribute('slotstyle',slotStyle);
    */
  }
  _handlePrintClick() {
    var cmpt = this.el.shadowRoot.querySelector('jeep-html-toprint');
    cmpt.emitPrint();
  }

  render() {
    return (
      <Host>
          <ion-header>
            <ion-toolbar color="primary">
              <ion-title>Stencil HTML to Print</ion-title>
              <ion-buttons slot='end'>
                <ion-button  onClick={this._handlePrintClick.bind(this)}>
                  <ion-icon slot="end" name="print" color="dark">
                  </ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">

            <jeep-html-toprint>
              <div slot="toprint">
                  <h3></h3>
                  <h2>Hello World</h2>
                  <table>
                  <tr class="table-tr-header">
                    <th class="left">Firstname</th>
                    <th class="left">Lastname</th> 
                    <th class="center">Age</th>
                  </tr>
                  <tr>
                    <td class="left">Jill</td>
                    <td class="left">Smith</td> 
                    <td class="center">50</td>
                  </tr>
                  <tr>
                    <td class="left">Eve</td>
                    <td class="left">Jackson</td> 
                    <td class="center">94</td>
                  </tr>
                </table> 
              </div>   
            </jeep-html-toprint>
          </ion-content>
      </Host>
    );
  }

}
