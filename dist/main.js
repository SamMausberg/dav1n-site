'use strict';

const channel = 'dav1n';
const email = 'business@dav1n.com';
const stage = document.querySelector('#stream-stage');
const mount = document.querySelector('#player-mount');
const status = document.querySelector('#player-status');
const photoCredit = document.querySelector('#photo-credit');
const closeButton = document.querySelector('#close-player');
const twitchLink = document.querySelector('#watch-button');
const playButton = document.createElement('button');
playButton.type = 'button';
playButton.className = 'watch-button';
playButton.id = 'play-stream';
playButton.setAttribute('aria-controls', 'player-mount');
playButton.innerHTML = '<span class="play-symbol" aria-hidden="true">▶</span> Watch stream';

function closePlayer(restoreFocus = false) {
  mount.replaceChildren();
  mount.hidden = true;
  closeButton.hidden = true;
  photoCredit.hidden = false;
  stage.classList.remove('is-playing');
  status.textContent = 'Player closed.';
  if (restoreFocus) {
    (playButton.isConnected ? playButton : twitchLink).focus();
  }
}

// Twitch requires a 400 × 300 pixel player. Keep a working direct link below
// that width, including when the browser is resized during playback.
function syncPlayerSize() {
  const canEmbed = stage.clientWidth >= 400 && /^https?:$/.test(location.protocol);
  if (canEmbed) {
    if (twitchLink.isConnected) twitchLink.replaceWith(playButton);
  } else {
    const hadPlayerFocus = mount.contains(document.activeElement) || document.activeElement === closeButton;
    if (playButton.isConnected) playButton.replaceWith(twitchLink);
    if (mount.childElementCount) closePlayer(hadPlayerFocus);
  }
}

playButton.addEventListener('click', () => {
  if (stage.clientWidth < 400) { syncPlayerSize(); return; }
  const player = document.createElement('iframe');
  const url = new URL('https://player.twitch.tv/');
  url.search = new URLSearchParams({
    channel,
    parent: location.hostname,
    autoplay: 'true',
    muted: 'false'
  }).toString();
  player.src = url.href;
  player.title = "dav1n's Twitch stream";
  player.allow = 'autoplay; fullscreen; picture-in-picture';
  player.allowFullscreen = true;
  player.referrerPolicy = 'strict-origin-when-cross-origin';
  mount.replaceChildren(player);
  mount.hidden = false;
  closeButton.hidden = false;
  photoCredit.hidden = true;
  stage.classList.add('is-playing');
  status.textContent = 'Twitch player opened. You can also use the Open Twitch link.';
  player.focus();
});

closeButton.addEventListener('click', () => closePlayer(true));
syncPlayerSize();
if ('ResizeObserver' in window) new ResizeObserver(syncPlayerSize).observe(stage);
else window.addEventListener('resize', syncPlayerSize);

const copyButton = document.querySelector('#copy-email');
const copyStatus = document.querySelector('#copy-status');
if (navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
      copyStatus.textContent = 'Email copied.';
    } catch {
      copyStatus.textContent = 'Couldn’t copy. You can select the email above.';
    }
  });
}
