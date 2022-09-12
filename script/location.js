let count = 0;
let locator;

let account = {}

let posdata;

let locationLoop;

const clearLocationWatch = () => {
    navigator.geolocation.clearWatch(locator);
}

const convertPosition = (position) => {
    posdata = position;
}

const mapinit = (position) => {
    // 最初に一度だけ呼び出される関数。
    posdata = position;
    const lat_pos = position.coords.latitude;
    const lng_pos = position.coords.longitude;
    createMap(lat_pos, lng_pos);
    locationLoop = setInterval(setLocation, 1000);
    navigator.geolocation.clearWatch(locator);
    locator = navigator.geolocation.watchPosition(convertPosition, locationError, {"enableHighAccuracy": true, "timeout": 3000, "maximumAge": 1000});
}

const initerror = (e) => {
    alert("位置情報取得時にエラーが発生しました。\n端末やブラウザの設定をご確認ください。\n", e)
}

const locationError = (e) => {
    console.warn("位置情報が読み込めませんでした。", e);
}

const CelarInit = () => {
    if (localStorage.getItem("account") == null)
    {
        // 本当はログイン機構を搭載しなきゃいけないから、モーダルを使ってやればいいと思う... :modal
        register();
    }
    else
    {
        navigator.geolocation.getCurrentPosition(mapinit, initerror, {"enableHighAccuracy": true, "timeout": 5000, "maximumAge": 1000});
    }
    account = JSON.parse(localStorage.getItem("account"));
}

// 初回読み込み

