# jeep-html-toprint

HTMLtoPrint is a Web Component to print HTML Elements placed in a slot placeholder inside the Web Component.

The slot placeholder must be named "toprint".

The style applied to these HTML Elements must be passed in a string to the Web Component through the property slotstyle and should not be declared in a style tag or css file of the parent component or javascript script.

HTMLtoPrint is only compatible with Chrome and Safari browsers and will issue a warning message "Error: Browser not compatible yet" for any others browsers.

HTMLtoPrint is listening to a Custom Event "printPage" to launch the Print Dialog Window. From this window, one can select a printer or the pdf converter.

## Usage

```
    let slotStyle = "<style>";
    slotStyle += "h2 {margin:15px;font: 20px Calibri;font-weight: bold;text-align: center;}";
    slotStyle += "h3 {margin:15px;font: 12px Calibri;font-weight: normal;text-align: left;}";
    slotStyle += "table {width: 100%;font: 15px Calibri;}";
    slotStyle += "table, th, td {border: solid 1px #AAA; border-collapse: collapse;";
    slotStyle += "padding: 2px 3px;}";
    slotStyle += ".left {text-align: left;}";
    slotStyle += ".center {text-align: center;font-weight: normal;}";
    slotStyle += ".table-tr-header {background-color:rgb(193,195,203);}";
    slotStyle += "</style>";

  <jeep-html-toprint slotstyle={slotStyle}>
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

```

HTMLtoPrint verify that a slot named "toprint" exist, otherwise a warning message will be issued "Error: slot name toprint doesn't exist".



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                    | Type     | Default     |
| ----------- | ----------- | ------------------------------ | -------- | ----------- |
| `slotstyle` | `slotstyle` | The style for elements in slot | `string` | `undefined` |


## Events

| Event                      | Description | Type                |
| -------------------------- | ----------- | ------------------- |
| `jeepHtmlToPrint`          |             | `CustomEvent<void>` |
| `jeepHtmlToPrintCompleted` |             | `CustomEvent<void>` |
| `jeepHtmlToPrintReady`     |             | `CustomEvent<void>` |


## Methods

### `emitPrint() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `getSlotStyle() => Promise<string>`



#### Returns

Type: `Promise<string>`



### `init() => Promise<void>`

Method initialize

#### Returns

Type: `Promise<void>`



### `load() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
