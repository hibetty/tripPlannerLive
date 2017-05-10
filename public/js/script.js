$('document').ready(function(){
	var item;

	hotels.forEach(function(ele){
		$('#hotel-choices').append('<option>' + ele.name + '</option>');
		item = ele;
	});
	restaurants.forEach(function(ele){
		$('#restaurant-choices').append('<option>' + ele.name + '</option>');
	});
	activities.forEach(function(ele){
		$('#activity-choices').append('<option>' + ele.name + '</option>');
	});

	// $('button').on('click', function(){
	// 	//var content = $(this).prev().find('option').text();
	// 	var test = $(this).prev().val();
	// 	console.log(test);
	// });

	$('button.add').on('click', function(){
		var selectedOption = $(this).prev().val();
		var selectType = $(this).prev().attr("id");
		if(selectType === 'hotel-choices'){
			$('div.hotel').append('<span class="title">' + selectedOption + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>');

			
			//drawMarker('hotel', [item.place.location[0], item.place.location[1]]);
		} else if (selectType === 'restaurant-choices') {
			$('div.restaurant').append('<span class="title">' + selectedOption + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>');

		} else {
			$('div.activity').append('<span class="title">' + selectedOption + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>');


		}
	});



});