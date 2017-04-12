import Concert from 'concert'
import { transitionEnd, lock } from './utils'

/**
 * Creates a new SideNav.

	<a class="menu__btn js-mobile-nav-btn" data-target="#menu" href="#"><span></span></a>
	<nav class="menu site-menu" id="menu">
		<div class="js-menu-wrapper menu__wrapper">
			<ul class="r-ul nav js-menu-container">
				<li class="menu__item t-menu"><a href="#slides">Slides</a></li>
				<li class="menu__item t-menu"><a href="#videos">Videos</a></li>
				<li class="menu__item t-menu"><a href="#accordions">Accordions</a></li>
				<li class="menu__item t-menu"><a href="#map">Map</a></li>
				<li class="menu__item t-menu"><a href="#form">Form</a></li>
				<li class="menu__item t-menu"><a href="#map">Map</a></li>
				<li class="menu__item t-menu"><a href="/grid.html">Grid</a></li>
			</ul>
		</div>
	</nav>

	const sidenav = new SideNav(el.querySelector('.js-mobile-nav-btn'), {
		init: false,
		lock: true
	})


 * @class
 */
export default class SideNav extends Concert {
	/**
	 * Create a sidenav.
	 * @param {el} el - The button node, querySelector('.myelm')
	 * @param {opts} opts - The expander options
	 */
	constructor(button, opts = {}) {
		super()
		this.button = button
		this.body = document.querySelector('body')
		this.html = document.querySelector('html')
		//this.target = opts.target || document.querySelector(this.button.getAttribute('data-target'))
		this.wrapper = opts.wrapper || document.querySelector('.js-menu-wrapper')
		this.container = opts.container || document.querySelector('.js-menu-container')
		this.open = false
		this.init = opts.init || false
		this.state = this.init
		this.lock = opts.lock || false

		this.closer = opts.closer || false

		this.clickOutside = opts.clickOutside || false
		this.events = ['before:open', 'after:open', 'before:close', 'after:close']
		// bind methods
		this.addEvents = this.addEvents.bind(this)
		this.removeEvents = this.removeEvents.bind(this)
		this.clickCloseHande = this.clickCloseHande.bind(this)
		this.clickHandle = this.clickHandle.bind(this)
		this.onTransitionEnd = this.onTransitionEnd.bind(this)
		this.hideSideNav = this.hideSideNav.bind(this)
		this.showSideNav = this.showSideNav.bind(this)
		this.blockClicks = this.blockClicks.bind(this)

		// kick off the things
		this.init && this.initialize()

		if(this.lock) {
			this._lock = lock()
		}
	}

	/**
	 * Attached the click handle
	 * @return {object} this
	 */
	addEvents() {
		this.state = true
		this.button.addEventListener('click', this.clickHandle)

		const wrapper = this.closer ? this.closer : this.wrapper

		this.clickOutside && wrapper.addEventListener('click', this.hideSideNav)


		if(!this.closer && this.clickOutside) {
			this.container.addEventListener('click', this.blockClicks)
		}

		return this
	}

	/**
	 * Remove the click handle
	 * @return {object} this
	 */
	removeEvents() {
		this.button.removeEventListener('click', this.clickHandle)
		this.clickOutside && this.wrapper.removeEventListener('click', this.hideSideNav)
		this.clickOutside && this.container.removeEventListener('click', this.blockClicks)
		return this
	}


	/**
	 * The menu button click handle
	 * @param {e} e - event object
	 */

	clickHandle(e) {
		e.preventDefault()
		this.open ? this.hideSideNav() : this.showSideNav()
	}

	/**
	 * Block clicks from bubbling
	 * @param {e} e - event object
	 */

	blockClicks(e) {
		e.stopPropagation()
	}

	/**
	 * close the menu handle
	 * @param {e} e - event object
	 */

	clickCloseHande(e) {
		e.preventDefault()
	}


	/**
	 * show the side nav
	 * @return {object} this
	 */

	showSideNav() {
		if(this.lock) {
			this._lock.capture()
		}
		this.trigger('before:open', [this.wrapper, this.button])
		this.button.classList.add('is-active')
		this.wrapper.classList.add('is-animating')
		this.wrapper.classList.add('is-visible')
		this.wrapper.addEventListener(transitionEnd, this.onTransitionEnd)
		return this
	}

	/**
	 * hide the side nav
	 * @return {e} e - event object
	 */

	hideSideNav() {
		if(this.lock) {
			this._lock.release()
		}
		this.trigger('before:close', [this.wrapper, this.button])
		this.button.classList.remove('is-active')
		this.wrapper.classList.add('is-animating')
		this.wrapper.classList.remove('is-visible')
		this.wrapper.addEventListener(transitionEnd, this.onTransitionEnd)
		return this
	}


	/**
	 * onTransitionEnd event
	 * @return {Oject} this
	 */

	onTransitionEnd () {
		this.open = !this.open
		this.wrapper.classList.remove('is-animating')
		this.trigger(this.open ? 'after:open' : 'after:close', [this.wrapper, this.button])
		this.wrapper.removeEventListener(transitionEnd, this.onTransitionEnd)
		return this
	}

	/**
	 * destroy remove all eventslisteners and events
	 * @return {Oject} this
	 */

	destroy() {
		this.state = false
		this.button.classList.remove('is-active')
		this.wrapper.classList.remove('is-animating')
		this.wrapper.classList.remove('is-visible')
		this.events.forEach(event => this.off(event))
		this.removeEvents()
		return this
	}

	initialize() {
		this.addEvents()
	}
}
