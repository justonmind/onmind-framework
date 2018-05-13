// touch-menu.js
		(function() {
			var $menu 						=	$('#touch-menu');
			var $items 						=	$('.touch-menu__item:has(.touch-menu-l2)', $menu);
			var $itemsL2 						=	$('.touch-menu-l2__item:has(.touch-menu-l3)', $menu);
			var $opener						=	$('<div>').addClass('touch-menu__item-opener');
			var $openerL2					=	$('<div>').addClass('touch-menu-l2__item-opener');
			var slideTime 				=	400;
			var activeClass				= 'touch-menu__item-opener_active';
			var activeClassL2			= 'touch-menu-l2__item-opener_active';

			$items.prepend($opener);
			$itemsL2.prepend($openerL2);

			$items.each(function() {
				var $opener		= $('.touch-menu__item-opener', this);
				var $menuL2 	= $('.touch-menu-l2', this);

				$opener.on('click', function(e) {
					e.preventDefault();
					$(this).toggleClass(activeClass)
					$menuL2.slideToggle(slideTime);
				});
			});

			$itemsL2.each(function() {
				var $opener		= $('.touch-menu-l2__item-opener', this);
				var $menuL3 	= $('.touch-menu-l3', this);

				$opener.on('click', function(e) {
					e.preventDefault();
					$(this).toggleClass(activeClassL2)
					$menuL3.slideToggle(slideTime);
				});
			});
		})();
