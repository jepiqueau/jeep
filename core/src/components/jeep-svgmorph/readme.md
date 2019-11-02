# jeep-svgmorph



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                        | Type     | Default     |
| ------------- | ------------- | ---------------------------------- | -------- | ----------- |
| `calcmode`    | `calcmode`    | The preselected calculation mode   | `string` | `"linear"`  |
| `duration`    | `duration`    | The preselected duration           | `string` | `"2000ms"`  |
| `fill`        | `fill`        | The preselected fill color         | `string` | `undefined` |
| `keysplines`  | `keysplines`  | The preselected key splines        | `string` | `undefined` |
| `keytimes`    | `keytimes`    | The preselected key times          | `string` | `undefined` |
| `nsegment`    | `nsegment`    | The preselected number of segments | `string` | `undefined` |
| `pathindex`   | `pathindex`   | The preselected path index         | `string` | `undefined` |
| `repeatcount` | `repeatcount` | The preselected repeat count       | `string` | `undefined` |


## Methods

### `getAlignedPaths(calc: boolean) => Promise<CubicBezier[]>`



#### Returns

Type: `Promise<CubicBezier[]>`



### `getFillColor() => Promise<string[]>`



#### Returns

Type: `Promise<string[]>`



### `getPath() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `getPathList() => Promise<string[]>`



#### Returns

Type: `Promise<string[]>`



### `getStateProperties() => Promise<StateProperties>`



#### Returns

Type: `Promise<StateProperties>`



### `init() => Promise<void>`

Method initialize

#### Returns

Type: `Promise<void>`



### `renderSVGFirstPath() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
