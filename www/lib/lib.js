

export function checkServer(settings) {
	if (SSsession.getItem("srv_current") !== null) {return}
	if (settings.servers.length === 1) {
		SSsession.setItem("srv_current",settings.servers[0]);
		return }
	// so, need to pick a server
	window.location.href = "./servers.html";
}

export function checkShare(settings) {
	if (SSsession.getItem("channel_current") !== null) {return}
	if (settings.shares.length === 1) {
		SSsession.setItem("channel_current",settings.shares[0]);
		return }
	// so, need to pick a share
	alert(t("First you need to select/create a channel"));
	window.location.href = "./channels.html";
}

export function checkAuthor(settings) {
	if (settings.author !== null) { return
	} else { window.location.href = "./id_new.html";}
}


export function crcToGradient(str) { //not actual crc, let's hope deterministic
	let hsl = new Array(15).fill(0);
	for (let i = 0; i < str.length; i++) {
		const j = i % 15;
		hsl[j] += (str.charCodeAt(i));
		hsl[j] += (str.charCodeAt(i) ^ hsl[(i + 7) % 15]);
	}
	const stops = [];
	// Calculate hue, brightness, and saturation of each stop
	for (let i = 0; i < 15; i += 3) {
		const hue = (hsl[i] / 2) % 360
		const brightness = ((hsl[i+1] / 2) % 60 + 20); //avoid b/w peaks
		const saturation = ((hsl[i+2] / 2) % 10 + 90);
		stops.push(`hsl(${hue}, ${saturation}%, ${brightness}%)`);
	}

	// Build gradient string
	const gradient = `linear-gradient(to right, ${stops.join(", ")})`;
	return gradient;
}

export function deobfuscateDocs(docs,keyPair) {
	docs.forEach((doc) => {
		if (doc.path.endsWith ('/pubkey' + sodium.to_hex(keyPair.publicKey))) {
			doc.text =  sodium.to_string(sodium.crypto_box_seal_open(sodium.from_base64(doc.text), keyPair.publicKey, keyPair.privateKey));
		}
	});
}

export async function obfuscateDoc(toBeWritten,keyPair) {
	// Encrypt the message using crypto_box_seal()
	const pkPath = '/pubkey' + sodium.to_hex(keyPair.publicKey)
	if (!toBeWritten.path.endsWith(pkPath)) {
		toBeWritten.path += pkPath;
	}
	const encryptedMessage = await sodium.crypto_box_seal(toBeWritten.text, keyPair.publicKey);
	toBeWritten.text = sodium.to_base64(encryptedMessage); //TODO check whether conversion is overkill
}

export function setExpiry(toBeWritten) {
	const expiration = SSsession.getItem("expiry_current");
	if ( expiration !== null) {
		if (!toBeWritten.path.includes('!')) {
			toBeWritten.path += '/tmp!'; //enables expiration
		}
		toBeWritten.deleteAfter = (Date.now() * 1000 + Number (expiration));
	}
}

export function downloadJSON(data, filename) {
	const jsonData = JSON.stringify(data);
	const blob = new Blob([jsonData], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}




