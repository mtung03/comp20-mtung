// Your JavaScript goes here...

var request = new XMLHttpRequest();

function parse() {

	request.open("GET", "data.json", true);
	// Step 2: Set up callback function to deal with HTTP response data
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			console.log("Got the data back!");
			data = request.responseText;
			console.log(data);
			messages = JSON.parse(data);
			elem = document.getElementById("messages");
			elem.innerHTML = "";
			for (message in messages) {
				elem.innerHTML += "<p class=\"messageWrapper\"><span class=\"messageBody\">" + message["content"] + "</span><span class=\"sender\">" + message["username"] + "</span></p>";
			}
		}
		else if (request.readyState == 4 && request.status != 200) {
			// think 404 or 500
			document.getElementById("location").innerHTML = "<p>Whoops, something went terribly wrongo</p>";
		}
		else {
			console.log("In progress...");
		}
	};
	// Step 3: trigger the HTTP request
	// The argument for send() --data that you want to send to web server
	request.send(null);
}