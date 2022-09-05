mapboxgl.accessToken = TOKEN;

let map;

let geojson = {
    'type': 'FeatureCollection',
    'features': [{
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-139.0, -35.0]
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [134.0, 35.0]
        }
    },
    ]
};


function createMap() {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/nattyantv/cl7orubyd001514lfipfduov1',
        center: {lat: lat, lng: lng},
        zoom: 15
    });

    geojson.features.forEach(function (marker) {
        // Create element for marker from template
        const template = document.getElementById('marker');
        const clone = document.importNode(template.content, true);
        const el = clone.firstElementChild;

        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
    });
}





