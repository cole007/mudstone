import Layzr from 'layzr.js';

function lazyLoad() {
	const instance = Layzr({
		normal: 'data-normal',
		threshold: 50
	}).update().check().handlers(true);
};


export default lazyLoad;