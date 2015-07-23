/**
 * Method for accodions 
 * @example
 * var expand = new stone.expand();   
 *    expand.setElement('.link');
 *    expand.setOptions({
 *        parentEl: '.parent',
 *        targetEl: '.target',
 *        easing: 'easeOutCubic',
 *        collapseTime: 'instant',
 *        closeSiblings: false
 *    });
 *    expand.init();
 */
stone.expand = function () {
    this.el = '.expand-link';
    this.timeoutID = false;
    this.options = {
        parentEl: '.expand-parent',
        targetEl: '.expand-target',
        activeClass: 'is-active',
        duration: 500,
        down: {
            start: function(){},
            complete: function(){}
        },
        up: {
            start: function(){},
            complete: function(){}
        },
        collapseTime: 'instant',
        delay: 0,
        closeSiblings: false
    };
 
 
    ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;
 
};
stone.expand.prototype = {
    // argument passed in will be used as the selector
    // if no argument is supplied the default class will be used
    setElement : function (e) {
        // update default el if one is passed in
        this.el = (e.length > 0)?e:this.el;
    },
    // add aditional options
    // targets et al
    // gets merged with the default options
    setOptions : function (o) {
        var options = this.options;
            options = $.extend({}, options, o);
        this.options = options;
    },
 
    slideUp: function(e) {
        var $parent = e.parents(this.options.parentEl),
            target = $parent.find(this.options.targetEl),
            self = this;
 
        $(target).stop().slideUp({
            duration: self.options.duration,
            easing: self.options.easing,
            start: self.options.up.start,
            complete: self.options.up.complete,
            done: function() {
                 self.clearTime();
            }
        });
    },
 
 
    destroy: function() {
 
        $(this.el).unbind('click');
        $(this.el).off().on('click', function(){
            return true;
        });
 
 
    },
 
    slideDown: function(e) {
        var $parent = e.parents(this.options.parentEl),
            target = $parent.find(this.options.targetEl),
            self = this;

        $(target).stop().slideDown({
            duration: self.options.duration,
            easing: self.options.easing,
            start: self.options.down.start,
            complete: self.options.down.complete,
            done: function() {
                 self.clearTime();
            }
        });
 
    },
     
    init: function() {
        var self = this,
            el = this.el,
            timeoutID = self.timeoutID;
            $(el).each(function() {
                var $btn = $(this),
                    localParent = $btn.parents(self.options.parentEl);
                    $btn.off().on('click', function(e) {
                        e.preventDefault();
                        var fn, delay = self.options.delay;
                        // // if we need to close siblings
                        if(self.options.closeSiblings) {
                            $(localParent).siblings(self.options.parentEl).each(function() {
                                var that = this;
                                if($(this).hasClass(self.options.activeClass)) {
                                    $(that).find(self.el).trigger('click');
                                    if(self.options.collapseTime === 'instant') {
                                        delay = self.options.collapseTime;
                                    } else {
                                        delay = delay + self.options.duration;
                                    }
                                }
                            });
                        }

                        var slideDown = function(){
                            $(localParent).addClass(self.options.activeClass);
                            self.slideDown($btn);
                        }
 
                        var slideUp = function() {
                            $(localParent).removeClass(self.options.activeClass);
                            self.slideUp($btn);
                        }

                        if(!$(self.options.targetEl).is(':animated')) {
 
                            if (!$(localParent).hasClass(self.options.activeClass)) {
                                timeoutID = window.setTimeout(slideDown, delay);
                            } else {
                                timeoutID = window.setTimeout(slideUp, delay);
                            }

                        }
                    });
                });
    },
 
    clearTime: function() {
        var self = this;
        window.clearTimeout(self.timeoutID);
    }
};
 
 
/**
 * Method to return cross browser viewport
 * @method
 * @return {Object} has two properties, width and height
 * @example
 *  var viewPort = new stone.viewPort();
 *  viewPort.height
 *  viewPort.width
 */
stone.viewPort = function() {
    var h = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    var w = window.innerWidth ||  document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
    
    return {width : w , height : h};
};
 
/**
 * Method for swapping images at breakpoints 
 * @example
 * var swap = new stone.resp_media(); 
 *    swap.setElement('.js-image');
 *    swap.init();
 */
