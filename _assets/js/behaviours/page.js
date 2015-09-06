// <div class="test" data-behaviour="example"></div>
// container = $('.test')
// mud.Behaviours.test = function(container){}

mud.Behaviours.menu = function(container){
	var state,
		$menu = $rel('menu-wrapper'),
		$logo = $rel('logo'),
		$body = $('body'),
		activeMenuClass = 'is-active--menu';

	container.on('click', '[rel*="menu-btn"]', function(e) {
		e.preventDefault();
		var $btn = $(this);
		if(!state) {
			$btn.addClass('is-active');
			container.trigger('menu:open');
			state = true;
		} else {
			$btn.removeClass('is-active');
			container.trigger('menu:close');
			state = false;
		}
	});

	container.on('menu:open', function(e) {
		$body.css({overflow: 'hidden'});
		$menu.addClass(activeMenuClass);
		$logo.addClass(activeMenuClass)
	});

	container.on('menu:close', function(e) {
		$body.css({overflow: ''});
		$menu.removeClass(activeMenuClass);
		$logo.removeClass(activeMenuClass)

	});
};