import Concert from 'concert'
import { transitionEnd, lock } from './utils'

/**
 * Creates a new SideNav.
 * @class
 */
export default class SideNav {
	/**
	 * Create a sidenav.
	 * @param {el} el - The button node, querySelector('.myelm')
	 * @param {opts} opts - The expander options
	 */
	constructor(button, opts = {}) {
		this.button = button
		this.body = document.querySelector('body')
		this.html = document.querySelector('html')
		this.target = opts.target || document.querySelector(this.button.getAttribute('data-target'))
		this.wrapper = opts.wrapper || this.target.querySelector('.js-menu-wrapper')
		this.container = opts.container || this.target.querySelector('.js-menu-container')
		this.open = false
		this.init = opts.init || false
		this.state = this.init
		this.lock = opts.lock || false
		/*
			TODO
			Fix this bug!
			setting clickOutside to false as it is currently causing an issue
			with link events not being triggered
		*/
		this.clickOutside = false
		this.events = ['before:open', 'after:open', 'before:close', 'after:close']
		// bind methods
		this.addEvents = this.addEvents.bind(this)
		this.removeEvents = this.removeEvents.bind(this)
		this.clickCloseHande = this.clickCloseHande.bind(this)
		this.clickHandle = this.clickHandle.bind(this)
		this.onTransitionEnd = this.onTransitionEnd.bind(this)
		this.hideSideNav = this.hideSideNav.bind(this)
		this.showSideNav = this.showSideNav.bind(this)
		this.blockClicks = this.clickOutside && this.blockClicks.bind(this)

		// merge concert events into sideNav
		Object.assign(this, Concert)
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
		this.wrapper.addEventListener('click', this.clickCloseHande)
		this.clickOutside && this.container.addEventListener('click', this.blockClicks)
		return this
	}

	/**
	 * Remove the click handle
	 * @return {object} this
	 */
	removeEvents() {
		this.button.removeEventListener('click', this.clickHandle)
		this.wrapper.removeEventListener('click', this.clickCloseHande)
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