stone.resp_media = function () {
    this.el = '.js-image';
    this.options = {
        inline: true,
        breakpoints: {
            mobile: mud.breakpoints.mobile,
            tablet: mud.breakpoints.tablet,
            desktop: mud.breakpoints.desktop
        },
        path: '/_assets/images/',
        css: {
            display: 'inline'
        }
    };
     
 
    ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;
 
};
 
 
stone.resp_media.prototype = {
 
        // argument passed in will be used as the selector
    // if no argument is supplied the default class will be used
    setElement : function (e) {
        // update default el if one is passed in
        this.el = (e.length > 0)?e:this.el;
    },
    // add aditional options
    // targets et al
    // gets merged with the default options
    setOptions : function (o) {
        var options = this.options;
            options = $.extend({}, options, o);
        this.options = options;
    },
 
    content: function() {
        var self = this,
            viewPort = new stone.viewPort(),
            img = this.el,
            breakpoints = self.options.breakpoints,
            count = Object.keys(breakpoints).length - 1;
 
            $(img).each(function() {
                var $img = $(this),
                    output = [],
                    k = 0;

                    for(var key in breakpoints){
                        if(viewPort.width < breakpoints[key]) {
                            output.push(key);
                        }
                    }
                    var size = (output.length === 0) ? 'desktop' : output[0];

                self.swap($img,size);
            });
            
    },
 
    swap: function(e,size) {
        var self = this,
            src = e.data(size);
            src = self.options.path + src;
 
        if(self.options.inline === true) {
            e.attr('src', src).css(self.options.css);
        } else {
            e.css('background-image', 'url('+ src +')');
        }
    },
 
    init: function(e) {
        var self = this;
        self.content();
 
        $(window).smartresize(function(){
            self.content();
        });
    },
};
 
/**
 * Method for swapping images at breakpoints 
 * @example
 * var swap = new stone.resp_content(); 
 *     swap.setElement('.js-content');
 *     swap.setOptions({
 *         breakpoints: {
 *             mobile: mud.breakpoints.mobile,
 *             desktop: mud.breakpoints.desktop
 *         }
 *     })
 *     swap.init();
 */
stone.resp_content = function () {
    this.el = '.js-content';
    this.options = {
        ajax: false,
        url: null,
        breakpoints: {
            mobile: mud.breakpoints.mobile,
            tablet: mud.breakpoints.tablet,
            desktop: mud.breakpoints.desktop
        },
        path: '/_assets/pages/',
        css: {
            visibility: 'visible'
        }
    };
     
 
    ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;
 
};
 
 
stone.resp_content.prototype = {
 
    // argument passed in will be used as the selector
    // if no argument is supplied the default class will be used
    // type = string
    setElement : function (e) {
        // update default el if one is passed in
        this.el = (e.length > 0)?e:this.el;
    },
    // add aditional options
    // targets et al
    // gets merged with the default options
    // type = object
    setOptions : function (o) {
        var options = this.options;
            options = $.extend({}, options, o);
        this.options = options;
    },
 
    swap: function(e,size) {
        var self = this,
            content = e.data(size);
            if(self.options.ajax === false) {
                e.html(content).css(self.options.css);
            }            
    },
 
    content: function() {
        var self = this,
            viewPort = new stone.viewPort(),
            el = this.el,
            breakpoints = self.options.breakpoints;
            count = Object.keys(breakpoints).length - 1;
 
            $(el).each(function() {
                var $el = $(this),
                    output = [],
                    i;
                    for(var key in breakpoints){
                        if(viewPort.width < breakpoints[key]) {
                            output.push(key);
                            i = 0;
                        } else {
                            output.push(key);
                            i = count;
                        }
                    }
                 
                self.swap($el,output[i]);
            });
    },
 
    init: function(e) {
        var self = this;
        self.content();
        $(window).smartresize(function(){
            self.content();
        });
    },
};
 
/**
 * Method for moving elements to different dom locations at given breakpoints
 * var searchView = new stone.resp_position();   
 *     searchView.setElement('.form--search');
 *     searchView.setOptions({
 *         breakpoints: [
 *             {
 *                 bp: mud.breakpoints.tablet,
 *                 targetEl: '.nav--mobile .js-search-open',
 *                 type: 'insertAfter'
 *             }
 *         ],
 *         last: {
 *             targetEl: '.header__top .container',
 *             type: 'appendTo'
 *         }
 *     });
 *     searchView.init();
*/
 
