
const c = [];

export function collection() {
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
		trigger: function() {

		}
	}
}


var ex = new App();
ex.test();