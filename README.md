# Machine Learning - Building or Road?

First project to learn Machine learning with GeoJSON Vector Data.

## Problems to solve:

### 1.0 Building or Road?

Given a single LineString/MultiLineString/Polygon/MultiPolygon is this Feature a Building or a Road?

### 1.1 How to solve

- [ ] Extract data from OSM QA Tiles of Roads & Buildings
- [ ] Deconstruct each Feature into geometry attributes:
  - `type` => LineString / Polygon
  - `length` => Lenght in Kilometers of the entire LineString
  - `area` => Area in Square Kilometers of the Polygon
  - `segments` => Count the number of line segments
  - `segmentsAverageLength` => The average length of all segments
  - `segmentsAverageAngle` => The average angle between each segments
- [ ] Predict given these attributes