stone.resp_position = function () {
    this.el = '.js-content';
    this.currentBreak = '';
    this.previousBreak = '';
    this.options = {
        parents: '',
        wrapper: false,
        last: {
            target: '',
            before: function(){},
            after: function(){}
        },
        onLoad: true,
        breakpoints: [
            {
                bp: mud.breakpoints.mobile,
                targetEl: '.el-1',
                type: 'appendTo'
            }
        ],
    };
    ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;
 
};
 
 
stone.resp_position.prototype = {
    setElement : function (e) {
        // update default el if one is passed in
        this.el = (e.length > 0)?e:this.el;
    },
    // add aditional options
    // targets et al
    // gets merged with the default options
    setOptions : function (o) {
        var options = this.options;
            options = $.extend({}, options, o);
        this.options = options;
    },
 
    newArray: [],
    newNum: 0,
 
    move : function(obj) {
        var self = this;
        if(obj.before) {
            obj.before();
        }
        if(typeof this.el == 'object') {
            for(var i = 0; i < this.el.length; i++) {
               $(this.el[i])[obj.type](obj.targetEl);
            }
        } else {
            $(this.el)[obj.type](obj.targetEl);
        }
        if(obj.after){
            obj.after();
        }
    },
  
    getCurrentBreak: function(val) {
        // method to return the current breakpoint object
        // takes the current breakpoint width as arg 
        var bpArray = this.options.breakpoints,
            obj;
        for(var i = 0; i < bpArray.length; i++) {
            if(val === bpArray[i].bp) {
                obj = bpArray[i];
            }
        }
       // this.currentBreak = obj;
        return obj;
    },
 
    sortBreaks: function() {
        // method to sort the breakpoints in numeric order
        // returns an array
        var breakpoints = this.options.breakpoints,
            bpArray = [];
            for(var i = 0; i < breakpoints.length; i++) {
                bpArray.push(breakpoints[i].bp);
            };
            // used to sort numbers numerically 
            var compareNumbers = function(a, b){
                return a - b;
            };
            bpArray.sort(compareNumbers);
 
            return bpArray;
    },
 
    load: function(w) {
        // do the meat
        // loop through the breakpoints
        // set the first returned value as the current breakpoint
        // call the move function with the resulting breakpoint object
        // move function only gets executed when the current breakpoint changes (var oldNum)
        var self = this, 
            breaks = self.sortBreaks();
            self.newArray = [];

        var oldNum = self.newNum;
        for(var i = 0; i < breaks.length; i++) {
            if(w < breaks[i]) {
                if(!self.newArray.length) {
                    self.newArray.push(breaks[i]);
                }
            }
        }
       // debug.log(this.options.breakpoints);
        self.newNum = self.newArray[0];
        if(oldNum !== self.newNum) {
            var setup = self.getCurrentBreak(self.newNum);
            if(self.newNum) {
                var obj = setup;
            } else {
                var obj = self.options.last;
            }
            //debug.log(obj);
            self.move(obj);
        }    
    },
 
    resize: function() {
        // resize function
        // calls the load function with the current size
        var self = this;
        $(window).smartresize(function(){
            var viewPort = new stone.viewPort();
            self.newArray = [];
            self.load(viewPort.width);
        });
    },
 
    init : function() {
        var self = this,
            viewPort = new stone.viewPort();
            if(this.options.onLoad) {
                if(typeof this.options.onLoad === 'function') {
                    this.options.onLoad();
                }
                self.load(viewPort.width)
            }
            self.resize();
    }
};


/**
 * Method for managing slides, based on default values
 * @example
 * var slide = new stone.slide();
 *     slide.setElement('.slide--homepage #cycle-main');
 *     slide.setOptions({
 *         swipeFX: 'scrollHorz',
 *         pager: '.slide-pager'
 *     });
 *     slide.init();
 * var slideInstance = slide.thisSlide();
*/

stone.slide = function() {
    this.el = '',
    this.options =  {
        fx: 'fade',
        slides: '> div',
        timeout: 5000,
        next: '.slide__next',
        prev: '.slide__prev',
        log: false,
        swipe: true
    };

    ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;
}

stone.slide.prototype = {
    // argument passed in will be used as the selector
    // if no argument is supplied the default class will be used
    setElement : function (e) {
        // update default el if one is passed in
        this.el = (e.length > 0)?e:this.el;
    },
    // add aditional options
    // targets et al
    // gets merged with the default options
    setOptions : function (o) {
        var options = this.options;
            options = $.extend({}, options, o);
        this.options = options;
    },
    // init must be called before, otherwise there is no cycle context
    thisSlide : function() {
        return $(this.el);
    },

    init: function() {
        $(this.el).cycle(this.options);
    }
}

