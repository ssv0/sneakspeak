import { Input } from "../../www/lib/cliffy-prompt.deno.v0.25.5.js";
import * as Earthstar from "../../www/lib/earthstar.deno.js";
const { args } = Deno;
if (args.length < 1) { console.log("Uso: deno run -A sync.ts (file di invito a canale da sincronizzare) (facoltativo, server con cui sincronizzare)"); } 
// This script syncs a share with a remote replica server, and persists the results to disk.
const invite = await Earthstar.parseInvitationURL(await Deno.readTextFile(args[0]));
const shareAddr= invite.shareAddress;
let serverURL;
if (args.length > 1) { 
  serverURL = args[1];
  } else { 
  if (invite.servers.length === 1) { serverURL = invite.servers[0];
    } else {
    serverURL = await Input.prompt({
      message: "URL del server da sincronizzare?",
      suggestions: invite.servers,
    });
  }
}

const replica = await new Earthstar.Replica({
    driver: new Earthstar.ReplicaDriverFs(
      shareAddr,
      `./data/${shareAddr}/`,
    ),
  });

// Put it in a peer for syncing
const peer = new Earthstar.Peer();

peer.addReplica(replica);

try {
  new URL(serverURL);
} catch {
  console.error(`${serverURL} is not a valid URL.`);
  Deno.exit(1);
}

console.log("Syncing...");

// Start syncing and wait until finished.
const syncer = peer.sync(serverURL);

syncer.onStatusChange((newStatus) => {
  let allRequestedDocs = 0;
  let allReceivedDocs = 0;
  let allSentDocs = 0;
  let transfersInProgress = 0;

  for (const share in newStatus) {
    const shareStatus = newStatus[share];

    allRequestedDocs += shareStatus.docs.requestedCount;
    allReceivedDocs += shareStatus.docs.receivedCount;
    allSentDocs += shareStatus.docs.sentCount;

    const transfersWaiting = shareStatus.attachments.filter((transfer) => {
      return transfer.status === "ready" || transfer.status === "in_progress";
    });

    transfersInProgress += transfersWaiting.length;
  }

  console.log(
    `Syncing ${
      Object.keys(newStatus).length
    } shares, got ${allReceivedDocs}/${allRequestedDocs}, sent ${allSentDocs}, ${transfersInProgress} attachment transfers in progress.`,
  );
});

await syncer.isDone();
await replica.close(false);

console.log("Done!");

Deno.exit(0);
