const socket = new WebSocket('wss://api.celar.f5.si/');

socket.addEventListener('open',function(e){// 接続
    console.log('WebSocket Connected (Client)');
});

socket.addEventListener('message',function(e){
    try
    {
        const data = JSON.parse(e.data);
        console.info(data)

        if (data.action == "REGISTER")
        {
            
        }
    }
    catch (err)
    {
        console.info("Failed Convert.", e, err)
    }
});


// document.addEventListener('DOMContentLoaded',function(e){
//     document.getElementById('sample').addEventListener('click',function(e){
//         console.log("send Hello!!");
//         socket.send('hello');// WebSocketでサーバーに文字列を送信
//     });
// });


const register = () => {
    socket.send(JSON.stringify({command: "REGISTER"}));
}
