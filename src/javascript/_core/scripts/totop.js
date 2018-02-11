		// totop
		(function() {
			var $totop = $('#totop');
			var isScrolling = false;
			var scrollThreshold = 100;
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
					$(window).animate({scrollTop: 0}, 800, function() {
						isScrolling = false;
					});
				}
			});
		})();
