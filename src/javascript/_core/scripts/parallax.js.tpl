		// parallax.js
		(function() {
			if ($(window).width() <= 1200) return;
			if (navigator.userAgent.match(/ipad|ipod|iphone/i)) return;

			var $parallax = $('.parallax');
			var speed = 3;

			$parallax.each(function() {
				var me = this;
				$(window).on('scroll', function() {
					if ($(window).scrollTop() > $(me).offset().top - $(window).height()) {
						var y = ($(window).scrollTop() - $(me).offset().top) / speed;
						var offset = '50% ' + -y + 'px';
						$(me).css('backgroundPosition', offset);
					}
				});
			});
		})();
