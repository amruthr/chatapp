$(function(){
	var socket = io.connect('http://localhost:3000')

	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")

	send_username.click(function(){	
		console.log(username.val())
		socket.emit('change_username', {username:username.val()})
	})

	send_message.click(function(){
		socket.emit('change_username', {username:username.val()})
		socket.emit('new_message' , {message:message.val()})
	})

	socket.on("new_message", (data)=>{
		console.log(data)
		if (data.username == username.val())
		chatroom.append("<p class = 'messageme'>"+data.username+" : "+data.message+"</p>")
		else
		chatroom.append("<p class = 'message'>"+data.username+" : "+data.message+"</p>")
	})
});

function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  checkCookie();
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var user=getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
    document.getElementById('username').value = user;
  } else {
     user = prompt("Please enter your name:","");
     if (user != "" && user != null) {
       setCookie("username", user, 30);
     }
  }
}
checkCookie();