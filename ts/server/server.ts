let settingsShare = await Deno.readTextFile("settingsShare.txt");
const listenToPort = 8081 // remember to check if it needs to be proxied with https
import * as Earthstar from "../../www/lib/earthstar.deno.js";

settingsShare= settingsShare.trim();
if (settingsShare.startsWith("earthstar://")) { //then it's an invite 
	const p = await Earthstar.parseInvitationURL(settingsShare);
        settingsShare=p.shareAddress; 
}

new Earthstar.Server([
	new Earthstar.ExtensionServerSettings({
		settingsShare: settingsShare,
		onCreateReplica: (address) => {
			console.log(`Creating replica for ${address}...`);

			return new Earthstar.Replica({
				driver: new Earthstar.ReplicaDriverFs(address, "./data"),
			});
		},
	}),  new Earthstar.ExtensionSyncWeb(),
],{ port: listenToPort }
);
