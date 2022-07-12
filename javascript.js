//set map options
var myLatLgt={lat:-21.53,lng:-45.46};
var mapOptions={
    center:myLatLgt,
    zoom:15,
    mapTypeId:google.maps.MapTypeId.ROADMAP
};
//create map
var map=new google.maps.Map(document.getElementById("googleMap"),mapOptions);

//create DirectionsService object to use route method and get a result for our request
var directionsService=new google.maps.DirectionsService();

//create DirectionsRenderer object which we will use to display the route
var directionsDisplay=new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);


//define calcRoute function
function calcRoute(){
    //create request
    var request={
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING; BYCYCLING; TRANSIT 
        unitSystem: google.maps.UnitSystem.METRIC,
    }

    //pass the request to the route method of the DirectionsService object
    directionsService.route(request,function(result,status){
        //if status OK
        if(status==google.maps.DirectionsStatus.OK){
            //get distance and time and show them in the box
            $("#output").html("<div class='alert-info'>From: "+document.getElementById("from").value+"<br>To: "+document.getElementById("to").value+"<br>Distance: "+result.routes[0].legs[0].distance.text+"<br>Travelling time: "+result.routes[0].legs[0].duration.text+"</div>");            

            //display the route using DirectionsRenderer object
            directionsDisplay.setDirections(result);
        }else{ //if status in not OK
            //delete route from the map
            directionsDisplay.setDirections({routes:[]})

            //recenter map
            map.setCenter(myLatLgt);

            //show error message
            $("#output").html("<div class='alert-danger'>Could not retrive drive distance</div>")
        }
    })
}

//create autocomplete objects for all inputs
            var options={
                types:["(cities)"]
            }
            var inputfrom=document.getElementById("from");
            var autocompletefrom=new google.maps.places.Autocomplete(inputfrom,options);

            var inputto=document.getElementById("to");
            var autocompleteto=new google.maps.places.Autocomplete(inputto,options);
