		// fix-input-on-ios.js
		(function() {
			if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
				$('.form__input').css('padding-top', '10px');
			}
		})();
