# dav1n

A small website for [dav1n's stream](https://www.twitch.tv/dav1n).

Plain HTML, CSS and JavaScript. No build step, analytics, accounts or credentials.
The deployable website lives in `dist/`.

## Local preview

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Visit http://localhost:4173. Keep the site on HTTP(S); Twitch embeds cannot run from a local file URL.

## Content

Business email and social links were checked against the public Twitch profile and About panels on October 1, 2026. The images are original stream thumbnails imported from Twitch for this website. Artwork and third-party marks remain the property of their respective owners.

- Business: business@dav1n.com
- Twitch: https://www.twitch.tv/dav1n
- Discord: https://discord.gg/zRY3VPa2pv
- YouTube: https://www.youtube.com/@dav1ntwitch
- TikTok: https://www.tiktok.com/@dav1n_official
- Instagram: https://www.instagram.com/dav1n_official/
- X: https://x.com/dav1n_

Edit `dist/index.html` to update content and `dist/styles.css` to adjust the design.

## Design and behavior

The layout is built around watching, finding the community and making a business
inquiry. On desktop, a compact profile, Discord, social links and email sit beside
the main player; on phones, the stream comes immediately after the profile.
Two real clips sit below. There is no navbar, decorative dashboard or repeated
marketing copy. Black surfaces, warm play controls and locally hosted Barlow
Condensed and IBM Plex Mono carry the visual identity. Font OFL licenses are
included with the assets.

The player loads only after a click and uses the current hostname as Twitch's
required `parent`. At widths below Twitch's 400px minimum, the control opens the
channel directly. Closing the player removes the iframe and restores focus to the
watch button; resizing below the minimum switches back to the direct link. There is no
invented live indicator, schedule or viewer count. Twitch controls its own stream,
offline, advertising and playback states. Clip titles and the short bio are copied
from the channel; “masters peak (XD)” is the creator's self-description.

The copy control uses the browser clipboard API, gives success/failure feedback,
and is omitted when unsupported. Email and external links work without JavaScript.

## Image sources

These are actual public Twitch clip thumbnails, not generated portraits:

- Stream portrait: https://clips.twitch.tv/SpinelessBloodyVultureNinjaGrumpy-eWNrd976COJJmxdo
- Elden Ring: https://clips.twitch.tv/CrypticAcceptableGazelleDeIlluminati-pQF-CeNT_CXLttLq
- Inventory: https://clips.twitch.tv/GiantHomelyBatteryStrawBeary-hv_jfi3acVNC74Km

Twitch embed reference: https://dev.twitch.tv/docs/embed/video-and-clips/

## Hosting preference

Run this project on localhost. Do not publish to ChatGPT Sites or another hosting
provider unless explicitly requested. GitHub stores the source only.

The site is plain static files in `dist/`; no hosting service, API keys, npm install
or build step are needed for the local preview.
