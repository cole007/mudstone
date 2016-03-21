import videojs from 'video.js';
import 'videojs-vimeo';

// videojs.plugin('videojs-vimeo', vimeo);


function loadVideo() {

	var options = {
		techOrder: ["vimeo"], 
		src: "https://vimeo.com/63186969",
		preload: "auto",
		autoplay: false,
		children: [
			"mediaLoader",
			"posterImage",
			"bigPlayButton",
			"controlBar",
		],
		controlBar: {
			children: [
			    'playToggle',
			    'volumeMenuButton',
			    'currentTimeDisplay',
			    'timeDivider',
			    'durationDisplay',
			    'fullscreenToggle'
			  ]
		}
	}

	videojs('vid1', options).ready(function() {
	    // You can use the video.js events even though we use the vimeo controls
	    // As you can see here, we change the background to red when the video is paused and set it back when unpaused
	    this.on('pause', function() {
	      document.body.style.backgroundColor = 'red';
	    });
	    
	    this.on('play', function() {
	      document.body.style.backgroundColor = '';
	    });

	    console.log(this);
	    
	    // You can also change the video when you want
	    // Here we cue a second video once the first is done
	    this.one('ended', function() {
	      // this.src('http://vimeo.com/79380715');
	      // this.play();
	    });
  	});


}

export default loadVideo;