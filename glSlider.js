(function($){
	var methods = {
		init : function(options) {
			// use settings to hold the default class names of the slider elements
			// and the number of items that should be visible
			var settings = {
				'carouselVisibleItems'	: 4,
				'carouselBox'			: '.window' 
			};

			return this.each(function() {
				// if options exist, lets merge them with our default settings
				if (options) { 
					$.extend(settings, options);
				}

				// set initial variables
				var $this = $(this);
				var carouselItems = $this.find('li').length;

				// setup the slide functionality if there are enough items in the widget
				if (carouselItems > settings.carouselVisibleItems) {
					// set some more variables
					var carouselBox = $this.find(settings.carouselBox);
					var carousel = $this.find('ul');

					// set carousel width
					var itemWidth = carousel.find("li:first").outerWidth();
					var carouselWidth = itemWidth * carouselItems;
					carousel.width(carouselWidth);

					// create scroll links and set click functionality
					// scroll right button
					$('<div class="rotate right"><a href="#">Rotate Right</a></div>')
					.appendTo(this)
					.click(function(e) {
						e.preventDefault();
						var currentScroll = carouselBox.scrollLeft();
						var newScroll = Math.floor(currentScroll + (itemWidth * settings.carouselVisibleItems));
						// scroll, then hide the right scroll button if we are all the way to the right
						carouselBox.stop().animate({
						    scrollLeft : newScroll
						  }, 500, function() {
							if (newScroll >= carouselWidth - (itemWidth * settings.carouselVisibleItems)) {
								$this.find("div.rotate.right a").hide();
							}
						});
						// make sure the left scroll button is visible now that we have scrolled to the right
						$this.find("div.rotate.left a").show();
					});
					// scroll left button
					$('<div class="rotate left"><a href="#">Rotate Left</a></div>')
					.appendTo(this)
					.click(function(e) {
						e.preventDefault();
						var currentScroll = carouselBox.scrollLeft();
						var newScroll = Math.ceil(currentScroll - (itemWidth * settings.carouselVisibleItems));
						// scroll, then hide the left scroll button if we are all the way to the left
						carouselBox.stop().animate({
						    scrollLeft : newScroll
						  }, 500, function() {
							if (newScroll <= 0) {
								$this.find("div.rotate.left a").hide();
							}
						});	
						// make sure the right scroll button is visible now that we have scrolled to the left
						$this.find("div.rotate.right a").show();
					})
					// we're going to initially hide the left scroll button because the slider is scrolled all the way to the left at initiation
					.find("a").hide();
				}
			});	
		}
	};

	$.fn.glSlider = function(method) {
		// Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.glSlider');
		}    
	};
})(jQuery);


jQuery(document).ready(function() {
	jQuery(".slider").glSlider();
});