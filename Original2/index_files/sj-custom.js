jQuery(window).load(function() {
	jQuery(".loader-mod-box").fadeOut("slow");
});
// Add Class In Slideshow
function customPager($classAll) {	
	jQuery(".owl-item.active .slider-detail .detail-top").addClass("detail-top-active");
	jQuery(".owl-item.active .slider-detail .detail-title").addClass("detail-title-active");
	jQuery(".owl-item.active .slider-detail .detail-bottom").addClass("detail-bottom-active");
	jQuery(".owl-item.active .slider-detail .detail-button").addClass("detail-button-active");
}


jQuery(window).load(function()  {
 
	jQuery("#owl-carousel").owlCarousel({
		autoPlay: 3000, //Set AutoPlay to 3 seconds
		items : 1,
		//Pagination
		pagination : true,
		paginationNumbers: false,
		responsive:{
			768:{
				items: 3,
				margin: 8,
			},
			992:{
				items: 3,
				margin: 8,
			},
			1200:{
				items: 1,
			},
		}
	});
 
});

