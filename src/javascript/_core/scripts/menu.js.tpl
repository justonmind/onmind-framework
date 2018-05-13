		// menu.js
		(function() {
			var $menu 				= $('#menu');
			var $items 				= $('.menu__item:has(.menu-dropdown)', $menu);
			var $links 				= $('.menu__link', $items);
			var slideTime 		= 200;
			var slideTimeout 	= 800;
			var hoveredClass	= 'menu__item_hovered';
			var timer;

			$items.addClass('menu__item_has-dd');
			$links.on('click', function(e) {
				e.preventDefault();
			});

			$items.on('mouseenter', function() {
				clearTimeout(timer);
				$(this)
					.addClass(hoveredClass)
					.siblings()
					.removeClass(hoveredClass)
					.children('.menu-dropdown')
					.slideUp(slideTime);
				$('.menu-dropdown', this).slideDown(slideTime);
			});

			$items.on('mouseleave', function() {
				var me = this;
				timer = setTimeout(function() {
					$(me).removeClass(hoveredClass);
					$('.menu-dropdown', me).slideUp(slideTime);
				}, slideTimeout);
			});

		})();
