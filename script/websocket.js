// WebSocket通信に関するScript
const socket = new WebSocket(WS_URL);

socket.addEventListener('open', function(e){// 接続
    console.log('WebSocket Connected (Client)');
	CelarInit()
});

socket.addEventListener('error', function(e){// 接続
	alert("サーバーとの通信ができませんでした。\n時間をおいてから再度やり直してください。");
	location.reload(true);
});

socket.addEventListener('message', function(e){
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
		else if (data.action == "ERR")
		{
			if (data.content == "UnderTheMaintenance")
			{
				alert("現在サーバーがメンテナンス中です。\nしばらくしてから再度やり直してください。");
				location.reload();
			}
		}
		else if (data.action == "REGISTER")
        {
            const uid = data.content.uid;
			const password = data.content.password;
			localStorage.setItem("account", JSON.stringify({uid: uid, password: password}));
			alert(`アカウントを作成しました！\nIDは${uid}で、パスワードはさっき設定したやつです！`);
			account = JSON.parse(localStorage.getItem("account"));
			CelarInit();
        }
		else if (data.action == "FETCH")
		{
			console.info(data.content);
			for (const uid of Object.keys(data.content))
			{
				if (!(uid in markers)) { continue; }
				const location = data.content[uid];
				const marker = markers[uid];
				marker.setLngLat({ lat: location[0], lng: location[1]});
				marker.getElement().children[1].innerHTML = getSpeed(location[2]);
				/// How to set speed data to marker...???
				/// => marker.getElement()...
			}
		}
		else if (data.action == "INIT")
		{
			const requests = data.content.requests;
			users = data.content.friends;
			for (const request of requests) {
				console.info(request)
				const res = confirm(`UID:${request.uid}の方から申請が飛んできたよ！\n許可する？`);
				if (res) {
					socket.send(JSON.stringify({command: "FRIEND", action: "ALLOW", uid: account.uid, password: account.password, user_id: request.uid}));
					users.push({ icon: request.icon, uid: request.uid, location: [0, 0, null, 0] });
				}
				else {
					socket.send(JSON.stringify({command: "FRIEND", action: "DENY", uid: account.uid, password: account.password, user_id: request.uid}));
				}
			}
			if (users[0].location.length === 0)
			{
				users[0].location = [0.0, 0.0, null, 0];
			}
			map = new mapboxgl.Map({
				container: 'map',
				style: MAP_URL,
				center: { lat: users[0].location[0], lng: users[0].location[1] },
				zoom: 15
			});

			for (const user of users) {
				if (user.location.length === 0)
				{
					user.location = [0.0, 0.0, null, 0];
				}
				const template = document.getElementById('marker');
				const clone = document.importNode(template.content, true);
				let el = clone.firstElementChild;
				el.children[0].src = user.icon;

				markers[user.uid] = new mapboxgl.Marker(el)
					.setLngLat({ lat: user.location[0], lng: user.location[1] })
					.addTo(map);
			}

			main_marker = markers[account.uid];
			navigator.geolocation.getCurrentPosition(mapinit, initerror, {"enableHighAccuracy": true, "timeout": 5000, "ma  ximumAge": 1000});
		}
    }
    catch (err)
    {
        console.info("Failed Convert.", e, err)
    }
});

const register = () => {
	const password = prompt("パスワードを設定しよう。");
	if (password === "" || password === null) {
		alert("パスワードはなにかしら設定しよう。\nセキュリティー面とバグが起きそうで怖いからだよ。")
		register();
		return;
	}
	sha256(password).then(hash => socket.send(JSON.stringify({command: "REGISTER", password: hash})))
}

const ws_post = (loc) => {
    const time = new Date();
    socket.send(JSON.stringify({command: "POST", uid: account.uid, password: account.password, location: [loc.coords.latitude, loc.coords.longitude, loc.coords.speed, time.getTime()]}));
}

const ws_add_friend = (uid) => {
    socket.send(JSON.stringify({command: "FRIEND", action: "ADD", password: account.password, uid: account.uid, user_id: uid}));
}

const ws_del_friend = (uid) => {
    socket.send(JSON.stringify({command: "FRIEND", action: "DEL", password: account.password, uid: account.uid, user_id: Number(uid)}));
}

const ws_fetch = () => {
    socket.send(JSON.stringify({command: "FETCH", uid: account.uid, password: account.password}));
}

const ws_init = () => {
	socket.send(JSON.stringify({command: "INIT", uid: account.uid, password: account.password}));
}
