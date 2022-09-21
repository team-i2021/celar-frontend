let account = {}

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
