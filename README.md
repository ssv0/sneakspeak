# sneakspeak #

Alpha quality, offline-first, F2F emergency chat for small teams.

Message transmission both online or through manual exchange of message batches ("sneakernet").

Content flows in channels, always authenticated, optionally client-side password encrypted using libsodium. 

Optional message expiration after an amount of time set at message creation.

Message author is the only one authorized to edit or delete messages.

Uses standard [earthstar](https://earthstar-project.org) protocol and servers for communication, any static files web server for the app interface.

As an earthstar protocol based app, authentication and write permission is obtained through public/private keys. Servers can't alter content. Admins can't reset passwords. Servers exchange only messages of channels they both know.

Needs TLS (https, wss) to work online reliably (easy to set up Cloudflare tunnels tested).

App is a multi-page PWA for recent browsers, HTML5 + plain JS, no frameworks.

Deno runtime for servers tested. Node available on Earthstar. Server tested on GNU/Linux amd64 PCs and arm64 SBC.

Interface available in ENG and ITA, easy to translate.

Intro / tutorial in extras folder, online help and reference.

Not affiliated with any web domain containing the word sneakspeak. GPL affero license for the interface, Earthstar infrastructure is LGPL. Enjoy.
