const VERSION = "20231012T0154";
const CACHE_NAME = `DegreesWhat-${VERSION}`;

const APP_RESOURCES = [
	"./",
	"index.html",
	"main.css",
	"main.js",
	"data.js"
];

// Install: cache the static resources
self.addEventListener("install", (event) => {
	console.log("Service worker install event", event);
	event.waitUntil(async () => {
		const cache = await caches.open(CACHE_NAME);
		return cache.addAll(APP_RESOURCES);
	});
});


// Activate: delete old caches
self.addEventListener("activate", (event) => {
	console.log("Service worker activate event", event);
	event.waitUntil(
		(async () => {
			const names = await caches.keys();
			await Promise.all(
				names.map((name) => {
					if (name !== CACHE_NAME) {
						return caches.delete(name);
					}
				}),
			);
			await clients.claim();
		})(),
	);
});


// Fetch: network first, cache fallback
self.addEventListener("fetch", event => {
	//console.log("Service worker fetch event", event);
	console.log(`URL requested: ${event.request.url}`);
	event.respondWith(
		fetch(event.request)
		.catch(error => {
			return caches.match(event.request) ;
		})
	);
});
