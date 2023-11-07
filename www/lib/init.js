// this script must be loaded with defer so that translation is done when DOM is parsed

function getSessionPrefs() {
	const prefs = sessionStorage.getItem("sneakSpeakSessionPrefs");
	return prefs ? JSON.parse(prefs) : {};
}

function getLocalPrefs() {
	const prefs = localStorage.getItem("sneakSpeakLocalPrefs");
	return prefs ? JSON.parse(prefs) : {};
}

const SSsession = { //sneakspeak prefs stored in session storage TODO refactor
	setItem: function(prop,value) { 
		let prefs = getSessionPrefs();
		prefs[prop] = value;
		sessionStorage.setItem("sneakSpeakSessionPrefs",JSON.stringify(prefs));
	},
	getItem: function(prop) {
		let prefs = getSessionPrefs();
		return prefs?.[prop] ?? null;
	},
	removeItem: function(prop) { 
		let prefs = getSessionPrefs();
		delete prefs[prop];
		sessionStorage.setItem("sneakSpeakSessionPrefs",JSON.stringify(prefs));
	},
}

const SSlocal = { //sneakspeak prefs stored in local storage 
	setItem: function(prop,value) { 
		let prefs = getLocalPrefs();
		prefs[prop] = value;
		localStorage.setItem("sneakSpeakLocalPrefs",JSON.stringify(prefs));
	},
	getItem: function(prop) {
		let prefs = getLocalPrefs();
		return prefs?.[prop] ?? null;
	},
	removeItem: function(prop) { 
		let prefs = getLocalPrefs();
		delete prefs[prop];
		localStorage.setItem("sneakSpeakLocalPrefs",JSON.stringify(prefs));
	},
}


// localization

const l10n = {// localization class
	initLocale: function () {
		let loc = SSlocal.getItem("locale");
		if (loc) { // conditionally load messages using a script tag
			var SSmsgLoader = document.createElement('script');
			SSmsgLoader.src = '/lib/l10n/messages_' + loc + '.js';
			document.head.appendChild(SSmsgLoader);
		}
	},
	translatePage: function (msg) { // translate html elements
		if (msg == {}) { return; } // do nothing if no msg available
		const allKeys = Object.keys(msg);
		document.querySelectorAll("[l10n]").forEach(element => {
			const key = element.getAttribute("l10n"); 
			if (allKeys.includes(key)) {
				element.innerHTML = t(key,msg); //translate only if it exists
			}
		});
	},
}

var SSmsg = {}
l10n.initLocale();

function t(key, messages = SSmsg) {
	try { return messages[key] || key}
	catch { return key }
}

document.addEventListener("DOMContentLoaded", () => {
	l10n.translatePage(SSmsg);
});
