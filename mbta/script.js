
/* starting with script form google map api example for now */

var stations = {  
 "South Station":     [    42.352271, -71.05524200000001],
 "Andrew":            [   42.330154 ,         -71.057655],
 "Porter Square":     [     42.3884 , -71.11914899999999],
 "Harvard Square":    [   42.373362 ,         -71.118956],
 "JFK/UMass":         [   42.320685 ,         -71.052391],
 "Savin Hill":        [    42.31129 ,         -71.053331],
 "Park Street":       [ 42.35639457 ,        -71.0624242],
 "Broadway":          [   42.342622 ,         -71.056967],
 "North Quincy":      [   42.275275 ,         -71.029583],
 "Shawmut":           [ 42.29312583 , -71.06573796000001],
 "Davis":             [    42.39674 ,         -71.121815],
 "Alewife":           [   42.395428 ,         -71.142483],
 "Kendall/MIT":       [ 42.36249079 ,       -71.08617653],
 "Charles/MGH":       [   42.361166 ,         -71.070628],
 "Downtown Crossing": [   42.355518 ,         -71.060225],
 "Quincy Center":     [   42.251809 ,         -71.005409],
 "Quincy Adams":      [   42.233391 ,         -71.007153],
 "Ashmont":           [   42.284652 , -71.06448899999999],
 "Wollaston":         [  42.2665139 ,        -71.0203369],
 "Fields Corner":     [   42.300093 ,         -71.061667],
 "Central Square":    [   42.365486 ,         -71.103802],
 "Braintree":         [  42.2078543 ,        -71.0011385], };

var request = new XMLHttpRequest();  // for getting train info

request.open("GET", "https://powerful-depths-66091.herokuapp.com/redline.json")

request.onreadystatechange = updateTrains;

request.send(null);

var trainData = {};

function updateTrains () {
    if (request.readyState == 4 && request.status == 200) {
        result = "";
        raw = request.responseText;
        trainData = JSON.parse(raw);
    }
};

var myLat = 0;
var myLng = 0;

var me = new google.maps.LatLng(myLat, myLng);
var myOptions = {
            zoom: 13, // The larger the zoom number, the bigger the zoom
            center: me,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
var map;
var marker;
var infowindow = new google.maps.InfoWindow();

function init()
{
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    getMyLocation();
    map = addRedLine(map);
    map = addMarkers(map);
}

function getMyLocation() {
    if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
        navigator.geolocation.getCurrentPosition(function(position) {
            myLat = position.coords.latitude;
            myLng = position.coords.longitude;
            renderMap();
        });
    }
    else {
        alert("Geolocation is not supported by your web browser.  What a shame!");
    }
}

function renderMap()
{
    me = new google.maps.LatLng(myLat, myLng);
    
    // Update map and go there...
    map.panTo(me);

    var closestStation = getClosestStation();

    var trainTimes = parseTrainData(closestStation);

    console.log(trainTimes);

    // Create a marker
    marker = new google.maps.Marker({
        position: me,
        title: "My Location",
        content: "Closest Station is " + closestStation[0] + "\n" + trainTimes
    });
    marker.setMap(map);
        
    // Open info window on click of marker
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(marker.content);
        infowindow.open(map, marker);
    });
}

function addMarkers(map) {
    // Create a marker      
    var redLineIcon = "images/red_line.png"

    var markers = [];

    // add markers for each station
    for (var key in stations) {
        var marker = new google.maps.Marker({
            position: {lat: stations[key][0], lng: stations[key][1]},
            icon: redLineIcon,
            map: map,
            title: key
        });
        var infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', function () {
                                infoWindow.setContent(this.title);
                                infoWindow.open(map, this);
                            });
        markers.push(marker)
    }
    return map;
}

