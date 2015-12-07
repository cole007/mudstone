(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// import $ from 'jquery';
// App({
// 	name: 'v'
// });
// Test({
// 	name: 's'
// });

var App = App || {};
App.collection = [];

App.view = function (options, func) {
	var _this2 = this;

	var _this = this;
	this.name = options.name;
	this.state = options.state || false;
	this.onLoad = options.onLoad || undefined;
	this.watch = options.watch || undefined;
	this.set = [];
	this.init = function () {
		// push all of the items into an array
		$(options.container).find(options.element).each(function (i) {
			var state = $(this).hasClass(options.activeClass) ? true : options.state;
			_this.set.push({ el: $(this), index: i, state: state });
		});
	};
	this.render = function () {
		if (options.behaviour !== undefined) {
			_this2.init();
			App[options.behaviour].call(_this2, options);
		}
	};
	this.update = function (e) {
		console.log(App.collection);
		e.length > 0 ? _this2.setState(true) : _this2.setState(false);
		if (_this2.watch !== undefined) {
			var func = App.collection.find(function (element) {
				return element.name === _this2.watch.name;
			});
			if (func.state === _this2.watch.state) {
				func[_this2.watch.action].call(func, {});
			}
		}
	};
	this.setState = function (state) {
		_this2.state = state;
	};

	if (_typeof(this.onLoad) === 'object') {
		var onLoad = options.onLoad;
		var target = App.collection.find(function (element) {
			return element.name === onLoad.name;
		});
		target[onLoad.func]();
	} else if (typeof this.onLoad === 'function') {
		this.onLoad.call(this, options);
	}
	if (typeof func === 'function') {
		func.call(this, options);
	}
	// add to collection
	App.collection.push(this);
};

App.expander = function (options) {
	var _this = this,
	    container = options.container,
	    element = options.element,
	    currentEl = null;
	_this.open = function () {
		if (currentEl) {
			currentEl.el.addClass('is-active');
		}
	};
	_this.openAll = function () {
		_this.set.forEach(function (element) {
			element.el.addClass('is-active');
			element.state = true;
		});
	};
	_this.close = function () {
		if (currentEl) {
			currentEl.el.removeClass('is-active');
		}
	};
	_this.closeAll = function () {
		_this.set.forEach(function (element) {
			element.el.removeClass('is-active');
			element.state = false;
		});
	};
	// add a method to
	$(container).find(element).each(function (i) {
		_this.set.forEach(function (element) {
			element.open = _this.open, element.close = _this.close;
		});
	});
	// the click event
	$(container).off().on('click', element, function (e) {
		var index = $(this).index();
		// get any active elements
		var activeElements = _this.set.filter(function (element) {
			return element.state === true && element.index !== index;
		});
		// if found and option.single is true
		if (activeElements.length > 0 && options.single === true) {
			// each of the elements
			activeElements.forEach(function (element, i) {
				element.el.removeClass('is-active');
				element.state = false;
			});
		}
		currentEl = _this.set[index];
		// if the current state is false
		if (_this.set[index].state === false) {
			//$(this).addClass('is-active');
			_this.set[index].state = true;
			_this.set[index].open();
		} else {
			//$(this).removeClass('is-active');
			_this.set[index].state = false;
			_this.set[index].close();
		}

		// update the state of the containing object, if none are active, set the containing state to false
		_this.update(_this.set.filter(function (element) {
			return element.state === true;
		}));
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

(function () {
	App.collection.forEach(function (element, index) {
		element.render();
	});
})();

},{}]},{},[1]);

//# sourceMappingURL=app.js.map
