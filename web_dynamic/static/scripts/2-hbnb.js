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
    $.get('http://127.0.0.1:5001/api/v1/status/', function (data, apiStatus) {
    if (apiStatus === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
});
