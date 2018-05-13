		// volatile-select.js
		(function() {
			var $selects 			= $('.volatile-select');
			var $optBoxAll 		= $('.volatile-select__options-box');
			var hoveredClass 	= 'volatile-select_hovered';
			var slideTime 		= 200;
			var delayTime			= 700;

			$selects.each(function() {
				var $optBox = $('.volatile-select__options-box', this);
				var $me = $(this);
				var timer;

				$me.on('mouseenter', function() {
					clearTimeout(timer);
					close($selects.not(this), $optBoxAll.not($optBox));
					open($me, $optBox);
				}).on('mouseleave', function() {
					timer = setTimeout(function() {
						close($me, $optBox);
					}, delayTime);
				});
			});

			function open(obj, box) {
				obj.addClass(hoveredClass);
				box.slideDown(slideTime);
			}

			function close(obj, box) {
				obj.removeClass(hoveredClass);
				box.slideUp(slideTime);
			}
		})();
