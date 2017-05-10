$(function initializeMap () {

  const fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  const styleArr = [
    {
      featureType: 'landscape',
      stylers: [{ saturation: -100 }, { lightness: 60 }]
    },
    {
      featureType: 'road.local',
      stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
    },
    {
      featureType: 'transit',
      stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
    },
    {
      featureType: 'administrative.province',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'water',
      stylers: [{ visibility: 'on' }, { lightness: 30 }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
    }, 
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ visibility: 'off' }]
    }, 
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
    }
  ];

  const mapCanvas = document.getElementById('map-canvas');

  const currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  const iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  var markers = [];
  var index;

  function drawMarker (type, coords) {
    const latLng = new google.maps.LatLng(coords[0], coords[1]);
    const iconURL = iconURLs[type];
    const marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    markers.push(marker);
    index = markers.length -1;
    marker.setMap(currentMap);
  }

  // drawMarker('hotel', [40.705137, -74.007624]);
  // drawMarker('restaurant', [40.705137, -74.013940]);
  // drawMarker('activity', [40.716291, -73.995315]);

  var savedItineraries = [{
    hotel: [],
    restaurant: [],
    activity: []
  }];
  var itineraryObj = {
    hotel: [],
    restaurant: [],
    activity: []
  };

  hotels.forEach(function(ele){
    $('#hotel-choices').append('<option>' + ele.name + '</option>');
  });
  restaurants.forEach(function(ele){
    $('#restaurant-choices').append('<option>' + ele.name + '</option>');
  });
  activities.forEach(function(ele){
    $('#activity-choices').append('<option>' + ele.name + '</option>');
  });

  $('button.add').on('click', function(){
    var selectedOption = $(this).prev().val();
    var selectType = $(this).prev().attr("id");
    var dayIndex = $('.day-btn').index($('.clickedDay'));
    
    if(selectType === 'hotel-choices'){
      var hotelData = '<span class="title">' + selectedOption + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>'
      $('div.hotel').append(hotelData);
      savedItineraries[dayIndex].hotel.push(hotelData);

      hotels.forEach(function(hotel){
        if(hotel.name === selectedOption){
          drawMarker('hotel', [hotel.place.location[0], hotel.place.location[1]]);
        }
      });
      // var className = index.toString();
      $('div.hotel').children('span').last().attr('id', index);


    } else if (selectType === 'restaurant-choices') {
      var restaurantData = '<span class="title">' + selectedOption + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>';
      $('div.restaurant').append(restaurantData);
      savedItineraries[dayIndex].restaurant.push(restaurantData);


      restaurants.forEach(function(restaurant){
        if(restaurant.name === selectedOption){
          drawMarker('restaurant', [restaurant.place.location[0], restaurant.place.location[1]]);
        }
      });

      console.log(index);
      var className = index.toString();
      $('div.restaurant').children('span').last().attr('id', index);

    } else {
      var activityData = '<span class="title">' + selectedOption + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>'
      $('div.activity').append(activityData);
      savedItineraries[dayIndex].activity.push(activityData);


      activities.forEach(function(activity){
        if(activity.name === selectedOption){
          drawMarker('activity', [activity.place.location[0], activity.place.location[1]]);
        }
      });
      var className = index.toString();
      $('div.activity').children('span').last().attr('id', index);
    }
  });

  $('.itinerary-item').on('click', 'button', function(){
    var id = $(this).prev().attr('id');
    // var arrayClass = className.split(' ');
    // console.log("~~~~~~", arrayClass[1]);

    markers[parseInt(id)].setMap(null);

    $(this).prev().remove();
    $(this).remove();

  });

  // add day buttons
    var dayCount = 2;
  $('.day-buttons').on('click', '#day-add', function(){
    $(this).before('<button class="btn btn-circle day-btn">' + dayCount + '</button>');
    dayCount++;
    savedItineraries.push(itineraryObj);
    itineraryObj = {
    hotel: [],
    restaurant: [],
    activity: [] };
  });

  //find day/switch
  $('.day-buttons').on('click', '.day-btn', function(){
    var index = $('.day-btn').index($(this));
    console.log(index);

    $(this).toggleClass('clickedDay',true);
    $(this).siblings('.day-btn').toggleClass('clickedDay',false);

    removeEverything();
    var obj = savedItineraries[index]; //gives us the obj
    for(var key in obj){
      obj[key].forEach(function(item){
        $('div.'+ key).append(item);
        //drawMarker('key', item.place.location[0], item.place.location[1]]);
      });
    }
  });
  // $('button').on('click', function(){
  //   var selectedOption = $(this);
  //   console.log(selectedOption);
  // });

  function removeEverything() {
    $('div.itinerary-item').children().remove();
    markers.forEach(function(ele){ele.setMap(null)});
  }

});
