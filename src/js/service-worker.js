const CACHE = 'mudstone'

self.addEventListener('install', function (evt) {
	evt.waitUntil(precache())
})

self.addEventListener('fetch', function (evt) {
	console.log('The service worker is serving the asset.')

	evt.respondWith(fromNetwork(evt.request, 400).catch(function () {
		return fromCache(evt.request)
	}))
})

function precache() {
	console.log('precache', caches)
	return caches.open(CACHE).then(function (cache) {
		return cache.addAll([
			'/dist/css/style.css',
			'/dist/css/fonts.css',
			'/index.html',
			'/a.html',
			'/b.html',
			'/c.html'
		])
	})
}

function fromCache(request) {
	console.log('fromCache', caches)
	return caches.open(CACHE).then(function (cache) {
		console.log('fromCache', cache)
		return cache.match(request).then(function (matching) {
			return matching || Promise.reject('no-match')
		})
	})
}

function fromNetwork(request, timeout) {
	return new Promise(function (fulfill, reject) {
		const timeoutId = setTimeout(reject, timeout)
		console.log('fromNetwork', request)
		fetch(request).then(function (response) {
			clearTimeout(timeoutId)
			fulfill(response)
		}, reject)
	})
}