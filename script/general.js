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

function addFriend() {
    const uid = prompt("追加したいフレンドのUID");
    ws_add_friend(uid);
    alert("フレンドリクエストを送信したよ！");
}

function delFriend() {
    const uid = prompt("削除したいフレンドのUID");
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


function showModal(content = "") {
    let overlay = document.getElementById("overlay");
    let modal = document.getElementById("modal");
    modal.innerHTML = content;
    overlay.classList.value = "overlay";
    modal.classList.value = "modal";
}

function hideModal() {
    let overlay = document.getElementById("overlay");
    let modal = document.getElementById("modal");
    modal.innerHTML = "";
    overlay.classList.value = "overlay-hide";
    modal.classList.value = "modal-hide";
}
