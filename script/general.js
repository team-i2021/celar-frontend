const VERSION = "beta2..3:WORKING:Dark theme"

let account = {}

if (localStorage.getItem("account") !== null)
{
    account = JSON.parse(localStorage.getItem("account"));
}

const LOGIN_HTML = `
<h1>LOGIN</h1>
<form>
<div><label>UID:<input type="text" id="uid_login"></input></label></div>
<div><label>PASSWORD:<input type="password" id="password_login"></input></label></div>
<input type="submit" value="ログイン" onclick="login(document.getElementById('uid_login').value, document.getElementById('password_login').value)">
</form><br><br>
<button onclick="showModal(REGISTER_HTML)">登録画面へ</button>
`

const REGISTER_HTML = `
<h1>REGISTER</h1>
<form>
<div><label>UID:<input type="text" id="uid_register"></input></label></div>
<div><label>PASSWORD:<input type="password" id="password_register"></input></label></div>
<input type="submit" value="登録" onclick="register(document.getElementById('uid_register').value, document.getElementById('password_register').value)">
</form><br><br>
<button onclick="showModal(LOGIN_HTML)">ログイン画面へ</button>
`

const MAINTENANCE_PAGE = `
<h1>MAINTENANCE</h1>
<div>現在Celarはメンテナンス中です。</div>
<div>メンテナンス終了までお待ち下さい。</div>
<button onclick="location.reload();">再読み込み</button>
`

const MAIN_MENU = `
<h1>Celar</h1>
<h5>$[uid]</h5>
<div><img class="modal_icon" src="/sprite/group_FILL0_wght400_GRAD0_opsz48.svg"><a onclick="userInfo()">Friend List</a></div>
<div><img class="modal_icon" src="/sprite/group_add_FILL0_wght400_GRAD0_opsz48.svg"><a onclick="addFriend()">Add Friend</a></div>
<div><img class="modal_icon" src="/sprite/group_remove_FILL0_wght400_GRAD0_opsz48.svg"><a onclick="addFriend()">Remove Friend</a></div>
<div><img class="modal_icon" src="/sprite/face_retouching_natural_FILL0_wght400_GRAD0_opsz48.svg"><a onclick="selectFile()">Change Icon</a></div>
<div><img class="modal_icon" src="/sprite/logout_FILL0_wght400_GRAD0_opsz48.svg"><a onclick="localStorage.removeItem('account')">Logout</a></div>
<div><img class="modal_icon" src="/sprite/refresh_FILL0_wght400_GRAD0_opsz48.svg"><a onclick="location.reload()">Reload</a></div>
<hr>
<div>Ping:$[ping]ms</div>
<div>時間ズレ:$[gap]ms</div>
`

if (!('Notification' in window)) {
    console.log("This browser does not support notifications.");
} else {
    Notification.requestPermission();
}


function userInfo() {
    const friends = Object.keys(markers).filter(item => item !== account.uid);
    alert(`・フレンド一覧\n${friends.join("\n")}`);
}

function addFriend() {
    const uid = prompt("追加したいフレンドのUID");
    if (uid === null || uid === "") {
        return;
    }
    ws_add_friend(uid);
    alert("フレンドリクエストを送信したよ！");
}

function delFriend() {
    const uid = prompt("削除したいフレンドのUID");
    if (uid === null || uid === "") {
        return;
    }
    ws_del_friend(uid);
    alert("フレンドを削除しました。");
    ws_init();
}

function selectFile() {
    const in_icon = document.getElementById("iconfile");
    in_icon.click()
}

function uploadFile(e) {
    let formData = new FormData();
    formData.append("iconfile", iconfile.files[0]);
    formData.append("uid", account.uid);
    formData.append("password", account.password);

    $.ajax({
        url: `${API_URL}/upload_icon`,
        type: "POST",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json"
    })
    .done(function(data, textStatus, jqXHR){
        location.reload();
    })
    .fail(function(jqXHR, textStatus, errorThrown){
        alert("正常に通信できませんでした。\n再度時間がたってからやり直してください。");
    })
}

function showModal(content = "", modalid = "1") {
    let overlay = document.getElementById("overlay");
    let modal = document.getElementById("modal");
    content = content.replace("$[uid]", account.uid);
    content = content.replace("$[ping]", ping);
    content = content.replace("$[gap]", gap);
    modal.innerHTML = content;
    overlay.classList.value = "overlay";
    modal.classList.value = `modal${modalid}`;
}

function hideModal(modalid = "1") {
    let overlay = document.getElementById("overlay");
    let modal = document.getElementById("modal");
    modal.innerHTML = "";
    overlay.classList.value = "overlay-hide";
    modal.classList.value = `modal${modalid}-hide`;
}

const login = (uid = "", password = "") => {
	sha256(password).then(
		function (h) {
			hideModal("1");
			localStorage.setItem("account", JSON.stringify({uid: uid, password: h}));
			CelarInit();
		}
	)
}

const register = (uid = null, password = null) => {
	if (uid === "" || uid === null) {
		alert("UIDを指定してね。")
		return;
	}
	if (password === "" || password === null) {
		alert("パスワードは設定しましょう。")
		return;
	}
	sha256(password).then(
		function (h) {
			hideModal("1");
			socket.send(JSON.stringify({command: "REGISTER", uid: uid, password: h}))
		}
	)
}

function showHamMenu() {
    let close = document.getElementById("menu_closer");
    close.classList.value = "menu_close selectable";
    showModal(MAIN_MENU, "menu");
}

function hideHamMenu() {
    let close = document.getElementById("menu_closer");
    close.classList.value = "none selectable";
    hideModal("menu");
}

window.onload = function() {
    document.getElementById('iconfile').addEventListener('change', uploadFile);
}
