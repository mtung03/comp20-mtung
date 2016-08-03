Comp 20 Lab 8 - MBTA

Create a dynamic map of the red line.

Currently:
	- all redline stations marked with icon
	- red line superimposed over map -- including branch
	- name of station displays on hover
	- shows and centers map on user's location
	- finds closest T station and displays distance when user's marker is 
	  clicked
	- gets train info and shows times of incoming trains when station markeers
	  are clicked

To find the distance between the user and the stations, the Haversine formula
was used, the javascript implementation of which was taken from a post on 
stackoverflow (as noted in the comments of the function).

Hours spent: ~4 (on 2nd part) ~8-9 (total)