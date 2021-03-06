# API

The library exposes a function to write directly to an Azure Application Insights from your own application. The example below shows how this can be done using [pino-multi-stream](https://github.com/pinojs/pino-multi-stream).

Example:

```js
const insights = require('pino-applicationinsights')
const pinoms = require('pino-multi-stream')
// create the Azure Application Insights destination stream
const writeStream = await insights.createWriteStream()
// create pino loggger
const logger = pinoms({ streams: [writeStream] })
// log some events
logger.info('Informational message')
logger.error(new Error('things got bad'), 'error message')
```

## Functions

### createWriteStream

The `createWriteStream` function creates a writestream that `pino-multi-stream` can use to send logs to.

Example:

```js
const writeStream = await insights.createWriteStream({
  key: 'instrumentationkey'
})
````

#### key

Type: `String` *(optional)*

The Instrumentation Key of the Azure Application Insights account. If not specified, defaults to APPINSIGHTS_INSTRUMENTATIONKEY environment variable.
