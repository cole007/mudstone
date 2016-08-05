import verge from 'verge';
import { ReqAnimation } from '../helpers/utils';

// example usage 
    // const inview = new Inview({
    //     element: document.querySelectorAll('.box'),
    //     threshold: 100,
    //     pre(e) {
    //         e.style.opacity = 0;
    //         e.style[css3('transition')] = `all .750s cubic-bezier(0, 0, 0.3, 1)`;
    //         e.style[css3('transform')] = `translate3d(0, 100px, 0)`;
    //     },
    //     post(e) {
    //         e.style.opacity = 1;
    //         e.style[css3('transform')] = `translate3d(0, 0, 0)`;
    //     },
    //     alreadyInView(e) {
    //         e.style.opacity = 1;
    //         e.style[css3('transform')] = `translate3d(0, 0, 0)`;
    //     }
    // }).initialize().start();


export default class Inview {
    constructor(opts) {
        this.element = opts.element;
        this.threshold = opts.threshold || 0;
        this.pre = opts.pre;
        this.post = opts.post;
        this.alreadyInView = opts.alreadyInView;
        this.collection = Array.prototype.slice.call(this.element);
        this.viewport = this.viewport.bind(this);
        //this.initialize()
        //this.start.call(this);
             //   console.log(this.collection.length);
        this.count = this.collection.length;
    }

    start() {
        this.scroll = new ReqAnimation();
        this.scroll.loop = () => {
            this.viewport.call(this);
            if(this.count === 0) {
                this.scroll.destroy();
                return;
            }
        }
    }

    destroy() {
        this.scroll.destroy();
    }

    viewport() {
        // loop through all of the items
        this.filtered.map((e, i) => {
            // if in view
            if(verge.inViewport(e, this.threshold) && e._inview === false) {
                e._inview = true;
                // call the post function
                this.post.call(this, e, i);
                // remove the item from the array
                this.count -= 1;
            }
        })
    }

    initialize() {
        if(typeof this.alreadyInView === 'function') {
            this.collection.filter((e) => verge.inViewport(e)).map((e, i) => this.alreadyInView.call(this, e, i));
        }
        if(typeof this.pre === 'function') {
            // loop over all of the elements
            this.filtered = this.collection
                // filter out items that are already in the viewport
                .filter((e) => !verge.inViewport(e))
                // map over each item, calling the pre function, passing this as this, and e as the first argument
                .map((e, i) => {
                    e._inview = false; 
                    this.pre.call(this, e, i);
                    return e;
                });

            this.count = this.filtered.length;
        }

        return this
    }
}