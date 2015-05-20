/**
 * Sets the type of metadata to use. Metadata is encoded in JSON, and each property
 * in the JSON will become a property of the element itself.
 *
 * There are three supported types of metadata storage:
 *
 *   attr:  Inside an attribute. The name parameter indicates *which* attribute.
 *
 *   class: Inside the class attribute, wrapped in curly braces: { }
 *
 *   elem:  Inside a child element (e.g. a script tag). The
 *          name parameter indicates *which* element.
 *
 * The metadata for an element is loaded the first time the element is accessed via jQuery.
 *
 * As a result, you can define the metadata type, use $(expr) to load the metadata into the elements
 * matched by expr, then redefine the metadata type and run another $(expr) for other elements.
 *
 * @name $.metadata.setType
 *
 * @example <p id="one" class="some_class {item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("class")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from the class attribute
 *
 * @example <p id="one" class="some_class" data="{item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("attr", "data")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a "data" attribute
 *
 * @example <p id="one" class="some_class"><script>{item_id: 1, item_label: 'Label'}</script>This is a p</p>
 * @before $.metadata.setType("elem", "script")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a nested script element
 *
 * @param String type The encoding type
 * @param String name The name of the attribute to be used to get metadata (optional)
 * @cat Plugins/Metadata
 * @descr Sets the type of encoding to be used when loading metadata for the first time
 * @type undefined
 * @see metadata()
 */

(function($) {

    $.extend({
        metadata : {
            defaults : {
                type: 'class',
                name: 'metadata',
                cre: /({.*})/,
                single: 'metadata'
            },
            setType: function( type, name ){
                this.defaults.type = type;
                this.defaults.name = name;
            },
            get: function( elem, opts ){
                var settings = $.extend({},this.defaults,opts);
                // check for empty string in single property
                if ( !settings.single.length ) settings.single = 'metadata';

                var data = $.data(elem, settings.single);
                // returned cached data if it already exists
                if ( data ) return data;

                data = "{}";

                if ( settings.type == "class" ) {
                    var m = settings.cre.exec( elem.className );
                    if ( m )
                        data = m[1];
                } else if ( settings.type == "elem" ) {
                    if( !elem.getElementsByTagName )
                        return undefined;
                    var e = elem.getElementsByTagName(settings.name);
                    if ( e.length )
                        data = $.trim(e[0].innerHTML);
                } else if ( elem.getAttribute != undefined ) {
                    var attr = elem.getAttribute( settings.name );
                    if ( attr )
                        data = attr;
                }

                if ( data.indexOf( '{' ) <0 )
                data = "{" + data + "}";

                data = eval("(" + data + ")");

                $.data( elem, settings.single, data );
                return data;
            }
        }
    });

    /**
     * Returns the metadata object for the first member of the jQuery object.
     *
     * @name metadata
     * @descr Returns element's metadata object
     * @param Object opts An object contianing settings to override the defaults
     * @type jQuery
     * @cat Plugins/Metadata
     */
    $.fn.metadata = function( opts ){
        return $.metadata.get( this[0], opts );
    };

})(jQuery);