/**
 * Method for managing popup groups
 * @example
* var popup = new stone.popup();
*     popup.setElement('.js-popup-show');
*     popup.setOptions({
*         callback: {
*             open: function() {
*             },
*             close: function() {
*             }
*         }
*     })
*     popup.init();
*/
stone.popup = function() {

    this.el = '',
    this.options = {
        activeClass: 'active',
        callback: {
            close: function() {},
            open: function() {}
        }
    };

    ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;
}

stone.popup.prototype = {
    // argument passed in will be used as the selector
    // if no argument is supplied the default class will be used
    setElement : function (e) {
        // update default el if one is passed in
        this.el = (e.length > 0)?e:this.el;
    },
    // add aditional options
    // targets et al
    // gets merged with the default options
    setOptions : function (o) {
        var options = this.options;
            options = $.extend({}, options, o);
        this.options = options;
    },

    open : function(e) {
        var self = this,
            target = e.data('popup-target'),
            target = '[data-popup="' + target + '"]';
            e.addClass(self.options.activeClass);
            $(target).addClass(self.options.activeClass);

            if(self.options.callback.open) {
                self.options.callback.open();
            }
    },
    // close the popup
    close : function(e) {
        var self = this,
            target = e.data('popup-target'),
            target = '[data-popup="' + target + '"]';
            e.removeClass(self.options.activeClass);
            $(target).removeClass(self.options.activeClass);

            if(self.options.callback.open) {
                self.options.callback.close();
            }
    },
    // method to close siblings
    closeSiblings : function(e) {
        var self = this;
        e.each(function() {
            self.close(e);
        });
    },

    init : function() {
        var self = this;
        // loop through all the links
        $(this.el).each(function() {
            var $self = $(this);
            // on click
            $self.off().on('click', function(e) {
                e.preventDefault();
                // get the target
                var target = $self.data('popup-target'),
                    target = '[data-popup="' + target + '"]';
                if(!$self.hasClass('active')) {
                    // if there are any active siblings, close them
                    $(self.el + '.' + self.options.activeClass).each(function() {
                        self.closeSiblings($(this));
                    });
                    self.open($self);
                } else {
                    self.close($self);
                }
            });
        })
    }
}


/**
 * Method for add overlays 
 * @example
 * var overlay = new stone.overlay();   
 *    overlay.setStyle({backgroundColor: 'rgba(0,0,0,0.5'});
 *    overlay.setOptions({
 *        target: '.target',
 *        trigger: '.btn',
 *    });
 *    overlay.init();
 *    // to remove
 *    overlay.remove();
 */

stone.overlay = function() {
    this.style = {
        position: 'fixed', 
        top: '0', 
        left: '0',
        width: '100%', 
        height: '100vh', 
        zIndex: '1000', 
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'none'
    },
    this.options = {
        target: '',
        className: '--overlay--',
        target: '',
        trigger: '',
        event: 'click',
        duration: 150,
        delay: 1000,
        type: 'prepend'
    };

    ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;
}


stone.overlay.prototype = {
    timeout: 0,
    state: false,
    markup : function() {
        return  '<div class="' + this.options.className + '"></div>';
    },
    selector : function() {
        return  '.' + this.options.className
    },
    // add aditional options
    // targets et al
    // gets merged with the default options
    setStyle : function (o) {
        var style = this.style;
            style = $.extend({}, style, o);
        this.style = style;
    },
    setOptions : function (o) {
        var options = this.options;
            options = $.extend({}, options, o);
        this.options = options;
    },

    add: function() {
        var self = this,
            options = self.options,
            style = self.style;
            self.state = true;
            $(options.target)[options.type](self.markup()).find(self.selector()).css(style).fadeIn({
                duration: options.duration,
                complete: function() {
                    window.clearTimeout(self.timeOut);
                }
            }); 

    },

    remove: function() {
        var self = this,
            selector = self.selector();
            self.state = false;
            $(selector).fadeOut({
                duration: self.options.duration,
                complete: function() {
                    $(selector).remove();
                    window.clearTimeout(self.timeout);
                }
            });
    },

    on: function() {
        var self = this;
            self.timeout = window.setTimeout(self.add.bind(self), self.options.delay);
    },

    off: function() {
        var self = this;
            self.timeout = window.setTimeout(self.remove.bind(self), self.options.delay);
    },

    init: function() {
        var self = this,
            options = self.options,
            selector = self.selector();
            if(!self.state) {
                self.add();
            }
 
            $(document).off().on('click', selector, function() {
                if(options.trigger) {
                    $(options.trigger).trigger(options.event);
                }
                self.off();
            });
    }
}