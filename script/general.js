function addFriend(){
    const uuid = prompt("追加したいフレンドのUUID");
    ws_add_friend(uuid);
    ws_init();
}

function delFriend(){
    const uuid = prompt("削除したいフレンドのUUID");
    ws_del_friend(uuid);
    ws_init();
}

