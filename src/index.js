'use strict'

const insights = require('./applicationinsights')
const streams = require('./streams')
const pumpify = require('pumpify')

async function createWriteStream (options = {}) {
  if (!options.key && !process.env.APPINSIGHTS_INSTRUMENTATIONKEY) { throw Error('Instrumentation key missing') }
  const client = new insights.Client(options)

  const parseJsonStream = streams.parseJsonStream()
  const batchStream = streams.batchStream({ size: 1 })

  const writeStream = client.insertStream()

  return pumpify(parseJsonStream, batchStream, writeStream)
}

module.exports.createWriteStream = createWriteStream
