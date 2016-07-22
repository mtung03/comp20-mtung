
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

    // Create a marker              
    var marker = new google.maps.Marker({
        position: start,
        title: "South Station, Red Line"
    });
    marker.setMap(map);
    
    // This is a googlelobal info window...
    var infowindow = new google.maps.InfoWindow();
    
    // Open info window on click of marker
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(marker.title);
        infowindow.open(map, marker);
    });
}