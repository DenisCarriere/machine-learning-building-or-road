#! /usr/bin/env node

const fs = require('fs')
const meow = require('meow')
const path = require('path')
const readline = require('readline')
const write = require('write-json-file')
const dataModel = require('../src/data-model')

const cli = meow(`
  Usage:
    $ training-data
  Options:
    --limit [100] Only process a limited amounts of features
    --highways ['./data/highways.json'] Highways JSON Lines filepath
    --buildings ['./data/buildings.json'] Buildings JSON Lines filepath
    --output ['./data/training-data.json'] Output path
  Examples:
    $ node ./bin/training-data.js
    $ node ./bin/training-data.js --limit 500
    $ node ./bin/training-data.js --limit 5000 --output "./data/test-data.json"
`)

// Handle Options
const options = cli.flags
const limit = options.limit || 100
const output = options.output || path.join('data', 'training-data.json')
const highways = options.highways || path.join('data', 'highways.json')
const buildings = options.buildings || path.join('data', 'buildings.json')

// Write Stream
const trainingData = []

// Read JSON Line Data
const buildingStream = readline.createInterface({
  input: fs.createReadStream(buildings)
})

// Counters
let buildingCount = 0
let highwayCount = 0

buildingStream.on('line', (input) => {
  if (buildingCount < limit) {
    const feature = JSON.parse(input)
    const geometry = feature.geometry.type

    // Skip Point Geometry
    if (geometry === 'Point') return

    // Store Training Data in memory to save as JSON
    trainingData.push(dataModel(feature, 'building'))

    // Stop reading stream
  } else if (buildingCount > limit) buildingStream.close()
  buildingCount++
})

buildingStream.on('close', () => {
  const highwayStream = readline.createInterface({
    input: fs.createReadStream(highways)
  })

  highwayStream.on('line', (input) => {
    if (highwayCount < limit) {
      const feature = JSON.parse(input)
      const geometry = feature.geometry.type

      // Skip the Following
      if (geometry === 'Point') return
      if (feature.properties.highway === 'raceway') return

      // Store Training Data in memory to save as JSON
      trainingData.push(dataModel(feature, 'highway'))

    // Stop reading stream
    } else if (highwayCount > limit) highwayStream.close()
    highwayCount++
  })

  // Save Trainig Data as pure JSON
  highwayStream.on('close', () => {
    write.sync(output, trainingData)
    console.log('Training Data:', trainingData.length)
  })
})
