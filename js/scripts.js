// Business Logic for Places ---------
function Places() {
  this.visitedplaces = [],
  this.currentId = 0
}

Places.prototype.addVisitedPlace = function(place) {
  place.id = this.assignId();
  this.visitedplaces.push(place);
}

Places.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

Places.prototype.findVisitedPlace = function(id) {
  for (var i=0; i< this.visitedplaces.length; i++) {
    if (this.visitedplaces[i]) {
      if (this.visitedplaces[i].id == id) {
        return this.visitedplaces[i];
      }
    }
  };
  return false;
}

Places.prototype.deleteVisitedPlace = function(id) {
  for (var i=0; i< this.visitedplaces.length; i++) {
    if (this.visitedplaces[i]) {
      if (this.visitedplaces[i].id == id) {
        delete this.visitedplaces[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function VisitedPlace(location,landmark,date) {
  this.location = location,
  this.landmark = landmark,
  this.date = date
}

// User Interface Logic ---------
var place = new Places();

function displayVisitedPlaceDetails(placeToDisplay) {
  var placesList = $("ul#places");
  var htmlForVisitedPlaceInfo = "";
  placeToDisplay.visitedplaces.forEach(function(place) {
  htmlForVisitedPlaceInfo += "<li id=" + place.id + ">" + place.location + " " + place.landmark + "</li>";
  });
  placesList.html(htmlForVisitedPlaceInfo);
};

function showVisitedPlace(placeId) {
  var showplace = place.findVisitedPlace(placeId);
  $("#show-places").show();
  $(".location").html(showplace.location);
  $(".landmark").html(showplace.landmark);
  $(".date").html(showplace.date);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + place.id + ">Delete</button>");
}

function attachVisitedPlaceListeners() {
  $("ul#places").on("click", "li", function() {
    showVisitedPlace(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    place.deleteVisitedPlace(this.id);
    $("#show-places").hide();
    displayVisitedPlaceDetails(place);
  });
};

$(document).ready(function() {
  attachVisitedPlaceListeners();
  $("form#new-place").submit(function(event) {
    event.preventDefault();
    var inputtedLocation = $("input#new-location").val();
    var inputtedLandmark= $("input#new-landmark").val();
    var inputtedDate = $("input#new-date").val();
    $("input#new-location").val("");
    $("input#new-landmark").val("");
    $("input#new-date").val("");
    var newVisitedPlace = new VisitedPlace(inputtedLocation, inputtedLandmark, inputtedDate);
    place.addVisitedPlace(newVisitedPlace);
    displayVisitedPlaceDetails(place);
  })
})
