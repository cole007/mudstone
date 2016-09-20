// import $ from 'jquery';
import debounce from 'lodash.debounce'; 

export default class Viewport {
	constructor(opts = {}) {
		this.debounce = opts.debounce || 100;
		this.events = {}
		this.window = window;
		this.initialQuery = this.query();
		this.current = this.initialQuery;
		this.dimensions = this.getDimensions();
		this.width = this.dimensions.width;
		this.height = this.dimensions.height;

		this.on = this.on.bind(this);
		this.off = this.off.bind(this);
		this.resize = this.resize.bind(this);
		this.change = this.change.bind(this);
	}

	query() {
		return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
	}

	getDimensions() {
		return {
			width: window.innerWidth ||  document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth,
			height: window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight
		}
	}

	on(e, fn) {
		this.events[e] = fn;
		if(typeof this[e] === 'function') {
			this.window.addEventListener('resize', debounce(this[e].bind(this, this.events[e]), this.debounce), false);
		} else {
			console.warn('no valid function supplied');
		}
	}

	off(e, fn) {
		this.events[e] = fn;
		this.window.removeEventListener('resize', this[e], false)
	}

	resize(fn) {
		fn.call(this);
	}

	change(fn) {
		this.breakpoint = this.query();

		if(this.current !== this.breakpoint) {
			const prev = this.current;
			const current = this.breakpoint;
			this.current = this.breakpoint;
			fn.call(this, prev, current);
		}
	}
}