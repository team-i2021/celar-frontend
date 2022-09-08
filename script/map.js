mapboxgl.accessToken = TOKEN;

let map = undefined;

const users = [
  { "name": "nattyantv", "icon": "/image/marker.png", "uuid": 1234567890 },
]
const UserUUID = 1234567890
// usersのデータは基本はDBからとる。あくまでも上のはダミーデータ。

let markers = {}


const createMap = (lat, lng) => {
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/nattyantv/cl7orubyd001514lfipfduov1',
    center: { lat: posdata.coords.latitude, lng: posdata.coords.longitude },
    zoom: 15
  });

  for (const user of users) {
    const template = document.getElementById('marker');
    const clone = document.importNode(template.content, true);
    let el = clone.firstElementChild;
    el.children[0].src = user["icon"];

    markers[user["uuid"]] = new mapboxgl.Marker(el)
      .setLngLat({ lat: posdata.coords.latitude, lng: posdata.coords.longitude })
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
  let main_marker = markers[UserUUID]
  main_marker.setLngLat({ lat: posdata.coords.latitude, lng: posdata.coords.longitude })
  let marker_html = main_marker.getElement()
  if (Math.trunc(posdata.coords.speed * 3.6) >= 1) {
    marker_html.children[1].innerHTML = Math.trunc(posdata.coords.speed * 3.6) + "km/h"
  } else {
    marker_html.children[1].innerHTML = "";
  }
}

function positionReset() {
  map.setCenter({ lat: posdata.coords.latitude, lng: posdata.coords.longitude });
  map.setZoom(15);
}

// マーカーの位置は、Marker.setLngLat(LngLatLike)で変更できる。
