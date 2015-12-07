
const c = [];

function collection() {
	return {
		add: function(item) {
			c.push(item);
		},
		remove: function(item) {
			var i = c.findIndex((element, index) => element.name === item.name);
			c.splice(i, 1);
		},
		log: function() {
			console.log(c);
		},
		trigger: function(event) {
			
		}
	}
}

export function App(options) {
	// var name = options.name; // a name required for accessing later
	// var container = options.container; // string - css selector
	// var element = options.element; // element to bound behaviours on ( this.container used for event delegation)
	
	var _object = {
		name: 'hello'
	}

	var update = collection();
	update.add({name: 'hello'});

	update.log()
} 



export function Test(options) {
	var name = options.name; // a name required for accessing later
	var container = options.container; // string - css selector
	var element = options.element; // element to bound behaviours on ( this.container used for event delegation)

	var _object = {
		name: name
	}


	var update = collection();
	update.add({name: 'hello'});

	update.log()
} 

