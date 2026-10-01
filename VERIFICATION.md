# Verification — October 1, 2026

Validated the final black design in Chromium with Playwright against the local
HTTP preview. No navbar. Fonts and image assets are served from this repository.

- No horizontal overflow at 320, 390, 650, 768, 1024, 1440 and 1920 pixels.
- All three source images load at those widths.
- Automated axe WCAG 2 A/AA and WCAG 2.1 AA checks reported zero violations on
  the page at desktop and phone sizes. This is not a full accessibility audit.
- Keyboard skip link focuses the stream section.
- No third-party requests occur before the visitor starts the player.
- The player receives the current hostname as its `parent` and `dav1n` as channel.
  Twitch loaded its player and an ad break in the browser test. Sustained live
  video/audio playback and every device/browser were not verified.
- The active player is removed when the viewport becomes too narrow for Twitch's
  400px minimum; the direct channel link is restored. This test caught and fixed
  an aspect-ratio/min-height sizing issue.
- Copy-email succeeds with the correct address and gives honest feedback when
  clipboard permission is denied.
- With JavaScript disabled, Twitch, clip, social and email links remain available.
- `node --check dist/main.js` passes.

Twitch emitted a keyboard-layout permission warning inside its own player during
playback testing. The local page had no script errors before loading Twitch.
Twitch controls player availability, advertising, login and playback behavior.

Contact details and social destinations were copied from the channel's public
Twitch profile. The Discord API declined an automated invite-validation request
(HTTP 403); this does not establish whether the invite is expired. No message or
join action was sent to the community.

Clips are a curated import of actual Twitch thumbnails, titles, durations and
links. This version does not automatically refresh the selection. Clip playback
opens on Twitch; no video files are redistributed by the site.
