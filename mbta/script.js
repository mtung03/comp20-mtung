
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

function init()
{
    // originate map at south station for now
    var start = new google.maps.LatLng(stations["South Station"][0], stations["South Station"][1]);

    // Set up map
    var myOptions = {
        zoom: 13, 
        center: start,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    // Create the map in the "map_canvas" <div>
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    map = addMarkers(map);
    map = addRedLine(map);

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
        markers.push(marker)
    }
    return map;
}

function addRedLine(map) {
    var redLinePath = makePath();
    var redLine = new google.maps.Polyline({
        path: redLinePath,
        geodesic: true,
        map: map,
        strokeColor: '#ff0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
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