// JW/MEDIA player jp.plugin
// loadVideo
(function($){

    $.loadVideo = function(el, options){

        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el); // jQuery
        base.el = el;     // Dom

        // Add a reverse reference to the DOM object
        base.$el.data("loadVideo", base);

        base.init = function(){
            //pass in options
            base.options = $.extend({},$.loadVideo.defaultOptions, options);

            // tidy up skin path it is doesn't end with a /
            if(base.options.skinPath.lastIndexOf("/")!=base.options.skinPath.length-1){
                base.options.skinPath += '/';
            }

            // look in the metadata for a width and height
            data = base.$el.metadata();

            if(typeof(data.target_id) == 'undefined' || data.target_id == null){
                alert('Please provide a unique "target_id" e.g class="show-vid data{target_id:\'media3\'}"');
            }else{
                // bind the media to the base element
                // adds a new div to the child of the parent which contains a wrapper
                // which is then rendered JWplayer by Media plugin
                // make sure to pass in the results of the initialisation, in this case imgStatus
                // pass to both bind and its associated function call
                base.$el.bind('toggleContent', function(e, imgStatus){ base.loadMedia(imgStatus); });

                switch(base.options.event){
                    case "onClick":
                        // do nothing on click event to base jQuery object
                        base.$el.click(function(){ base.initResource(); return false;});
                    break;
                    case "onLoad":
                        // normally a.view-vid
                        //then make a call to initialise the resoures being used e.g. vid background image
                        base.initResource();
                    break;
                }
            }
        };

        // Method call initDropdown
        base.initResource = function(){
            //check that bg img exists
            //base.resourceCheck();
            base.initDropdown('success');
            return false;
        }

        // Method call initDropdown
        base.initDropdown = function(imgStatus){

            // fadeout target
            $target = base.$el;

            // fire open callback if one exits
            if(base.options.openCallback){
                base.options.openCallback($target);
            }

            // if base.options.hideTarget == true
            // hide target, then do video load
            if(base.options.hideTarget){
                $target.fadeOut('fast', function(){

                    //fire event handler toggleContent object
                    base.$el.trigger('toggleContent', [imgStatus]);

                });
            }else{
                // don't hide target
                //fire event handler toggleContent object
                base.$el.trigger('toggleContent', [imgStatus]);
            }


            return false;
        }

        // Method call resourceCheck
        base.resourceCheck = function(){

            //get img path
            imgSnapshotPath = base.$el.attr('title');

            //check if snapshot img exists
            if(imgSnapshotPath){

                if(imgSnapshotPath!=null){

                        //preload inage into page
                        //use ajax call to PHP script which checks for existance of file on server
                        $.ajax({
                            type: "GET",
                            url: '/check_resource.php',
                            data: 'p_resource='+imgSnapshotPath,
                            success: function(responseXML, textStatus, XMLHttpRequest){
                                var message = $('status', responseXML).text(); //assign XML message node to variable
                                base.initDropdown(message);
                            },
                            error: function(XMLHttpRequest, textStatus){
                                base.initDropdown(textStatus);
                            }
                        });
                }
            }

        }

        base.isExternalVideo = function(url){

            var isInArray = function (input_array, value)
            // Returns true if the passed value is found in the
            // array. Returns false if it is not.
            {
                var i;
                for (i=0; i < input_array.length; i++) {
                    // Matches identical (===), not just similar (==).
                    if (input_array[i] === value) {
                        return true;
                    }
                }
                return false;
            };

            //check all hrefs, if external return true

            if(url !== undefined){
                pattern = /(http(s)?|ftp(s)?)(.*)/gi;           //basic regex patterm case insensitive and multiple matches
                results = url.match(pattern);

                // for each
                for ( var i in results )
                {

                    // extract domain name from url
                    var domain = url.toString().split("//")[1].split("/")[0];
                        domain = domain.substring(domain.indexOf("."),domain.length);
                    var localDomainArray = base.options.localDomains;
                    // only allow non-current domain urls to pass.
                    if(!isInArray(localDomainArray,domain)){
                        return true;
                    }
                }
            }

            return false;

        }

        base.loadCloser = function($target){

            if(base.options.closer == true){
                //add on closer div
                $target.siblings('.video').append('<div class="closer"><span>'+base.options.closer_text+'</span></div>');

                if(isIphone == true){
                    $target.siblings('.video').children('div.closer').css({'display':'none'});
                }

                //apply media closing action
                $target.siblings('.video').children('div.closer').bind('click',function(e){

                    e.preventDefault();

                    // stop jwplayer vid
                    if(typeof jwplayer != 'undefined' && jwplayer(base.options.targetId)){
                        jwplayer(base.options.targetId).stop();
                    }

                    var unload = function(){

                        $target.siblings('.closer').remove();
                        // if base.options.hideTarget show target
                        if(base.options.hideTarget){
                            $target.fadeIn();
                        }

                        var $iframe = $target.siblings('.video').children('iframe#video-frame');
                        if($iframe.length > 0){
                            $iframe.attr('src', '');
                            $iframe.remove();
                        }
                        // fire closer callback if one exits
                        if(base.options.closerCallback){
                            base.options.closerCallback($target);
                        }
                    }

                    // remove the live video as well
                    $target.siblings('.video').fadeOut('slow', function(){

                        unload();

                        $(this).remove();

                    });

                    return false;

                });
            }


        }

        // Method call loadMedia
        // accepts argument passed in by base.resourceCheck
        base.loadMedia = function(imgStatus){

            //note must use $var inorder for IE to recognise var as object
            //initialise local vars
            href = null;
            flash_extension = null;
            $target = base.$el;

            //grab href attribute
            href = base.$el.attr('href');

            // check if is external video
            var isExternalVideo = base.isExternalVideo(href);

            //get link path to flv if it exists
            flash_extension = base.$el.attr('href').substring(base.$el.attr('href').lastIndexOf(".")+1,base.$el.attr('href').length); //grab file extension attribute


            //set background image based on imgStatus
            switch(imgStatus){
                case "success":
                    base.options.imgDefaultSrc = base.$el.attr('title');
                break;
            }

            // remove any existing vids
            if($target.siblings('div.video').length > 0){
                $target.siblings('div.video').remove();
            }



            // look in the metadata for a width and height
            data = $target.metadata();
            if (data.width && data.height){
                //if (base.options.width != null && base.options.height != null){
                    base.options.width = data.width;
                    base.options.height = data.height;
                //}
            }

            if (data.target_id != null){
                base.options.targetId = data.target_id;
            }

            // initialise
            isIphone = false;
            isAndroid = false;
            supportsVideo = true;

            // iphone and ipad go straight to roundabout
            if (Modernizr.video && Modernizr.video.h264){

                // preload h264 assets
                //if(Modernizr.video.h264){
                if((navigator.userAgent.match(/iPhone/i)) ||  (navigator.userAgent.match(/iPad/i))) {
                    isIphone = true;
                }

                if((navigator.userAgent.match(/Android/i)) ||  (navigator.userAgent.match(/Nexus/i))) {
                    isAndroid = true;
                }
            }

            // none video browsers flags set
            if (!Modernizr.video){
                isIphone = false;
                supportsVideo = false;
            }
            //if($target.siblings('.video').length == 0){

                //background:url(\''+base.options.imgDefaultSrc+'\') center no-repeat;
                if(!isExternalVideo){

                    var $videoWrapper = $('<div class="video" id="'+base.options.targetId+'_box" style="width:'+base.options.width+'px;height:'+base.options.height+'px;"><div class="tr"></div><div class="br"></div><div class="bl"></div><div class="tl"></div></div>');

                    var vidTag = (supportsVideo)?'video':'div';

                    var $videoTag = $('<'+vidTag+' id="'+base.options.targetId+'" class="player" poster="'+base.options.imgDefaultSrc+'" width="'+base.options.width+'" height="'+base.options.height+'" controls="true"><source src="'+href+'"></source><div class="non-flash-content">no flash</div></'+vidTag+'>');


                    // append video tag to target
                    $videoWrapper.append($videoTag);

                    // append video wrapper to holder element
                    var $videoHolder = $('<div />');
                        $videoHolder.append($videoWrapper);

                    var $load_element = $('<div>').addClass('loader');
                    var $animate_element = $('<span>');

                    // update iframewidth and height
                    $load_element.css({
                        'position':'absolute',
                        'top':0,
                        'left':0,
                        'width':base.options.width,
                        'height':base.options.height
                    });

                    // add animate element to load to sit inside
                    if(base.options.loader){
                        $load_element.append($animate_element);
                        $videoHolder.append($load_element);
                    }

                    // inset after target
                    $target.after($videoHolder.html());

                    // fire load callback if one exists
                    if(base.options.loadCallback){
                        base.options.loadCallback($target);
                    }

                }else{
                    if(base.options.useSpacer == true){
                        $('<div id="vid-temp-spacer" style="width:'+base.options.width+'px;height:'+base.options.height+'px;"></div>').insertAfter($target);
                    }
                }


                if (isIphone == false && isAndroid == false) {



                    // init jwplayer
                    if(typeof(base.options.targetId) != null){

                        if(!isExternalVideo){
                            if(jwplayer && base.options.localPlayer == 'jwplayer'){
                                var jwIsFullScreen = false;
                                var jwPlayerOptions = {
                                        width: base.options.width,
                                        height: base.options.height,
                                        file: href,
                                        image: base.options.imgDefaultSrc,
                                        skin:base.options.skinPath+'/'+base.options.skin+'.xml',
                                        stretching:'fill', // uniform, fill, exactfit, none
                                        modes: [
                                                    { type: "flash", src: base.options.swfDefaultDir },
                                                    { type: "html5" }
                                                ]
                                    }

                                // use streaming if set to true
                                if(base.options.streaming === true){
                                    if(base.options.streamer.length >0){
                                        jwPlayerOptions.streamer = base.options.streamer;
                                    }
                                }
                                // hide control bar if set to false
                                if(base.options.controlbar === false){
                                    jwPlayerOptions.controlbar = "none";
                                }

                                // load jwplayer
                                jwplayer(base.options.targetId).setup(jwPlayerOptions);

                                if(base.options.event == "onClick"){
                                    jwplayer(base.options.targetId).onReady(function(){

                                        jwplayer(base.options.targetId).play();

                                        // fire ready callback if one exits
                                        if(base.options.readyCallback){
                                            base.options.readyCallback($target);
                                        }

                                    }); // autoplay

                                    var bufferCount = 0;

                                    var updateBuffer = (function(buffer){
                                        // log(buffer.metadata.loaded);
                                        // only update count if buffer has loaded value
                                        if(buffer.metadata.loaded > 0){
                                            bufferCount ++;
                                        }
                                    });

                                    // catch browsers that stall
                                    var checkBuffer = (function(){
                                        // if buffer count is still 0 then fire endCallback;
                                        if(bufferCount == 0){
                                            // fire end callback if one exits
                                            if(base.options.endCallback){
                                                // base.options.endCallback($target);
                                            }
                                        }
                                    });

                                    // set up bufferOnChage
                                    jwplayer(base.options.targetId).onBufferChange(updateBuffer);

                                    // check buffer after 2 secs
                                    setTimeout(function(){
                                        checkBuffer();
                                    }, 2000);

                                    jwplayer(base.options.targetId).onError(function(){

                                        // fire end callback if one exits
                                        if(base.options.endCallback){
                                            base.options.endCallback($target);
                                        }

                                    }); // autoplay
                                }

                                // on idle
                                jwplayer(base.options.targetId).onIdle(function(){
                                    // fire end callback if one exits
                                    if(base.options.endCallback){
                                        base.options.endCallback($target);
                                    }
                                });

                                // on full screen
                                jwplayer(base.options.targetId).onFullscreen(function(){
                                    //  callback gets fired on open/close - invert the boolean value (true or false).
                                    // pass into callback e.g. var fullScreenCallback = function(jwIsFullScreen) { bla };
                                    jwIsFullScreen = !jwIsFullScreen;
                                    if(base.options.fullScreenCallback){
                                        base.options.fullScreenCallback(jwIsFullScreen);
                                    }
                                });
                            }
                            // append the wmode para to the flash object if rendered
                            if(document.getElementById(base.options.targetId)){
                                var wmode = document.createElement("param");
                                wmode.name = "wmode";
                                wmode.value = "transparent";
                                document.getElementById(base.options.targetId).appendChild(wmode);
                            }

                            // add closer
                            base.loadCloser($target);
                        }
                    }

                    //enforce dimensions on player
                    $(base.options.targetId).bind('set_dimensions',function(){
                        $(this).css({'width': base.options.width,'height': base.options.height});
                    });

                    $(base.options.targetId).trigger('set_dimensions');
                }// end if iphone is false
                else{

                    // as android html5 video support is incomplete just skip to endcallback;
                    if(isAndroid){
                        if(base.options.endCallback){
                            base.options.endCallback($target);
                            return;
                        }
                    }

                    // bind events to native html video element
                    var $v = $('.video video:first');

                    // native js video object
                    var v = $v[0];
                        v.load(); // this must be done load video in ipad etc

                    // assign video to object options
                    this.video = v;

                    // show or hide controls
                    if(base.options.controlbar){
                        v.controls = base.options.controlbar;
                        if(!base.options.controlbar){
                            v.removeAttribute("controls");
                        }
                        $v.attr('controls', base.options.controlbar);
                    }

                    // bind can play event using jquery
                    $v.bind('canplay', function(){

                        if (base.options.event == "onClick"){

                            // fire ready callback if one exits
                            if(base.options.readyCallback){
                                base.options.readyCallback($target);
                            }

                            // if autoplay true then play
                            v.play();
                        }

                    });

                    // bind ended event using jquery
                    $v.bind('ended', function(){
                        // if there is a endedCallback then use here
                        if(base.options.endCallback){
                            base.options.endCallback($target);
                        }
                    });

                    // bind duration handler
                    $v.bind('durationchange', function() {
                       //log("Current duration is: " + this.duration);
                    });

                    // add closer for local iphone vids
                    base.loadCloser($target);
                }


                // if($.embedly && isExternalVideo && base.options.embedlyApiKey != null){
                if(isExternalVideo){
                    /*
                    // Sets up the default key for the jQuery Plugin.
                    $.embedly.defaults.key = base.options.embedlyApiKey;
                    $.embedly.oembed(href, {
                            query : {
                                method:'after',
                                maxWidth: base.options.width,
                                maxHeight:base.options.height,
                                wrapElement: 'div',
                                className : 'video',
                                wmode : 'transparent',
                                autoplay: (base.options.event == "onClick")?true:false // autoplay onClick
                            }
                        }).progress(function(oembed){
                            if (oembed == null){
                                $target.after('<p class="text"> Not A Valid URL </p>');
                            }else{

                                <iframe width="641" height="390" frameborder="0" allowfullscreen="" mozallowfullscreen="" webkitallowfullscreen="" title="Southern Discomfort Sunday Times promo video" src="http://player.vimeo.com/video/35457556" id="video-frame" border="0"></iframe>

                                <iframe src="//player.vimeo.com/video/35457556" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>*/

                                // var $iframe = (oembed.html.length>0)?$(oembed.html):null;
                                var $iframe = $('<iframe />');
                                    $iframe.attr('id', 'video-frame');
                                    $iframe.attr('width', base.options.width);
                                    $iframe.attr('height', base.options.height);
                                    $iframe.attr('frameborder', 0);
                                    $iframe.attr('allowfullscreen', '');
                                    $iframe.attr('mozallowfullscreen', '');
                                    $iframe.attr('webkitallowfullscreen', '');
                                    $iframe.attr('src', href+(href.indexOf('?') === -1 ? '?' : '&amp;')+'autoplay=1');

                                var $wrap_element = $('<div>').addClass('video');
                                var $load_element = $('<div>').addClass('loader');
                                var $animate_element = $('<span>');
                                var $title_element = $('<h2 />').addClass('title');
                                var $rounded_corners = $('<div class="tr"></div><div class="br"></div><div class="bl"></div><div class="tl"></div>');


                                // add rounded corners to wrapper
                                $wrap_element.append($rounded_corners);

                                // create title element
                                if(typeof $target.attr('title') != 'undefined'){
                                    $title_element.text($target.attr('title'));
                                }

                                // update iframewidth and height
                                $load_element.css({
                                    'position':'absolute',
                                    'top':0,
                                    'left':0,
                                    'width':base.options.width,
                                    'height':base.options.height
                                });

                                // add animate element to load to sit inside
                                $load_element.append($animate_element);

                                // update iframewidth and height
                                $iframe.attr({
                                    'width':base.options.width,
                                    'height':base.options.height,
                                    'border':0
                                });

                                // append iframe to wrapper
                                if(base.options.useSpacer == true){
                                    $('#vid-temp-spacer').remove();
                                }

                                // add onload element for iframe
                                var frame = $iframe.get(0);

                                // append iframe to wrapper
                                // ie8 proof only
                                if (!Modernizr.borderradius){

                                    if(typeof $target.attr('title') != 'undefined'){
                                        $wrap_element.append($title_element);
                                    }

                                    if(base.options.loader){
                                        $wrap_element.append($iframe).append($load_element);
                                    }else{
                                        $wrap_element.append($iframe);
                                    }


                                    // insert video into place holder if one exists
                                    if(base.options.placeholder && $(base.options.placeholder).length >0){
                                        $(base.options.placeholder).after($wrap_element)
                                    }else{
                                        $target.after($wrap_element); // embed video
                                    }

                                    // fire load callback if one exits
                                    if(base.options.loadCallback){
                                        base.options.loadCallback($target);
                                    }

                                    // fade out loader
                                    $load_element.fadeOut('slow');

                                    if (frame) {
                                        frame.onload = function () {
                                            $iframe.fadeIn('slow');
                                            $wrap_element.addClass('active');
                                        };
                                    }else{
                                        $iframe.fadeIn('slow');
                                        $wrap_element.addClass('active');
                                    }

                                }else{

                                    // end of ie8 proof
                                    if(typeof $target.attr('title') != 'undefined'){
                                        $wrap_element.append($title_element);
                                    }

                                    if(base.options.loader){
                                        $wrap_element.append($iframe).append($load_element);
                                    }else{
                                        $wrap_element.append($iframe);
                                    }

                                    // insert video into place holder if one exists
                                    if(base.options.placeholder && $(base.options.placeholder).length >0){
                                        $(base.options.placeholder).after($wrap_element)
                                    }else{
                                        $target.after($wrap_element); // embed video
                                    }


                                    // fire load callback if one exits
                                    if(base.options.loadCallback){
                                        base.options.loadCallback($target);
                                    }

                                    if (frame) {

                                        frame.onload = function () {

                                            $load_element.fadeOut('slow');
                                            $iframe.fadeIn('slow');
                                            $wrap_element.addClass('active');
                                        };
                                    }else{

                                        $load_element.fadeOut('slow');
                                        $iframe.fadeIn('slow');
                                        $wrap_element.addClass('active');

                                    }
                                }

                                if(base.options.placeholder && $(base.options.placeholder).length >0){
                                    base.loadCloser($(base.options.placeholder));   // add closer
                                }else{
                                    base.loadCloser($target);   // add closer
                                }

                                //$target.after(oembed.code); // embed video
                                //base.loadCloser($target); // add closer
                            // }
                        // });

                }
        }


        // Run initializer
        base.init();
    };

    $.loadVideo.defaultOptions = {
        placeholder : null,
        imgExtension: ["jpg"],
        imgDefaultSrc: null,
        useSpacer: false,
        controlbar : true,
        width: null,
        height: null,
        swfDefaultDir:'/video/player.swf',
        event:'onClick',
        hideTarget: true,
        targetId: null,
        skin : 'glow',
        skinPath: '/js/libs/jwplayer/skins/glow/',
        closer:true,
        closer_text:'close [X]',
        loader:true,
        openCallback : null,
        closerCallback : null,
        loadCallback : null,
        readyCallback : null,
        endCallback : null,
        localPlayer:'jwplayer',
        localDomains:[],
        streaming : false,
        streamer : null,
        embedlyApiKey: null,
        fullScreenCallback: null
    };

    $.fn.loadVideo = function(options){
        return this.each(function(){
            (new $.loadVideo(this, options));
        });
    };

    // This function breaks the chain, but returns
    // the loadVideo if it has been attached to the object.
    $.fn.getloadVideo = function(){
        this.data("loadVideo");
    };

})(jQuery);