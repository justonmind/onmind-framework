		// menu.js
		(function() {
			var $menu 						=	$('#touch-menu');
			var $items 						=	$('.touch-menu__item:has(.touch-menu-dropdown)', $menu);
			var $links 						=	$('.touch-menu__link', $items);
			var ddMenuEl 					=	'.touch-menu-dropdown';
			var slideTime 				=	250;
			var openedItemClass 	=	'touch-menu__item_opened';
			var itemWithDdClass 	=	'touch-menu__item_has-dd';

			$items.addClass(itemWithDdClass);
			$links.on('click', function(e) {
				e.preventDefault();
			});

			$items.on('click', function() {
				$(this)
					.toggleClass(openedItemClass)
					.children(ddMenuEl)
					.slideToggle(slideTime);
			});

			$(ddMenuEl).on('click', function(e) {
				e.stopPropagation();
			});

		})();
