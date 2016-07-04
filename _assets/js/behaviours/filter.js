export default function filter() {
	const $dom = $('.filter');
	const data = [
		{
			location: 'south-west',
			category: 'food-beverages',
			name: 'kfc',
			index: 0
		},
		{
			location: 'south-west',
			category: 'food-beverages',
			name: 'kfc',
			index: 1
		},
		{
			location: 'south-west',
			category: 'food-beverages',
			name: 'starbucks',
			index: 2
		},
		{
			location: 'south-west',
			category: 'food-beverages',
			name: 'starbucks',
			index: 3
		},
		{
			location: 'london',
			category: 'food-beverages',
			name: 'kfc',
			index: 4
		},
		{
			location: 'london',
			category: 'food-beverages',
			name: 'starbucks',
			index: 5
		},
		{
			location: 'london',
			category: 'food-beverages',
			name: 'starbucks',
			index: 6
		},
		{
			location: 'london',
			category: 'food-beverages',
			name: 'kfc',
			index: 7
		},
		{
			location: 'south-west',
			category: 'hotel',
			name: 'hilton',
			index: 8
		},
		{
			location: 'south-west',
			category: 'hotel',
			name: 'hilton',
			index: 9
		},
		{
			location: 'south-west',
			category: 'hotel',
			name: 'radison',
			index: 10
		},
		{
			location: 'london',
			category: 'hotel',
			name: 'hilton',
			index: 11
		},
		{
			location: 'london',
			category: 'hotel',
			name: 'radison',
			index: 12
		},
		{
			location: 'london',
			category: 'hotel',
			name: 'hilton',
			index: 13
		},
		{
			location: 'south-west',
			category: 'property',
			name: 'prop1',
			index: 14
		},
		{
			location: 'south-west',
			category: 'property',
			name: 'prop2',
			index: 15
		},
		{
			location: 'london',
			category: 'property',
			name: 'prop3',
			index: 16
		},
	]



	// level 1
	// get all of the items in the south west
	var loc = data.filter((e) => e.location === 'south-west');
	// level 2, 
	// get all of the hotels in south west
	var hotels = data.filter((e) => e.location === 'south-west').filter((e) => e.category === 'hotel');


	$dom.on('change', 'input', changeHandle);

	const total = {
		location: $('input[data-type="location"]').length,
		category: $('input[data-type="category"]').length
	}

	var items = [];
	var locations = [];

	function changeHandle(e) {
		e.preventDefault();
		const type = $(this).data('type');
		const master = $(this).data('master');
		const category = $(this).data('category');
		const checked = $(this).prop('checked');
		const name = $(this).attr('name');
		const count = $(`input[data-category="${category}"]`).length;
		const checkedCount = $(`input[data-type="item"][data-category="${category}"]:checked`).length;
		// handle the master clicks
		if(master) {
			if(checked) {
				$(`input[data-type="${master}"]`).each(function() {
					$(this).prop('checked', true);
					name === 'everywhere' && locations.push($(this).attr('name'));
				});
				if(name === 'everything') {
					$('input[data-type="item"]').each(function() {
						$(this).prop('checked', true);
						items.push($(this).attr('name'));
					});
				}

			} else {
				$(`input[data-type="${master}"]`).prop('checked', false);
				locations = [];
				if(name === 'everything') {
					$('input[data-type="item"]').each(function() {
						$(this).prop('checked', false);
					});
					items = [];
				}
			}
		}

		if(type === 'category') {
			if(checked) {
				$(`input[data-category="${name}"]`).prop('checked', true);

				if($(`input[data-type="category"]:checked`).length === total.category) {
					$(`input[data-master="category"]`).prop('checked', true);
				}
			} else {
				$(`input[data-category="${name}"]`).prop('checked', false);
				// remove select from filter: everything
				$(`input[data-master="category"]`).prop('checked', false);
			}
		}

		// location check 
		if(type === 'location') {
			if(checked) {	
				// push the location in the array
				locations.push(name);
				// if they are all checked set the parent ('everywhre') to checked
				if($(`input[data-type="location"]:checked`).length === total.location) {
					$(`input[data-master="location"]`).prop('checked', true);
				}			
			} else {
				// remove select from filter: everywhere
				$(`input[data-master="location"]`).prop('checked', false);
				// get the index of the location, remove from array
				var indexOf = locations.indexOf(name);
				locations.splice(indexOf, 1);
			}
		}

		// items check
		// if all of the items are checked, set the parent item to checked
		// if not remove the checked state
		if(type === 'item') {
			if(count === checkedCount) {
				$(`input[name="${category}"]`).prop('checked', true);	
			} else {
				$(`input[name="${category}"]`).prop('checked', false);
			}
		}

		buildItemsQuery();
		var q = filterQuery();
	};

	function buildItemsQuery() {
		// empty the array 
		items = [];
		$('input[data-type="item"]:checked').each(function(i) {
			items.push($(this).attr('name'));
		})
	}

	function filterQuery() {
		console.log('items:', items.length, 'locations:', locations.length, 'data:', data.length);
		const _base = [];
		// get the locations first
		if(locations.length > 0) {
			// loop through each of the locations in the query
			locations.forEach((location) => {
				// filter through the data, if the location matches the current push into _locations
				const ar = data.filter((e) => e.location === location);
				_base.push(ar);
			})
		}

		var merged = [].concat.apply([], _base);
		var query = merged.length === 0 ? data : merged;

		if(items.length === 0) {
			return query;
		} else {
			merged = [];
			// loop through all the items 
			// loop through each of the locations in the query
			items.forEach((name) => {
				// filter through the data, if the location matches the current push into _locations
				const ar = query.filter((e) => e.name === name);
				merged.push(ar);
			})

			return [].concat.apply([], merged);
		}
	}
};