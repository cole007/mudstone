import Inview from '../helpers/inview';
import prefix from '../helpers/prefix';

export default function reveal(container) {


	function _reveal(e) {
		e.style.backgroundColor = 'green';
	}


	const reveal = new Inview({
		element: container.querySelectorAll('.js-reveal'),
		threshold: 0,
		pre: function(e) {
			e.style.opacity = 0;
			e.style[prefix.css3('transition')] = 'all .3s .2s';
		},
		alreadyInView: function(e) {
			_reveal(e);
		},
		post: function(e) {
			e.style.opacity = 1;
			_reveal(e);
		}
	})
}