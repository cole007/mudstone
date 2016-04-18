// https://github.com/aFarkas/lazysizes
import lazySizes from 'lazysizes';

function lazyLoad() {
	// add background-image support
	document.addEventListener('lazybeforeunveil', function(e){
	    var bg = e.target.getAttribute('data-bg');
	    if(bg){
	        e.target.style.backgroundImage = 'url(' + bg + ')';
	    }
	});
	
	lazySizes.loadMode = 5;
	lazySizes.init();
};

export default lazyLoad;