/**
 * Method for accodions
 * @example
 * var expand = new stone.expand();
 *    expand.setElement('.link');
 *    expand.setOptions({tools.js.cx
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
// stone.resp_media = function () {
//     this.el = '.js-image';
//     this.options = {
//         inline: true,
//         breakpoints: {
//             mobile: mud.breakpoints.mobile,
//             tablet: mud.breakpoints.tablet,
//             desktop: mud.breakpoints.desktop
//         },
//         path: '/_assets/images/',
//         css: {
//             display: 'inline'
//         }
//     };
 
 
//     ( arguments.callee._singletonInstance )
//         return arguments.callee._singletonInstance;
//     arguments.callee._singletonInstance = this;
 
// };
 
 
// stone.resp_media.prototype = {
 
//         // argument passed in will be used as the selector
//     // if no argument is supplied the default class will be used
//     setElement : function (e) {
//         // update default el if one is passed in
//         this.el = (e.length > 0)?e:this.el;
//     },
//     // add aditional options
//     // targets et al
//     // gets merged with the default options
//     setOptions : function (o) {
//         var options = this.options;
//             options = $.extend({}, options, o);
//         this.options = options;
//     },
 
//     content: function() {
//         var self = this,
//             viewPort = new stone.viewPort(),
//             img = this.el,
//             breakpoints = self.options.breakpoints,
//             count = Object.keys(breakpoints).length - 1;
 
//             $(img).each(function() {
//                 var $img = $(this),
//                     output = [],
//                     k = 0;
 
//                     for(var key in breakpoints){
//                         if(viewPort.width < breakpoints[key]) {
//                             output.push(key);
//                         }
//                     }
//                     var size = (output.length === 0) ? 'desktop' : output[0];
 
//                 self.swap($img,size);
//             });
 
//     },
 
//     swap: function(e,size) {
//         var self = this,
//             src = e.data(size);
//             src = self.options.path + src;
 
//         if(self.options.inline === true) {
//             e.attr('src', src).css(self.options.css);
//         } else {
//             e.css('background-image', 'url('+ src +')');
//         }
//     },
 
//     init: function(e) {
//         var self = this;
//         self.content();
 
//         $(window).smartresize(function(){
//             self.content();
//         });
//     },
// };
 
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
// stone.resp_content = function () {
//     this.el = '.js-content';
//     this.options = {
//         ajax: false,
//         url: null,
//         breakpoints: {
//             mobile: mud.breakpoints.mobile,
//             tablet: mud.breakpoints.tablet,
//             desktop: mud.breakpoints.desktop
//         },
//         path: '/_assets/pages/',
//         css: {
//             visibility: 'visible'
//         }
//     };
 
 
//     ( arguments.callee._singletonInstance )
//         return arguments.callee._singletonInstance;
//     arguments.callee._singletonInstance = this;
 
// };
 
 
// stone.resp_content.prototype = {
 
//     // argument passed in will be used as the selector
//     // if no argument is supplied the default class will be used
//     // type = string
//     setElement : function (e) {
//         // update default el if one is passed in
//         this.el = (e.length > 0)?e:this.el;
//     },
//     // add aditional options
//     // targets et al
//     // gets merged with the default options
//     // type = object
//     setOptions : function (o) {
//         var options = this.options;
//             options = $.extend({}, options, o);
//         this.options = options;
//     },
 
//     swap: function(e,size) {
//         var self = this,
//             content = e.data(size);
//             if(self.options.ajax === false) {
//                 e.html(content).css(self.options.css);
//             }
//     },
 
//     content: function() {
//         var self = this,
//             viewPort = new stone.viewPort(),
//             el = this.el,
//             breakpoints = self.options.breakpoints;
//             count = Object.keys(breakpoints).length - 1;
 
//             $(el).each(function() {
//                 var $el = $(this),
//                     output = [],
//                     i;
//                     for(var key in breakpoints){
//                         if(viewPort.width < breakpoints[key]) {
//                             output.push(key);
//                             i = 0;
//                         } else {
//                             output.push(key);
//                             i = count;
//                         }
//                     }
 
//                 self.swap($el,output[i]);
//             });
//     },
 
//     init: function(e) {
//         var self = this;
//         self.content();
//         $(window).smartresize(function(){
//             self.content();
//         });
//     },
// };
 
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
        type: 'appendTo',
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
            },
            {
                bp: mud.breakpoints.tablet,
                targetEl: '.el-3',
                type: 'appendTo'
            },
            {
                bp: mud.breakpoints.desktop,
                targetEl: '.el-5',
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
 
 
 
        self.newNum = self.newArray[0];
        if(oldNum !== self.newNum) {
            var setup = self.getCurrentBreak(self.newNum);
            if(self.newNum) {
                var obj = setup;
            } else {
                var obj = self.options.last;
            }
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
 
 
stone.tabs = function() {
    this.el = '',
    this.options  = {
        container: '',
        parent: '',
        activeClass: '',
    };
 
    ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;
};
 
stone.tabs.prototype = {
    current: '',
    next: '',
    setElement : function (e) {
        // update default el if one is passed in
        this.el = (e.length > 0)?e:this.el;
    },
    setOptions : function (o) {
        var options = this.options;
            options = $.extend({}, options, o);
        this.options = options;
    },
 
    setCurrent: function() {
         this.current = $(this.options.parent).find(this.options.activeClass);
         return this.current;
    },
 
    stripString: function(str) {
        return str.slice(1);
    },
 
    getHeight: function() {
        var target = [],
            height = 0;
        $(this.el).each(function(i) {
            if($($(this).attr('href')).outerHeight() > height) {
                height = $($(this).attr('href')).outerHeight();
            }
 
        });
        return height;
    },
 
    setHeight: function() {
        $(this.options.container).css({height: this.getHeight() + 'px'});
    },
 
    onLoad: function() {
        var hash = document.location.hash,
            first = $(this.el).attr('href');
        if(hash) {
            this.close();
            this.next = $('a[href^='+hash+']')
            this.switchTab(hash);
        } else {
            this.next = $('a[href^='+first+']')
            this.switchTab(first);
        }
    },
 
    onScroll: function() {
        var self = this,
            $container = $(self.options.container);
 
        var throttled = _.throttle(function() {
            if(!$container.hasClass('is-active')) {
                if($.inViewport($container)) {
                    $container.addClass('is-active');
                    self.onLoad();
                }
            }
        }, 250);
        $(window).on('scroll', throttled);
 
    },
 
    close: function() {
        var self = this,
            $el = this.current;
        $el.each(function(i) {
            $(this).removeClass(self.stripString(self.options.activeClass));
        });
    },
 
    switchTab: function(hash) {
        var self = this,
            $tab = $(hash);
        $(this.next).addClass('is-active');
        $tab.addClass(self.stripString(self.options.activeClass));
        this.setCurrent();
        window.history.replaceState('', '', hash);
    },
 
    events: function() {
        var self = this,
            el = self.el,
            options = self.options,
            parent = options.parent,
            activeClass = options.activeClass;
 
            $(parent).on('click', el, function(e){
                e.preventDefault();
                if(!$(this).hasClass(activeClass)) {
                    self.close();
                    self.next = $(this);
                    self.switchTab(this.hash);
                }
            });
    },
 
 
    init: function() {
        var self = this;
        this.setCurrent();
        this.events();
        this.setHeight();
        this.onScroll();
        if(!$(self.options.container).hasClass('is-active')) {
            if($.inViewport($(this.el))) {
                $(self.options.container).addClass('is-active');
                self.onLoad();
            }
        }
 
        var updateHeight = _.debounce(function() {
            self.setHeight();
        }, 300);
        $(window).resize(updateHeight);
 
 
    }
};