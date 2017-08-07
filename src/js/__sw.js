const CACHE = 'mudstone'

self.addEventListener('install', function (evt) {
	evt.waitUntil(precache())
})

self.addEventListener('fetch', function (evt) {
	evt.respondWith(fromNetwork(evt.request, 400).catch(function () {
		return fromCache(evt.request)
	}))
})

function precache() {
	return caches.open(CACHE).then(function (cache) {
		return cache.addAll([
			'../css/style.css',
			'bundle.js',
			'../css/fonts.css',
			'../../index.html',
			'../../a.html',
			'../../b.html',
			'../../c.html'
		])
	})
}

function fromCache(request) {
	return caches.open(CACHE).then(function (cache) {
		return cache.match(request)
			.then(function (matching) {
				log(request)
				return matching || Promise.reject('no-match')
			})
			.catch(function (matching) {
				log(request)
				return Promise.reject('no-match')
			})
	})
}

function fromNetwork(request, timeout) {
	return new Promise(function (fulfill, reject) {
		const timeoutId = setTimeout(reject, timeout)
		fetch(request).then(function (response) {
			clearTimeout(timeoutId)
			fulfill(response)
		}, reject)
	})
}