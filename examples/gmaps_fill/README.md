# Fill all displayed area of Google Maps

This sample fills displayed area of Google Maps with GeoHex.

## Flow

1. Initialize Google Map
2. Get bounds of map. (Use `map.getNorthEast()` and `map.getSouthWest()`)
3. Get XY List using [getXYListByRect](http://geohex.net/src/script/getXYListByRect.js) 
4. Plot hex with xy list
