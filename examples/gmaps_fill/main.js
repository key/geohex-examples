    var map;
    var xyArray = [];
    var gmapsDefaultZoom = 8;
    var filled = false;

    // fill map with a hex
    function fillMap() {
        // skip if map is filled
        if (filled) return;

        // get bounding box
        var bounds = map.getBounds();
        var northeast = bounds.getNorthEast();
        var southwest = bounds.getSouthWest();

        // get xy list by bounding box
        xyArray = getXYListByRect(southwest.lat(), southwest.lng(), northeast.lat(), northeast.lng(), 4);

        for (var i=0; i < xyArray.length; i++) {
            var hex = GEOHEX.getZoneByXY(xyArray[i].x, xyArray[i].y, 4);
            drawHex(hex, map);
        }

        filled = true;
    }

    // callback function when loaded the map.
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 35.685175, lng: 139.7528},
            scrollwheel: false,
            zoom: gmapsDefaultZoom
        });
        google.maps.event.addListener(map, 'bounds_changed', fillMap);
    }

    // plot hex to Map object
    function drawHex(zone, map) {
        var coords = zone.getHexCoords();
        var len = 6;    // == coords.length
        var gCoords = new Array(len);
        for (var idx = 0; idx < len; idx++) {
            gCoords[idx] = new google.maps.LatLng(coords[idx].lat, coords[idx].lon);
        }
        var hexPolygon = new google.maps.Polygon({
            paths: gCoords,
            strokeColor: "#FF0000",
            strokeOpacity: 0.4,
            strokeWeight: 1.0,
            fillColor: "#efefef",
            fillOpacity: 0.1
        });
        hexPolygon.setMap(map);
    }
