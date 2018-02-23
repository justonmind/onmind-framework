		// modal.js
		(function() {
			var $modal 									= $('.modal-order--nerve--modal');
			var $openers 								= $('.modal-order--nerve--opener');
			var $closers 								= $('.modal-order--nerve--closer')
																		.add('#overlay');
			var $overlay 								= $('#overlay');
			var $page 									= $('#site-page');
			var pageFixedClass 					= 'site-page_fixed';
			var showedModalClass 				= 'modal_showed';
			var showedTouchPanelClass 	= 'touch-panel_showed';
			var showedOverlayClass 			= 'overlay_showed';
			var closingDelay 						= 300;
			var $captionElement					= $('.modal__caption', $modal);
			var $reasonInput						= $('input[name=reason]', $modal);
			var $hiddenElements					= $('.form__input-group_hidden', $modal);
			var $touchPanel							= $('#touch-panel');

			$openers.on('click', function(e) {
				e.preventDefault();
				additionalActions(this);
				$modal.addClass(showedModalClass);
				$overlay.addClass(showedOverlayClass);
				$page.addClass(pageFixedClass);
				$touchPanel.removeClass(showedTouchPanelClass);
			});

			$closers.on('click', function() {
				$modal.removeClass(showedModalClass);
				setTimeout(function() {
					$overlay.removeClass(showedOverlayClass);
					$page.removeClass(pageFixedClass);
				}, closingDelay);
			});

			function additionalActions(thisObject) {
				// put your code here
			}
		})();
