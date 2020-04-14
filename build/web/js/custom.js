(function($) {

    "use strict";

    // REMOVE # FROM URL
	$( 'a[href="#"]' ).click( function(e) {
		e.preventDefault();
	});
	
	// TOOLTIP	
	$(".tool-tip").tooltip({
		placement: "bottom"
	});
	
	// CAMERA SLIDER
	$("#camera_wrap_1").camera({
		alignment: 'center',
		autoAdvance: false,
		mobileAutoAdvance: true,
		barDirection: 'leftToRight',
		barPosition: 'bottom',
		loader: 'none',
		opacityOnGrid: false, 
		cols: 12,
		height: '50%',
		playPause: false,
		pagination: false,
		imagePath: 'plugins/camera/images/'
	});
	
	// NEWS CAROUSEL
	$("#news-carousel, #comments-carousel").carousel({
		interval: false
	});
	
	// ACCORDION
	var $active = $("#accordion .collapse.show, #accordion-faqs .collapse.show")
					.prev()
					.addClass("active");
					
	$active
		.find("a")
		.append("<span class=\"fa fa-minus float-right\"></span>");
		
	$("#accordion .card-header, #accordion-faqs .card-header")
		.not($active)
		.find('a')
		.prepend("<span class=\"fa fa-plus float-right\"></span>");
	
	$("#accordion, #accordion-faqs").on("show.bs.collapse", function (e) {	
		$("#accordion .card-header.active")
			.removeClass("active")
			.find(".fa")
			.toggleClass("fa-plus fa-minus");				
		$(e.target)
			.prev()
			.addClass("active")
			.find(".fa")
			.toggleClass("fa-plus fa-minus");		
	});
	
	$("#accordion, #accordion-faqs").on("hide.bs.collapse", function (e) {
		$(e.target)
			.prev()
			.removeClass("active")
			.find(".fa")
			.removeClass("fa-minus")
			.addClass("fa-plus");
	});
	
	// DOCTORS FILTERS
	var $grid = $('#doctors-grid');
	$grid.shuffle({
		itemSelector: '.doctors-grid', // the selector for the items in the grid
		speed: 500 // Transition/animation speed (milliseconds)
	});
	/* reshuffle when user clicks a filter item */
	$('#doctors-filter li a').click(function (e) {
		// set active class
		$('#doctors-filter li a').removeClass('active');
		$(this).addClass('active');
		// get group name from clicked item
		var groupName = $(this).attr('data-group');
		// reshuffle grid
		$grid.shuffle('shuffle', groupName );
	});
	
	//MAGNIFIC POPUP
	$('.gallery-grid').magnificPopup({
		delegate: 'a.zoom', 
		type: 'image',
		gallery: {
			enabled: true
		}
	});
	
	$('.image-zoom').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});
	
	// Price Range Slider 
	
	var priceRange = $("#price-range");
	var priceRangeMinAmt = $("#price-range-slider-min-amt");
	var priceRangeMaxAmt = $("#price-range-slider-max-amt");
	var priceRangeCurrency = "$";
	
	priceRangeMinAmt.text( priceRangeCurrency + priceRange.data("sliderMin") );
	priceRangeMaxAmt.text( priceRangeCurrency + priceRange.data("sliderMax") );
	
	priceRange.slider({
		id: 'price-range'
	});
	
	priceRange.on("slide", function(slideEvt) {
		priceRangeMinAmt.text( priceRangeCurrency + slideEvt.value[0] );
		priceRangeMaxAmt.text( priceRangeCurrency + slideEvt.value[1] );
	});
	
	// TABS
	$('.nav-tabs a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});	
	
	//AJAX CONTACT FORM
	$(".contact-form").submit(function() {
		var rd = this;
		var url = "sendemail.php"; // the script where you handle the form input.
		$.ajax({
			type: "POST",
			url: url,
			data: $(".contact-form").serialize(), // serializes the form's elements.
			success: function(data) {
				$(rd).prev().text(data.message).fadeIn().delay(3000).fadeOut();
			}
		});
		return false; // avoid to execute the actual submit of the form.
	});
	
	// GOOGLE MAP
	function initialize($) {
		var mapOptions = {	
			zoom: 8,
			center: new google.maps.LatLng(17.421306, 78.457553),
			disableDefaultUI: true
		};
		var map = new google.maps.Map(document.querySelector('.map'), mapOptions);
	}
	google.maps.event.addDomListener(window, 'load', initialize);
	
})(window.jQuery);