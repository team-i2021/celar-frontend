mapboxgl.accessToken = TOKEN;

let map = undefined;

const users = [
  { "name": "nattyantv", "icon": "/image/marker.png", "uuid": 1234567890 },
]
const UserUUID = 1234567890
// usersのデータは基本はDBからとる。あくまでも上のはダミーデータ。

let markers = {}



function createMap(lat, lng){
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/nattyantv/cl7orubyd001514lfipfduov1',
    center: { lat: lat, lng: lng },
    zoom: 15
  });

  for (const user of users) {
    const template = document.getElementById('marker');
    const clone = document.importNode(template.content, true);
    let el = clone.firstElementChild;
    el.src = user["icon"];

    markers[user["uuid"]] = new mapboxgl.Marker(el)
      .setLngLat({ lat: lat, lng: lng })
      .addTo(map);
  }
}

/*
(マップサイズに合わせてマーカーのサイズを変える実験)

setInterval(
  function() {
    if (map == undefined) { return; }
    $(".map-icon").css({
      "width": map.getZoom() * 3 + "px"
    });
  }, 1
)
*/


function setLocation() {
  markers[UserUUID].setLngLat({ lat: lat, lng: lng })
}

// マーカーの位置は、Marker.setLngLat(LngLatLike)で変更できる。
