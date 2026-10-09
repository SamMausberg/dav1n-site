# Verification, October 9, 2026

Checked in headless Chrome 148 against the local preview at http://localhost:3000.

## Fits one screen

No vertical or horizontal scroll at 1920×1080, 1536×864, 1440×900, 1366×768,
1280×720, 1024×768, 768×1024, 390×844, 390×664, 360×640 and 320×568.
Below about 62rem of page width the clip titles are hidden visually and stay in the
link text. On phones the page stacks and the clips keep their titles.

## Player and controls

- Nothing is requested from Twitch until a Watch button or the photo is clicked.
- Watch stream loads `player.twitch.tv/?channel=dav1n&parent=localhost`, Watch 24/7
  loads `channel=dav1n247`. Twitch accepted `localhost` as the parent and showed
  its own offline card for dav1n247 at the time of testing.
- Clicking the photo starts the main stream. Close player removes the iframe and
  returns focus to the button that opened it.
- Narrowing the window below Twitch's 400px minimum closes the player and turns
  both buttons back into links to twitch.tv/dav1n and twitch.tv/dav1n247.
- Copy email writes business@dav1n.com to the clipboard, the button reads
  "Copied" for 2.5 seconds, and a screen reader status announces it.
- Tab order: skip link, email, Copy email, Watch stream, Watch 24/7, then the bar,
  social links and clips. Focus rings are white with a black outer ring so they
  show on the photo and on black.
- No console or page errors. `node --check dist/main.js` passes.

Not checked: Safari, Firefox, real phones, live playback while dav1n is streaming,
and the Discord invite's validity.
