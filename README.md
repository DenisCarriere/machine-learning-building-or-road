# Machine Learning - Building or Road?

First project to learn Machine learning with GeoJSON Vector Data.

## Problems to solve:

### 1.0 Building or Road?

Given only a single LineString/MultiLineString/Polygon/MultiPolygon geometry is this Feature a Building or a Road?

### 1.1 How to solve

- [x] Use a Decision Tree ML method
- [x] Extract data from OSM QA Tiles of Roads & Buildings
- [x] Deconstruct each Feature into geometry attributes:
  - `type` => LineString / Polygon
  - `length` => Lenght in Kilometers of the entire LineString
  - `area` => Area in Square Meters of the Polygon
  - `segments` => Count the number of line segments
  - `segmentsAverageLength` => The average length of all segments
  - `segmentsAverageAngle` => The average angle between each segments
- [x] Predict given if LineString is a Building or a Road

### 1.2 Solved

Success, a Decision Tree model was created by using 500 Buildings & 500 Highways as Training Data. Upon testing the predictive model against 20x other Highways/Buildings it came to an accuracy of %99.9445%.

Seems like using a Decicision Tree is relatively easy when extracting the correct attributes from a GeoJSON Feature.
