// https://github.com/selz/plyr
import plyr from 'plyr';

const controlsHtml = `
	<i class='plyr__progress' style="display: none;"></i>
    <button type='button' data-plyr='play' class="button block__media-thumb-overlay">
		<svg class="icon icon--arrow-right-square ">
			<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right-square" class="sym sym--arrow-right-square"></use>
		</svg>
	</button>`;

var playingVideo;
function video(container) {
	container._player = plyr.setup(container, {
		controls: [
			'play',
			'fullscreen'
		],
		html: controlsHtml
	});

	container.addEventListener('play', function() {
		// if any other videos are playing... stop them
		if(playingVideo !== undefined && playingVideo !== container) {
			playingVideo._player[0].pause();
		}
		playingVideo = container[0];
	});
}

export default video;