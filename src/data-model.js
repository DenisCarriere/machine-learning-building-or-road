const area = require('@turf/area')
const length = require('@turf/length')
const { totalNodes, getAngle } = require('osmlinter')
const { segmentReduce, lineReduce } = require('@turf/meta')
const { round } = require('@turf/helpers')
const bboxPolygon = require('@turf/bbox-polygon')
const bbox = require('@turf/bbox')

/**
 * Convert GeoJSON Feature to Data Model
 *
 * @param {Feature} feature GeoJSON Feature
 * @returns {Object} Data model for ML
 */
module.exports = function dataModel (feature, type) {
  return {
    type,
    '@id': feature.properties['@id'],
    building: feature.properties.building,
    highway: feature.properties.highway,
    geometry: feature.geometry.type,
    nodes: totalNodes(feature),
    length: round(length(feature, {units: 'meters'})),
    bboxArea: round(area(bboxPolygon(bbox(feature)))),
    totalAngles: round(totalAngles(feature)),
    averageAngles: round(averageAngles(feature))
    // closedFeature: closedFeature(feature)
  }
}

function totalAngles (geojson) {
  let total = 0
  segmentReduce(geojson, (previousSegment, currentSegment) => {
    const start = previousSegment.geometry.coordinates[0]
    const mid = previousSegment.geometry.coordinates[1]
    const end = currentSegment.geometry.coordinates[1]
    total += getAngle(start, mid, end)
    return currentSegment
  })
  if (isNaN(total)) return 0
  return total
}

function averageAngles (geojson) {
  let total = 0
  let count = 0
  segmentReduce(geojson, (previousSegment, currentSegment) => {
    const start = previousSegment.geometry.coordinates[0]
    const mid = previousSegment.geometry.coordinates[1]
    const end = currentSegment.geometry.coordinates[1]
    total += getAngle(start, mid, end)
    count++
    return currentSegment
  })
  const average = total / count
  if (isNaN(average)) return 0
  else if (count) return average
  return 0
}

/**
 * Returns the total amount of Segments
 *
 * @private
 * @param {GeoJSON} geojson Any GeoJSON
 * @returns {number} number of segments
 */
function totalSegments (geojson) {
  return segmentReduce(geojson, total => {
    total += 1
    return total
  }, 0)
}

/**
 * Detects if Line is closed or not
 *
 * @private
 * @param {Feature} feature GeoJSON Feature
 * @return {boolean} true/false
 */
function closedFeature(feature) {
  return lineReduce(feature, line => {

  })
}
