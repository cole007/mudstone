import Concert from 'concert'
import Viewport from './viewport'
import { events } from './events'
// import $ from 'jquery'

const viewport = new Viewport()
viewport.watch()
/**
 * Base class, all behaviours should extend from this class
 * @class
 */
export default class Base {
	constructor() {
		// instance events
		Object.assign(this, Concert)
		// global events
		this.events = events
		this.viewport = viewport
	}
}
