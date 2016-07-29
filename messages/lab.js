// Your JavaScript goes here...

var request = new XMLHttpRequest();

function parse() {

	request.open("GET", "https://messagehub.herokuapp.com/messages.json", true);

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			data = request.responseText;
			messages = JSON.parse(data);
			elem = document.getElementById("messages");
			elem.innerHTML = "";

			for (i = 0; i < messages.length; i++) {
				elem.innerHTML += "<p class=\"messageWrapper\"><span class=\"messageBody\">" + messages[i]["content"] + "</span><span class=\"sender\">" + messages[i]["username"] + "</span></p>";
			}
		}
		else if (request.readyState == 4 && request.status != 200) {
			document.getElementById("messages").innerHTML = "<p class=\"errorMessage\">Messages not found</p>";
		}
	};
	request.send(null);
}