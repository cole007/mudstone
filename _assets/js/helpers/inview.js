import verge from 'verge';
import throttle from 'lodash.throttle';

export default class Inview {
    constructor(opts) {
        this.element = opts.element;
        this.threshold = opts.threshold || 0;
        this.pre = opts.pre;
        this.post = opts.post;
        this.alreadyInView = opts.alreadyInView;

        this.collection = Array.prototype.slice.call(this.element);
        this.viewport = this.viewport.bind(this);
        this.bindScroll = this.bindScroll.bind(this);
        this.handleScoll = throttle(this.viewport, 100);
        this.initialize();
        this.bindScroll();
    }

    viewport() {
        // loop through all of the items
        this.collection.forEach((e, i) => {
            // if in view
            if(verge.inViewport(e, this.threshold)) {
                // call the post function
                this.post.call(this, e);
                // remove the item from the array
                this.collection.splice(i, 1);
            }
        })
        // once there are no items left, remove the event handler
        if(this.collection.length === 0) {
            window.removeEventListener('scroll', this.handleScoll);
        }
    }

    bindScroll() {
        window.addEventListener('scroll', this.handleScoll);
    }

    initialize() {

        this.collection.filter((e) => verge.inViewport(e)).map((e) => this.alreadyInView.call(this, e))

        // loop over all of the elements
        this.collection
            // filter out items that are already in the viewport
            .filter((e) => !verge.inViewport(e))
            // map over each item, calling the pre function, passing this as this, and e as the first argument
            .map((e) => {
                this.pre.call(this, e);
            });
    }
}