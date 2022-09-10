const socket = new WebSocket('wss://api.celar.f5.si/');

socket.addEventListener('open',function(e){// 接続
    console.log('WebSocket Connected (Client)');
});

socket.addEventListener('message',function(e){
    try
    {
        const data = JSON.parse(e.data);
        console.info(data)
		if (data.action == "CONNECTION_ACCEPT")
		{
			console.info("WebSocket Connected (Server)");
		}
		else if (data.action == "OK")
		{
			console.info("Success.", data.content);
		}
		else if (data.action == "REGISTER")
        {
            const uuid = data.content;
			const password = "password";
			localStorage.setItem("account", JSON.stringify({uuid: uuid, password: password}));
			alert(`Account registration complete. uuid is ${uuid}`);
			location.reload();
        }
		else if (data.action == "FETCH")
		{
			for (const uuid of Object.keys(data.content))
			{
				const user = data.content[uuid];
				const marker = markers[uuid];
				marker.setLngLat([user[0], user[1]]);
				// How to set speed data to marker...???
			}
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

const post = (loc) => {
    const time = new Date();
    socket.send(JSON.stringify({command: "POST", uuid: account.uuid, location: [loc.coords.latitude, loc.coords.longitude, loc.coords.speed, time.getMilliseconds()]}));
}

const add_friend = (uuid) => {
    socket.send(JSON.stringify({command: "FRIEND", action: "ADD", uuid: account.uuid, user_id: uuid}));
}

const del_friend = (uuid) => {
    socket.send(JSON.stringify({command: "FRIEND", action: "DEL", uuid: account.uuid, user_id: uuid}));
}

const fetch = () => {
    socket.send(JSON.stringify({command: "FETCH"}));
}
