let account = {}

const LOGIN_HTML = `
<h1>LOGIN</h1>
<div><label>UID:<input type="number" id="uid_login"></input></label></div>
<div><label>PASSWORD:<input type="password" id="password_login"></input></label></div>
<button onclick="login(document.getElementById('uid_login').value, document.getElementById('password_login').value)">ログイン</button><br><br>
<button onclick="showModal(REGISTER_HTML)">登録画面へ</button>
`

const REGISTER_HTML = `
<h1>REGISTER</h1>
<div><label>PASSWORD:<input type="password" id="password_register"></input></label></div>
<button onclick="register(document.getElementById('password_register').value)">登録</button><br><br>
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
<div><span class="material-symbols-outlined">group</span><a onclick="userInfo()">Friend List</a></div>
<div><span class="material-symbols-outlined">group_add</span><a onclick="addFriend()">Add Friend</a></div>
<div><span class="material-symbols-outlined">group_remove</span><a onclick="addFriend()">Remove Friend</a></div>
`

function userInfo() {
    alert(`Your UUID: ${account.uid}\nYour registed users: ${Object.keys(markers)} (${users.length})`);
}

function addFriend() {
    const uid = prompt("追加したいフレンドのUID");
    if (uid === null || uid === "") {
        return;
    }
    if (uid.search(/^\d+$/) !== 0) {
		alert("UIDは数字を入力する必要がります。");
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
    if (uid.search(/^\d+$/) !== 0) {
		alert("UIDは数字を入力する必要がります。");
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

document.getElementById('iconfile').addEventListener('change', uploadFile);


function showModal(content = "", modalid = "1") {
    let overlay = document.getElementById("overlay");
    let modal = document.getElementById("modal");
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
	if (uid.search(/^\d+$/) !== 0) {
		alert("UIDは数字を入力する必要がります。");
		return;
	}
	sha256(password).then(
		function (h) {
			localStorage.setItem("account", JSON.stringify({uid: uid, password: h}));
			CelarInit();
			hideModal("1");
		}
	)
}

const register = (password = null) => {
	if (password === "" || password === null) {
		alert("パスワードは設定しましょう。")
		return;
	}
	sha256(password).then(
		function (h) {
			socket.send(JSON.stringify({command: "REGISTER", password: h}))
			hideModal("1");
		}
	)
}

function showHamMenu() {
    let close = document.getElementById("menu_closer");
    close.classList.value = "menu_close";
    showModal(MAIN_MENU, "menu");
}

function hideHamMenu() {
    let close = document.getElementById("menu_closer");
    close.classList.value = "none";
    hideModal("menu");
}
