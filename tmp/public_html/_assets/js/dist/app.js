(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// import $ from 'jquery';

var App = App || {};
App.collection = [];
App.Tools = {
	transitionEnd: (function () {
		var el = document.createElement('div');
		var transEndEventNames = {
			WebkitTransition: 'webkitTransitionEnd',
			MozTransition: 'transitionend',
			OTransition: 'oTransitionEnd otransitionend',
			transition: 'transitionend'
		};
		for (var name in transEndEventNames) {
			if (el.style[name] !== undefined) {
				return transEndEventNames[name];
			}
		}
		return false;
	})(),

	transform: (function () {
		var el = document.createElement('div');
		var prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');

		for (var i = 0; i < prefixes.length; i++) {
			if (el && el.style[prefixes[i]] !== undefined) {
				return prefixes[i];
			}
		}
		return false;
	})()

};

App.Collection = [];

App.Model = function (o) {
	this.name = o.name;
	this.state = o.state;
	App.Collection.push(o);
};

App.Model.prototype.extend = function (object) {
	var name = this.name;
	var target = App.Collection.find(function (element, index, array) {
		return element.name = name;
	});
	Object.keys(object).forEach(function (element) {
		target[element] = object[element];
	});

	console.log(target);
	object.init.call(target, arguments);
};

var Dave = new App.Model({ name: 'Dave', state: false });
var John = new App.Model({ name: 'John', state: true });

Dave.extend({
	init: function init() {
		console.log(this.name);
	},
	render: function render() {
		console.log('Dave render');
	}
});

John.extend({
	init: function init() {
		console.log(this.name);
		this.render();
	},
	render: function render() {}

});

// App.view = function(options, func) {
// 	var _this = this;
// 	this.name = options.name;
// 	this.state = options.state || false;
// 	this.onLoad = options.onLoad || undefined;
// 	this.watch = options.watch || undefined;
// 	this.set = [];
// 	this.init = () => {
// 		// push all of the items into an array
// 		$(options.container).find(options.element).each(function(i) {
// 			var state = ($(this).hasClass(options.activeClass)) ? true : options.state;
// 			if(state === true) {
// 			 _this.set.push({el: $(this), index: i, state: state});
// 			}
// 		});
// 	};
// 	this.render = () => {
// 		if(options.behaviour !== undefined) {
// 			this.init();
// 			App[options.behaviour].call(this, options);
// 		}
// 	};
// 	this.update = (e) => {
// 		(e.length > 0) ? this.setState(true) : this.setState(false);
// 		if(this.watch !== undefined) {
// 			var func = App.collection.find((element) => element.name === this.watch.name);
// 			if(func.state === this.watch.state) {
// 				func[this.watch.action].call(func, {});
// 			}
// 		}
// 	};
// 	this.setState = (state) => {
// 		this.state = state;
// 	};
// 	this.event = (index, state) => {
// 	};
// 	if(typeof this.onLoad === 'object') {
// 		var onLoad = options.onLoad;
// 		var target = App.collection.find((element) => element.name === onLoad.name);
// 		target[onLoad.func]();
// 	} else if(typeof this.onLoad === 'function') {
// 		this.onLoad.call(this, options);
// 	}
// 	if(typeof func === 'function') {
// 		func.call(this, options);
// 	}
// 	// add to collection
// 	App.collection.push(this);
// };

// // App.expander = function(options) {
// // 	var _this = this,
// // 		container = options.container,
// // 		element = options.element,
// // 		currentEl = null,
// // 		transitionEnd = App.tools.transitionEnd,
// // 		timer;
// // 		var open = (element) => {
// // 			var $target = $(element.target);
// // 			$target.css({
// // 				display: 'block',
// // 				height: 0,
// // 				overflow: 'hidden'
// // 			});
// // 			var fn = function() {
// // 				$target.css({
// // 					height: element.height
// // 				});
// // 			};
// // 			timer = window.setTimeout(fn, 10);
// // 			$target.on(transitionEnd, function(e) {
// // 				e.preventDefault();
// // 				if(element.state === true) {
// // 					$target.css({
// // 						overflow: '',
// // 						height: 'auto'
// // 					});
// // 				}
// // 				window.clearTimeout(timer);
// // 			});
// // 		};

// // 		var close = (element) => {
// // 			var $target = $(element.target);
// // 			$target.css({height: element.height});
// // 			var fn = function() {
// // 				$target.css({
// // 					height: 0,
// // 					overflow: 'hidden'
// // 				});
// // 			};
// // 			timer = window.setTimeout(fn, 10);
// // 			$target.on(transitionEnd, function(e) {
// // 				e.preventDefault();
// // 				console.log('closed');
// // 				if(element.state === false) {
// // 					$target.css({
// // 						display: 'none'
// // 					});
// // 				}
// // 				window.clearTimeout(timer);
// // 			});
// // 		};

// // 		var calc = (element) => {
// // 			var $target = $(element.target);
// // 			$target.css({display: 'block'});

// // 			var height = $target.outerHeight();
// // 			$target.css({display: 'none'});

// // 			return height;
// // 		};
// // 		var resize = (element) => {
// // 			return calc(element);
// // 		}
// // 		_this.open = () => {
// // 			if(currentEl) {
// // 				open(currentEl);
// // 				//currentEl.el.addClass('is-active');
// // 			}
// // 		};
// // 		_this.openAll = () => {
// // 			_this.set.forEach((element) => {
// // 				open(element);
// // 				//element.el.addClass('is-active');
// // 				element.state = true;
// // 			});
// // 		};
// // 		_this.close = () => {
// // 			if(currentEl) {
// // 				close(currentEl);
// // 				//currentEl.el.removeClass('is-active');
// // 			}
// // 		};
// // 		_this.closeAll = () => {
// // 			_this.set.forEach((element) => {
// // 				close(element);
// // 				//element.el.removeClass('is-active');
// // 				element.state = false;
// // 			});
// // 		};
// // 		// add a method to
// // 		$(container).find(element).each(function(i) {
// // 			 _this.set.forEach((element) => {
// // 			 	element.open = _this.open,
// // 			 	element.close = _this.close,
// // 			 	element.target = element.el.data('target'),
// // 			 	element.height = calc(element)
// // 			 });
// // 		});
// // 		// the click event
// // 		$(container).off().on('click', element, function(e) {
// // 			e.preventDefault();
// // 			var index = (options.wrapper !== undefined) ? $(this).parents(options.wrapper).index() : $(this).index();
// // 			var state = _this.set[index].state;
// // 			var activeElements = _this.set.filter((element) => element.state === true && element.index !== index);
// // 			currentEl = _this.set[index];
// // 			// get any active elements
// // 			// if found and option.single is true
// // 			if(activeElements.length > 0 && options.single === true) {
// // 				// each of the elements
// // 				activeElements.forEach((element, i) => {
// // 					//element.el.removeClass('is-active');
// // 					element.state = false;
// // 					close(element);
// // 				})
// // 			}
// // 			// if the current state is false
// // 			if(state === false) {
// // 				//$(this).addClass('is-active');
// // 				_this.set[index].state = true;
// // 				_this.set[index].open();
// // 			} else {
// // 				//$(this).removeClass('is-active');
// // 				_this.set[index].state = false;
// // 				_this.set[index].close();
// // 			}
// // 			// update the state of the containing object, if none are active, set the containing state to false
// // 			_this.update(_this.set.filter((element) => element.state === true));
// // 		});
// // };

// var alpha = new App.view({
// 	name: 'a',
// 	state: false,
// 	container: '.wrapper-a', // events are bound here
// 	element: '.button', // events delegated from here
// 	wrapper: '.accordion', // options wrapper class, can be used for styling, indexes etc
// 	behaviour: 'expander',
// 	activeClass: 'is-active',
// 	single: true,
// 	// watch: {
// 	// 	name: 'b',
// 	// 	state: true,
// 	// 	action: 'closeAll'
// 	// }
// });

// // var beta = new App.view({
// // 	name: 'b',
// // 	state: false,
// // 	container: '.wrapper-b', // events are bound here
// // 	element: '.button', // events delegated from here
// // 	wrapper: '.accordion', // options wrapper class, can be used for styling, indexes etc
// // 	behaviour: 'expander',
// // 	activeClass: 'is-active',
// // 	single: false,
// // 	watch: {
// // 		name: 'a',
// // 		state: false,
// // 		action: 'openAll'
// // 	}
// // });

// // example
// // App.offCanvas = function() {
// // inherit options from App.view();
// // 	stuff
// //
// //}
// // var menu = new App.view({
// // 	name: 'mobile:menu',
// // 	state: false,
// // 	container: '.header', // events are bound here
// // 	element: '.menuBtn', // events delegated from here
// // 	behaviour: 'offCanvas',
// // 	activeClass: 'is-active',
// // 	watch: {
// // 		name: 'a',
// // 		state: false,
// // 		action: 'openAll'
// // 	}
// // });

// console.log(App.collection);

// // (function() {
// // 	App.collection.forEach(function(element, index) {
// // 		element.render();
// // 	});
// // })();

},{}]},{},[1]);

//# sourceMappingURL=app.js.map
