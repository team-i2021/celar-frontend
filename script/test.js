function action() {
    navigator.geolocation.getCurrentPosition(loc);
}

function loc(position) {
    let text = "緯度:" + position.coords.latitude + "\n";
    text += "経度:" + position.coords.longitude + "\n";
    text += "高度:" + position.coords.altitude + "\n";
    text += "位置精度:" + position.coords.accuracy + "\n";
    text += "高度精度:" + position.coords.altitudeAccuracy  + "\n";
    text += "移動方向:" + position.coords.heading + "\n";
    text += "速度:" + position.coords.speed + "\n";
    text += "取得時刻:" + position.timestamp + "\n";
    alert(text);
}
