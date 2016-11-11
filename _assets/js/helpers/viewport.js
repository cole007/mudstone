import raf from 'raf';
import Concert from 'concert';

export default class Viewport {
    constructor(opts = {}) {
        this.window = window;
        this.current = this.initialQuery;
        const { width, height } = this.getDimensions();
        this.width = width;
        this.height = height;
        this.currentWidth = width;
        // the raf handler
        this.handle = undefined;
        // bind this into methods
        this.watch = this.watch.bind(this);
        this.checkForBreakpointChange = this.checkForBreakpointChange.bind(this);
        this.destroy = this.destroy.bind(this);
        // merge Concert methods with this
        Object.assign(this, Concert);


    }

    /*
        @method query()
        return String
        body:before{ content }
    */

    query() {
        return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
    }

    /*
        @method getDimensions()
        return Object
        { width, height }
    */

    getDimensions() {
        return {
            width: window.innerWidth ||  document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight
        }
    }

    /*
        @method watch()
        starts requestAnimationFrame
        triggers 'resize' and 'change' events
        return null
    */

    watch() {
        const { width } = this.getDimensions();
        // is there are no more events, cancel requestAnimationFrame
        if(this._events && Object.keys(this._events).length === 0) {
            this.destroy();
            return;
        }
        // hmmm, debounce? 
        if (this.currentWidth === width) {
            this.handle = raf( this.watch );
            return false;
        } else { 
            this.currentWidth = width;
            // trigger is inherited from concert
	        	this.trigger('resize', this);
          	this.checkForBreakpointChange();
		       	this.handle = raf( this.watch );
        }
    }
    /*
        @method checkForBreakpointChange()
        Check for breakpoint changes
        return null
    */
    checkForBreakpointChange(fn) {
        this.breakpoint = this.query();
        if(this.current !== this.breakpoint) {
            const prev = this.current;
            const current = this.breakpoint;
            this.current = this.breakpoint;
            // trigger is inherited from concert
            this.trigger('change', this, current, prev);
        }
    }

    /*
        @method destroy()
        Cancel requestAnimationFrame
    */
    destroy() {
        raf.cancel( this.handle );
    }
}