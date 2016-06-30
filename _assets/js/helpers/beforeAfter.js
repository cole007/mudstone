export default class BeforeAfter {
    constructor(opts) {
        this.element = opts.element;
        this.pre = opts.pre;
        this.post = opts.post;
        this.collection = Array.prototype.slice.call(this.element);
        this.state = false;
        this.delay = opts.delay || 700;
        this.getState = this.getState.bind(this);
        this.setState = this.setState.bind(this);
    }

    before() {
        this.collection
            .map((e, i) => {
                this.pre.call(this, e, i);
            });
    }

    after(){
        setTimeout(() => {
            this.collection
                .map((e, i) => {
                    this.post.call(this, e, i);
                });
            }, this.delay)
    }

    setState(newState) {
        return this.state = newState
    }

    getState() {
        return this.state;
    }
}
