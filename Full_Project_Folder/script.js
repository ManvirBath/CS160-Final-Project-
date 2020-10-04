"use strict";

let map;
let places;
let infoWindow;
let markers = [];
let autocomplete;
let startingMarker = [];

const MARKER_PATH =
  "https://developers.google.com/maps/documentation/javascript/images/marker_green";
const hostnameRegexp = new RegExp("^https?://.+?/");

//Sets up the inital map, zoomed in on US
function initMap() 
{
  map = new google.maps.Map(document.getElementById("map"), 
  {
    zoom: 5,
    center: 
    {
      lat: 37.1,
      lng: -95.7
    },
    mapTypeControl: true,
    panControl: true,
    zoomControl: true,
    streetViewControl: false
  });

  //info window for each marker
  infoWindow = new google.maps.InfoWindow(
  {
    content: document.getElementById("info-content")
  }); 

  //Autocomplete searches restricted to country
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
    {
      componentRestrictions: 
      {
        country: "us"
      }
    }
  );
  places = new google.maps.places.PlacesService(map);

  //When address field is changed, update map
  autocomplete.addListener("place_changed", onPlaceChanged);

} 

/*
When address is entered, get place info and zoom map in on place
and surrounding
*/
function onPlaceChanged() 
{
  //if starting marker already exsist, set it to null
  if(startingMarker[0])
  {
    startingMarker[0].setMap(null);
  }
  startingMarker = [];

  const place = autocomplete.getPlace();
  //if place exists (has lat/lng)
  if (place.geometry) 
  {
    map.panTo(place.geometry.location);
    map.setZoom(13);
    startingMarker[0] = new google.maps.Marker(
    {
      position: place.geometry.location,
      map,
      animation: google.maps.Animation.BOUNCE,
      title: "Starting Location"
    });
    search();
  } 
  else 
  {
    document.getElementById("autocomplete").placeholder = "Enter starting address";
  }
} // Search for ATMs within the starting address.

function search() 
{
  //search is restricted to Chase ATMs
  const search = {
    bounds: map.getBounds(),
    types: ["atm"],
    name: ["chase atm"],
  };

  places.nearbySearch(search, (results, status, pagination) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) 
    {
      //removes results and markers from previous search
      clearResults();
      clearMarkers(); 

      //Create marker for each ATM and assign letter to each marker
      for (let i = 0; i < results.length; i++) 
      {
        const markerLetter = String.fromCharCode(
          "A".charCodeAt(0) + (i % 26)
        );
        const markerIcon = MARKER_PATH + markerLetter + ".png"; // Use marker animation to drop the icons incrementally on the map.

        markers[i] = new google.maps.Marker(
        {
          position: results[i].geometry.location,
          animation: google.maps.Animation.DROP,
          icon: markerIcon
        }); 

        //When marker is selected, display info in info window
        markers[i].placeResult = results[i];
        google.maps.event.addListener(
          markers[i],
          "click",
          showInfoWindow
        );
        dropMarker(i);
        addResult(results[i], i);
      }
    }
  });
}

//Removes markers from map
function clearMarkers() 
{
  for (let i = 0; i < markers.length; i++) 
  {
    if (markers[i]) {
      markers[i].setMap(null);
    }
  }  
  markers = [];
}

//Removes results from table
function clearResults() 
{
  const results = document.getElementById("results");

  while (results.childNodes[0]) {
    results.removeChild(results.childNodes[0]);
  }
}

//Adds markers to map
function dropMarker(i) 
{
    markers[i].setMap(map);
}

//Adds search results to results table
function addResult(result, i) 
{
  const results = document.getElementById("results");
  const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
  const markerIcon = MARKER_PATH + markerLetter + ".png";
  const tr = document.createElement("tr");
  tr.style.backgroundColor = i % 2 === 0 ? "#F0F0F0" : "#FFFFFF";

  tr.onclick = function() 
  {
    google.maps.event.trigger(markers[i], "click");
  };

  const iconTd = document.createElement("td");
  const nameTd = document.createElement("td");
  const icon = document.createElement("img");
  icon.src = markerIcon;
  icon.setAttribute("class", "placeIcon");
  icon.setAttribute("className", "placeIcon");
  const name = document.createTextNode(result.name);
  iconTd.appendChild(icon);
  nameTd.appendChild(name);
  tr.appendChild(iconTd);
  tr.appendChild(nameTd);
  results.appendChild(tr);
}

/*
Gets details for ATM/bank location and shows info in a window 
when selected
*/
function showInfoWindow() {
  const marker = this;
  places.getDetails(
    {
      placeId: marker.placeResult.place_id
    },
    (place, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
      }

      infoWindow.open(map, marker);
      buildATMContent(place);
    }
  );
} 

/*
Loads ATM place information into HTML elements used by info window.
*/
function buildATMContent(place) {
  document.getElementById("atm-icon").innerHTML =
    '<img class="atmIcon" ' + 'src="' + place.icon + '"/>';
  document.getElementById("atm-address").textContent = place.vicinity;

  if (place.formatted_phone_number) 
  {
    document.getElementById("atm-phone-row").style.display = "";
    document.getElementById("atm-phone").textContent =
      place.formatted_phone_number;
  } 
  else 
  {
    document.getElementById("atm-phone-row").style.display = "none";
  } 
}