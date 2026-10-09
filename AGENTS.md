# Project instructions

- Preview this website on localhost:
  `python3 -m http.server 3000 --bind 127.0.0.1 --directory dist`, then open
  http://localhost:3000. Do not create, publish, synchronize or deploy it to
  ChatGPT Sites or another hosting provider unless the user explicitly asks.
- Keep the local preview server running for the user after making changes.
- Continue the authorized incremental commits and pushes to the private GitHub
  repository. A GitHub push is not authorization to deploy the website.
- The page must fit one screen with no scrolling. The stream frame takes the height
  left over after the name row, the bar under the stream and the links row
  (`--stage-h` in `dist/styles.css`); update those values if a row changes height.
- Preserve the pure black background, Barlow type, real stream imagery, the cow
  emote next to the name and the no-navbar layout. Keep the UI black and white;
  the photos and the cow carry the color.
- Keep the two clip previews small and secondary; avoid adding a sidebar, bio,
  oversized headings or a contact block.
- Keep the README to one sentence and the link list.

Asset sources: the stream photos are Twitch clip thumbnails linked from the page
(portrait: https://clips.twitch.tv/SpinelessBloodyVultureNinjaGrumpy-eWNrd976COJJmxdo).
The cow is dav1n's own 7TV emote, https://7tv.app/emotes/01M41PG5H51CNG6DV02647ZRAA
(`cow.webp` is the 4x file, `cow-still.png` and `cow-icon.png` are frame 10).
Fonts are Barlow (OFL, `dist/assets/fonts/barlow-OFL.txt`).
