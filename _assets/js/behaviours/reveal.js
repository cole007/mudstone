import Inview from '../helpers/inview';
import prefix from '../helpers/prefix';

export default function reveal(container) {


	function counter(e) {
		e.innerHTML = 'Good evening miss';
	}

	const reveal = new Inview({
		element: container.querySelectorAll('.js-reveal'),
		alreadyInView: function(e) {

		},
		pre: function(e) {
			e.style.opacity = 0;
			e.style[prefix.css3('transition')] = 'all .3s .2s';
		},
		post: function(e) {
			e.style.opacity = 1;
			e.style.backgroundColor = 'red';
			counter(e);
		}
	})
}