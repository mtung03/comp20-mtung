Comp 20 Lab 9 - messages part two

Parses JSON data and displays it dynamically in the messages div of the html.

Uses the asynchronous XMLhttpRequest function to retrieve the data.

When the location of the data requested is data.json, the file in the same 
directory, the webpage works as expected for using both python's 
SimpleHTTPServer and opening it locally from a browser.

When the location of the data requested is changed from a relative path 
to an absolute path on the local machine (file:///etc, etc/messages/data.json),
the page works when opened locally with a browser, but not when the page is 
being served on a localhost port. This request is blocked because of the same-
origin policy, which sees the localhost server and files on the local machine
as being from different origins. This problem does not arise when opened 
directly with a browser because the origin (the local machine) is the same for
both files.

When the location of the data in the request.open function is changed 
to the remote address https://messagehub.herokuapp.com/messages.json, the 
request is again blocked with a message in the javascript console. This 
blocking is also because of javascript's same origin policy, which restricts
the call to heroku's data because it has a different origin than the index 
page. This problem occurs for both the localhost server and when the file is 
opened directly from the browser.


Approximate time spent: 1 hour