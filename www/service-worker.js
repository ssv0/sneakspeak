const CACHE_NAME = 'sneakspeak-app-cache';
//preload pages for offline use
const appPages = ['./service-worker.js', './', './css/reset.css', './css/default.css', './fonts/PTMono-Regular.ttf', './lib/earthstar.web.js', './lib/lib.js', './lib/browsers-sumo/sodium.js', './lib/init.js', './lib/l10n/Flag_of_Italy.svg', './lib/l10n/Flag_of_the_United_Kingdom.svg', './lib/l10n/help_null.html', './lib/l10n/help_it-IT.html', './lib/l10n/messages_it-IT.js', './channel_chat.html', './channel_invite.html', './channel_new.html', './channel_open.html', './channel_receive.html', './channels.html', './doc_edit.html', './docs_import.html', './docs_persistence.html', './icon.png', './id_new.html', './id_restore.html', './index.html', './language.html', './manifest.json', './private_mode.html', './reset.html', './settings_dump.html', './settings_restore.html', './server_new.html', './server_receive.html', './servers.html'];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			return cache.addAll(appPages);
		})
	);
});

self.addEventListener("fetch", (e) => {
	e.respondWith(
		(async () => {
			const r = await caches.match(e.request);
			console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
			if (r) {
				return r;
			}
			const response = await fetch(e.request);
			const cache = await caches.open(CACHE_NAME);
			console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
			cache.put(e.request, response.clone());
			return response;
		})(),
	);
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName !== CACHE_NAME;
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});

self.addEventListener('message', (event) => {
	if (event.data == 'notifyNewMsg') {
		self.registration.showNotification("Sneakspeak", {tag: "newMsg", body:"Nuovo messaggio"});
	}
});
