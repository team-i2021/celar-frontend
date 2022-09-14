mapboxgl.accessToken = MAP_TOKEN;

let map = undefined;

let users = []
// usersのデータは基本はDBからとる。あくまでも上のはダミーデータ。

let markers = {}

let main_marker;

const createMap = (lat, lng) => {

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

function getSpeed(speed) {
  if (Math.trunc(speed * 3.6) >= 1) {
    return Math.trunc(speed * 3.6) + "km/h"
  } else {
    return "";
  }
}

function setLocation() {
  if (socket.readyState != 1) { clearInterval(locationLoop); return; }
  let main_marker = markers[account.uuid]
  main_marker.setLngLat({ lat: posdata.coords.latitude, lng: posdata.coords.longitude })
  let marker_html = main_marker.getElement()
  marker_html.children[1].innerHTML = getSpeed(posdata.coords.speed)
  ws_post(posdata);
  ws_fetch();
}

function positionReset() {
  map.setCenter({ lat: posdata.coords.latitude, lng: posdata.coords.longitude });
  map.setZoom(15);
}

// マーカーの位置は、Marker.setLngLat(LngLatLike)で変更できる。
