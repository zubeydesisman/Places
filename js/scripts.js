// Business Logic for AddressBook ---------
function Places() {
  this.places = [],
  this.currentId = 0
}

Places.prototype.addPlaces = function(place) {
  place.id = this.assignId();
  this.places.push(place);
}

Places.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

Places.prototype.findPlace = function(id) {
  for (var i=0; i< this.places.length; i++) {
    if (this.places[i]) {
      if (this.places[i].id == id) {
        return this.places[i];
      }
    }
  };
  return false;
}

 Places.prototype.deleteplace = function(id) {
    for (var i=0; i< this.places.length; i++) {
      if (this.places[i]) {
        if (this.places[i].id == id) {
          delete this.places[i];
          return true;
        }
      }
    };
    return false;
  }

  // Business Logic for Places ---------
  function Place(location, landmark, date) {
    this.location = location,
    this.landmark = landmark,
    this.date= date
  }

  // User Interface Logic ---------
  var places = new Places();

  function displayPlaceDetails(placestoToDisplay) {
    var placesList = $("ul#places");
    var htmlForPlaceInfo = "";
    console.log(placesList);
    placesToDisplay.places.forEach(function(place) {
      htmlForPlaceInfo += "<li id=" + place.id + ">" + place.location + " " + place.landmark + "</li>";
    });
    placesList.html(htmlForPlaceInfo);
  };

  function showPlace(placeId) {
    var place = places.findPlace(placeId);
    $("#show-places").show();
    $(".location").html(place.location);
    $(".lasndmark").html(place.landmark);
    $(".date").html(place.date);
    var buttons = $("#buttons");
    buttons.empty();
    buttons.append("<button class='deleteButton' id=" + place.id + ">Delete</button>");
  }

  function attachPlaceListeners() {
    $("ul#places").on("click", "li", function() {
      showPlace(this.id);
    });
    $("#buttons").on("click", ".deleteButton", function() {
      places.deleteplace(this.id);
      $("#show-places").hide();
      displayPlaceDetails(place);
    });
  };

  $(document).ready(function() {
    attachPlaceListeners();
    $("form#new-place").submit(function(event) {
      event.preventDefault();
      var inputtedLocation = $("input#new-location").val();
      var inputtedLandmark = $("input#new-landmark").val();
      var inputtedDate = $("input#new-date").val();
      $("input#new-location").val("");
      $("input#new-landmark").val("");
      $("input#new-date").val("");
      var newPlace = new Place(inputtedLocation, inputtedLandmark, inputtedDate);
      places.addPlaces(newPlace);
      displayPlaceDetails(places);
    })
  })
