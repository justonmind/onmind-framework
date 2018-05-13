		// totop
		(function() {
			var $totop = $('#totop');
			var isScrolling = false;
			var scrollThreshold = 100;
			var scrollDuration = 600;
			var showedClass = 'totop_showed';

			$(window).on('scroll', function() {
				if ($(window).scrollTop() > scrollThreshold) {
					$totop.addClass(showedClass);
				} else {
					$totop.removeClass(showedClass);
				}
			});

			$totop.on('click', function(e) {
				e.preventDefault();
				if (!isScrolling) {
					isScrolling = true;
					$("html, body").animate({scrollTop: 0}, scrollDuration, function() {
						isScrolling = false;
					});
				}
			});
		})();
