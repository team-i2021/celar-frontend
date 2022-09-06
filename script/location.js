let count = 0;
let watcher;

let lat;
let lng;

// 初回読み込み
navigator.geolocation.getCurrentPosition(mapinit, initerror);


function clearLocationWatch() {
    navigator.geolocation.clearWatch(watcher);
}

function convertPosition(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
}

function mapinit(position) {
    const lat_pos = position.coords.latitude;
    const lng_pos = position.coords.longitude;
    createMap(lat_pos, lng_pos);
    setInterval(setLocation, 1000);
    watcher = navigator.geolocation.watchPosition(convertPosition, locationError, {"enableHighAccuracy": true, "timeout": 500, "maximumAge": 500});
}

function initerror(e) {
    alert("位置情報取得時にエラーが発生しました。\n端末やブラウザの設定をご確認ください。\n", e)
}

function locationError(e) {
    alert("位置情報取得時にエラーが発生しました。\n端末やブラウザの設定をご確認ください。\n", e)
}
