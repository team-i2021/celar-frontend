function addFriend() {
    const uuid = prompt("追加したいフレンドのUUID");
    ws_add_friend(uuid);
    ws_init();
}

function delFriend() {
    const uuid = prompt("削除したいフレンドのUUID");
    ws_del_friend(uuid);
    ws_init();
}

function selectFile() {
    const in_icon = document.getElementById("iconfile");
    in_icon.click()
}

function uploadFile(e) {
    let formData = new FormData();
    formData.append("iconfile", iconfile.files[0]);
    formData.append("uuid", account.uuid);

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
