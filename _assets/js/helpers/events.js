import assignIn from 'lodash.assignin';
import Concert from 'concert';

/* example usage 

import events from '../helpers/events';
events.on('add:onions', function() {
	console.log('add:onions event called');
})

function beltingFunction() {
	events.trigger('add:onions')
}

*/

function Events() {}

assignIn(
    Events.prototype,
    Concert
)

const _events = new Events();

export default _events;


