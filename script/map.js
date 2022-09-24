const MAP_URL = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}";
const MAP_ATTRIBUTION = `Tiles &copy; <a href="http://www.esrij.com/"> Esri Japan </a> | <a herf="https://github.com/team-i2021">Celar</a>`;
let map = undefined;

let users = []
// usersのデータは基本はDBからとる。あくまでも上のはダミーデータ。

let markers = {}

let main_marker;

const popup = L.popup();

const createMap = (lat, lng) => {
  map = L.map('map', {
    zoomControl: false
  });
  map.setView([lat, lng], 15);
  const tileLayer = L.tileLayer(MAP_URL, {
    attribution: MAP_ATTRIBUTION
  });
  tileLayer.addTo(map);
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
  let main_marker = markers[account.uid]
  main_marker.setLatLng({ lat: posdata.coords.latitude, lng: posdata.coords.longitude })
  let marker_html = main_marker.getElement().children[0]
  marker_html.children[1].innerHTML = getSpeed(posdata.coords.speed)
  ws_post(posdata);
  ws_fetch();
}

function positionReset() {
  map.setView([posdata.coords.latitude, posdata.coords.longitude], 15);
}

// マーカーの位置は、Marker.setLngLat(LngLatLike)で変更できる。