function addRedLine(map) {
    var redLinePath = makePath();
    var braintreeBranch = makeBranch();

    var redLine = new google.maps.Polyline({
        path: redLinePath,
        geodesic: true,
        map: map,
        strokeColor: '#ff0000',
        strokeOpacity: 1.0,
        strokeWeight: 3
    });
    var braintreeRoute = new google.maps.Polyline({
        path: braintreeBranch,
        geodesic: true,
        map: map,
        strokeColor: '#ff0000',
        strokeOpacity: 1.0,
        strokeWeight: 3
    });

    return map;
}

function makePath() {
    var path = [
        {lat: stations["Alewife"][0], lng: stations["Alewife"][1]},
        {lat: stations["Davis"][0], lng: stations["Davis"][1]},
        {lat: stations["Porter Square"][0], lng: stations["Porter Square"][1]},
        {lat: stations["Harvard Square"][0], lng: stations["Harvard Square"][1]},
        {lat: stations["Central Square"][0], lng: stations["Central Square"][1]},
        {lat: stations["Kendall/MIT"][0], lng: stations["Kendall/MIT"][1]},
        {lat: stations["Charles/MGH"][0], lng: stations["Charles/MGH"][1]},
        {lat: stations["Park Street"][0], lng: stations["Park Street"][1]},
        {lat: stations["Downtown Crossing"][0], lng: stations["Downtown Crossing"][1]},
        {lat: stations["South Station"][0], lng: stations["South Station"][1]},
        {lat: stations["Broadway"][0], lng: stations["Broadway"][1]},
        {lat: stations["Andrew"][0], lng: stations["Andrew"][1]},
        {lat: stations["JFK/UMass"][0], lng: stations["JFK/UMass"][1]},
        {lat: stations["Savin Hill"][0], lng: stations["Savin Hill"][1]},
        {lat: stations["Fields Corner"][0], lng: stations["Fields Corner"][1]},
        {lat: stations["Shawmut"][0], lng: stations["Shawmut"][1]},
        {lat: stations["Ashmont"][0], lng: stations["Ashmont"][1]}
    ];
    return path;
}

function makeBranch() {
    return [
        {lat: stations["JFK/UMass"][0], lng: stations["JFK/UMass"][1]},
        {lat: stations["North Quincy"][0], lng: stations["North Quincy"][1]},
        {lat: stations["Wollaston"][0], lng: stations["Wollaston"][1]},
        {lat: stations["Quincy Center"][0], lng: stations["Quincy Center"][1]},
        {lat: stations["Quincy Adams"][0], lng: stations["Quincy Adams"][1]},
        {lat: stations["Braintree"][0], lng: stations["Braintree"][1]}
    ];
}

function getClosestStation() {
    var currClosest = "Braintree";
    var currDist = myDistance(stations["Braintree"]);
    for (station in stations) {
        var tempDist = myDistance(stations[station]);
        if (tempDist < currDist) {
            currClosest = station;
            currDist = tempDist;
        }
    }
    return [currClosest, currDist];
}

function parseTrainData(closestStation) {
    // console.log(trainData);
    // console.log(trainData["TripList"]);
    // console.log(trainData["TripList"]["Trips"]);
    var timeToTrains = [];
    var trips = trainData["TripList"]["Trips"];
    for (i = 0; i < trips.length; i++) {
        j = 0;
        predictions = trips[i]["Predictions"];
        for (stop in predictions) {
            //console.log(predictions[stop]["Stop"]);
            if (predictions[stop]["Stop"] == closestStation[0]) {
                timeToTrains.push(predictions[stop]["Seconds"]);
            }
        }
    }
    return timeToTrains.sort( function (a, b) {return a > b;});
}

function myDistance(stationLocation) { /* function from stackoverflow user talkol */
    Number.prototype.toRad = function() {
       return this * Math.PI / 180;
    }

    var lat2 = stationLocation[0]; 
    var lon2 = stationLocation[1]; 
    var lat1 = myLat; 
    var lon1 = myLng; 

    var R = 6371; // km 
    //has a problem with the .toRad() method below.
    var x1 = lat2-lat1;
    var dLat = x1.toRad();  
    var x2 = lon2-lon1;
    var dLon = x2.toRad();  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2);  
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; 

    return d;
}