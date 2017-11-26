const DecisionTree = require('decision-tree')

// Load Training & Test Data
const trainingData = require('./data/training-data.json')
const testData = require('./data/test-data.json')

// Load Decision Tree
const className = 'type'
const features = ['nodes', 'geometry', 'length', 'bboxArea', 'averageAngles']
const dt = new DecisionTree(trainingData, className, features)
const accuracy = dt.evaluate(testData)

console.log(`Accuracy: ${accuracy * 100}%`)

// Features with issues
// testData.forEach(feature => {
//   if (feature.type !== dt.predict(feature)) console.log(feature['@id'])
// })
