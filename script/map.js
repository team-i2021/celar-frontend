const MAP_URL = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}";
const MAP_ATTRIBUTION = `Tiles &copy; <a href="http://www.esrij.com/"> Esri Japan </a> | <a href="https://github.com/team-i2021">Celar</a> ${VERSION}`;
const MAP_ZOOM = 16.5;

let map = undefined;

let markers = {}

let main_marker;

const popup = L.popup();

const createMap = (lat, lng) => {
    map = L.map('map', {
        zoomControl: false
    });
    map.setView([lat, lng], MAP_ZOOM);
    const tileLayer = L.tileLayer(MAP_URL, {
        attribution: MAP_ATTRIBUTION
    });
    tileLayer.addTo(map);
}

function getSpeed(speed) {
    if (Math.trunc(speed * 3.6) >= 1) {
        return Math.trunc(speed * 3.6) + "km/h"
    } else {
        return "";
    }
}

function setLocation() {
    if (socket.readyState != 1) { clearInterval(locationLoop); return; }
    const date = new Date();
    markers[account.uid].location = [posdata.coords.latitude, posdata.coords.longitude, posdata.coords.speed, date.getTime()];
    markers[account.uid].setLatLng({ lat: posdata.coords.latitude, lng: posdata.coords.longitude })
    let marker_html = markers[account.uid].getElement().children[0]
    marker_html.children[1].innerHTML = getSpeed(posdata.coords.speed)
    main_marker = markers[account.uid]
    ws_post(posdata);
    ws_fetch();
}

function userPopup(e) {
    const uid = e.target.options.icon.options.uid;
    if (uid !== account.uid){
        const user = markers[uid];
        const lastDate = new Date(user.location[3]);
        showModal(`
<h2>${user.uid}</h2>
<div>最終オンライン:${lastDate.toLocaleString()}</div>
<button onclick="hideModal('2')">Close</button>
`, '2')
        console.log(user);
    } else {
        showModal(`
<h2>${uid}</h2>
<div>This is your account!</div>
<button onclick="hideModal('2')">Close</button>
`, "2")
   }
}

function positionReset() {
    map.setView([posdata.coords.latitude, posdata.coords.longitude], MAP_ZOOM);
}

// マーカーの位置は、Marker.setLatLng(LngLatLike)で変更できる。
