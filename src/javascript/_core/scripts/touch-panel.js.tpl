		// touch-panel.js
		(function() {
			var $panel 							=	$('#touch-panel');
			var $openers 						=	$('.touch-panel--nerve--opener');
			var $closers 						=	$('.touch-panel--nerve--closer')
																	.add('#overlay');
			var $overlay 						=	$('#overlay');
			var $page 							=	$('#page');
			var pageFixedClass 			=	'page_fixed';
			var showedPanelClass 		=	'touch-panel_showed';
			var showedOverlayClass 	=	'overlay_showed';
			var closingDelay 				= 300;

			$openers.on('click', function(e) {
				e.preventDefault();
				$panel.addClass(showedPanelClass);
				$overlay.addClass(showedOverlayClass);
				$page.addClass(pageFixedClass);
			});

			$closers.on('click', function() {
				$panel.removeClass(showedPanelClass);
				setTimeout(function() {
					$overlay.removeClass(showedOverlayClass);
					$page.removeClass(pageFixedClass);
				}, closingDelay);
			});
		})();
