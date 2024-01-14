$(document).ready(function() {
    // Variable to store checked Amenity IDs
    let checkedAmenities = {};

    // Listen for changes on each input checkbox
    $('input[type="checkbox"]').change(function() {
        const amenityID = $(this).data('id');
        const amenityName = $(this).data('name');

        if ($(this).prop('checked')) {
            // Checkbox is checked, store Amenity ID
            checkedAmenities[amenityID] = amenityName;
        } else {
            // Checkbox is unchecked, remove Amenity ID
            delete checkedAmenities[amenityID];
        }

        // Update the h4 tag inside the div Amenities
        updateAmenitiesList();
    });

    // Function to update the h4 tag with the list of checked amenities
    function updateAmenitiesList() {
        if (Object.keys(checkedAmenities).length > 0) {
            const amenitiesList = Object.values(checkedAmenities).join(', ');
            $('div.amenities h4').text(amenitiesList);
        } else {
            $('div.amenities h4').html('&nbsp;');
        }
    }

    //Get api status and update the class, available
    $.ajax({
      url: 'http://127.0.0.1:5001//api/v1/places_search',
      type: 'POST',
      contentType: 'application/json',
      data: '{}',
      success: (data) => {
        data.forEach(place => {
          $('SECTION.places').append('\
            <article>\
	          <div class="title_box">\
	            <h2>' + place.name + '</h2>\
	            <div class="price_by_night">$' + place.price_by_night + '</div>\
            </div>\
	          <div class="information">\
	            <div class="max_guest">' + place.max_guest + 'Guests</div>\
              <div class="number_rooms">' + place.number_rooms + 'Bedrooms</div>\
              <div class="number_bathrooms">' + place.number_bathrooms + 'Bathrooms</div>\
	          </div>\
	          <div class="user"><b>Owner:</b></div>\
            <div class="description">' + place.description + '</div>\
	          </article>\
          ')
        });
      },
    })
});
