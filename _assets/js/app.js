// import $ from 'jquery';
// App({
// 	name: 'v'
// });
// Test({
// 	name: 's'
// });

var App = App || {};
App.collection = [];

App.view = function(options, func) {
	var _this = this;
	this.name = options.name;
	this.state = options.state || false;
	this.onLoad = options.onLoad || undefined;
	this.watch = options.watch || undefined;
	this.set = [];
	this.init = () => {
		// push all of the items into an array
		$(options.container).find(options.element).each(function(i) {
			var state = ($(this).hasClass(options.activeClass)) ? true : options.state;
			 _this.set.push({el: $(this), index: i, state: state});
		});
	};
	this.render = () => {
		if(options.behaviour !== undefined) {
			this.init();
			App[options.behaviour].call(this, options);
		}
	};
	this.update = (e) => {
		console.log(App.collection);
		(e.length > 0) ? this.setState(true) : this.setState(false);
		if(this.watch !== undefined) {
			var func = App.collection.find((element) => element.name === this.watch.name);
			if(func.state === this.watch.state) {
				func[this.watch.action].call(func, {});
			}
		}
	};
	this.setState = (state) => {
		this.state = state;
	};

	if(typeof this.onLoad === 'object') {
		var onLoad = options.onLoad;
		var target = App.collection.find((element) => element.name === onLoad.name);
		target[onLoad.func]();

	} else if(typeof this.onLoad === 'function') {
		this.onLoad.call(this, options);
	}
	if(typeof func === 'function') {
		func.call(this, options);
	}
	// add to collection 
	App.collection.push(this);
}

App.expander = function(options) {
	var _this = this,
		container = options.container,
		element = options.element,
		currentEl = null;
		_this.open = () => {
			if(currentEl) {
				currentEl.el.addClass('is-active');
			}
		};
		_this.openAll = () => {
			_this.set.forEach((element) => {
				element.el.addClass('is-active');
				element.state = true;
			});
		};
		_this.close = () => {
			if(currentEl) {
				currentEl.el.removeClass('is-active');
			}
		};
		_this.closeAll = () => {
			_this.set.forEach((element) => {
				element.el.removeClass('is-active');
				element.state = false;
			});
		};
		// add a method to
		$(container).find(element).each(function(i) {
			 _this.set.forEach((element) => {
			 	element.open = _this.open,
			 	element.close = _this.close
			 });
		});
		// the click event
		$(container).off().on('click', element, function(e) {
			var index = $(this).index();
			// get any active elements
			var activeElements = _this.set.filter((element) => element.state === true && element.index !== index);
			// if found and option.single is true
			if(activeElements.length > 0 && options.single === true) {
				// each of the elements
				activeElements.forEach((element, i) => {
					element.el.removeClass('is-active');
					element.state = false;
				})
			}
			currentEl = _this.set[index];
			// if the current state is false
			if(_this.set[index].state === false) {
				//$(this).addClass('is-active');
				_this.set[index].state = true;
				_this.set[index].open();
			} else {
				//$(this).removeClass('is-active');
				_this.set[index].state = false;
				_this.set[index].close();
			}

			// update the state of the containing object, if none are active, set the containing state to false
			_this.update(_this.set.filter((element) => element.state === true));
		});
};

var alpha = new App.view({
	name: 'a',
	state: false,
	container: '.wrapper-a',
	element: '.button',
	behaviour: 'expander',
	activeClass: 'is-active',
	single: true,
	watch: {
		name: 'b',
		state: true,
		action: 'closeAll'
	}
});

var beta = new App.view({
	name: 'b',
	state: false,
	container: '.wrapper-b',
	element: '.button',
	behaviour: 'expander',
	activeClass: 'is-active',
	single: false,
	watch: {
		name: 'a',
		state: true,
		action: 'close'
	}
});

(function() {
	App.collection.forEach(function(element, index) {
		element.render();
	});
})();



