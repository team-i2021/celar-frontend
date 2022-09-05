let count = 0;
let watcher;
let lat = 0.0;
let lng = 0.0;

function setLocationWatch() {
    watcher = navigator.geolocation.watchPosition(convertPosition, function(e) { alert(e.message); }, {"enableHighAccuracy": true, "timeout": 20000, "maximumAge": 200});
}

function clearLocationWatch() {
    navigator.geolocation.clearWatch(watcher);
}

function convertPosition(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    let text = "緯度:" + position.coords.latitude + "<br>";
    text += "経度:" + position.coords.longitude + "<br>";
    text += "高度:" + position.coords.altitude + "<br>";
    text += "位置精度:" + position.coords.accuracy + "<br>";
    text += "高度精度:" + position.coords.altitudeAccuracy  + "<br>";
    text += "移動方向:" + position.coords.heading + "<br>";
    text += "速度:" + position.coords.speed + "<br>";
    text += "取得時刻:" + position.timestamp + "<br>";
    text += "取得回数:" + (++count) + "<br>";
    document.getElementById('loc').innerHTML = text;
}
