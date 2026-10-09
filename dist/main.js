'use strict';

const email = 'business@dav1n.com';
const stage = document.querySelector('#stream-stage');
const cover = document.querySelector('#stream-cover');
const mount = document.querySelector('#player-mount');
const status = document.querySelector('#player-status');
const closeButton = document.querySelector('#close-player');
let opener = null;

// Each Twitch link gets a matching button that plays the channel on the page.
const controls = [...document.querySelectorAll('.watch-button[data-channel]')].map((link) => {
  const button = document.createElement('button');
  const label = document.createElement('span');
  button.type = 'button';
  button.className = link.className;
  button.setAttribute('aria-controls', 'player-mount');
  label.textContent = link.dataset.playLabel;
  button.append(link.querySelector('svg').cloneNode(true), label);
  return { link, button, channel: link.dataset.channel, title: link.dataset.title };
});

function current(control) {
  return control.button.isConnected ? control.button : control.link;
}

function closePlayer(restoreFocus = false) {
  mount.replaceChildren();
  mount.hidden = true;
  closeButton.hidden = true;
  stage.classList.remove('is-playing');
  status.textContent = 'Player closed.';
  if (restoreFocus && opener) current(opener).focus();
}

function openPlayer(control) {
  if (stage.clientWidth < 400) { syncPlayerSize(); return; }
  const player = document.createElement('iframe');
  const url = new URL('https://player.twitch.tv/');
  url.search = new URLSearchParams({
    channel: control.channel,
    parent: location.hostname,
    autoplay: 'true',
    muted: 'false'
  }).toString();
  player.src = url.href;
  player.title = control.title;
  player.allow = 'autoplay; fullscreen; picture-in-picture';
  player.allowFullscreen = true;
  player.referrerPolicy = 'strict-origin-when-cross-origin';
  opener = control;
  mount.replaceChildren(player);
  mount.hidden = false;
  closeButton.hidden = false;
  stage.classList.add('is-playing');
  status.textContent = 'Twitch player opened.';
  player.focus();
}

// Twitch requires a 400 × 300 pixel player. Below that width the controls stay
// links to Twitch, including when the browser is resized during playback.
function syncPlayerSize() {
  const canEmbed = stage.clientWidth >= 400 && /^https?:$/.test(location.protocol);
  const hadPlayerFocus = mount.contains(document.activeElement) || document.activeElement === closeButton;
  for (const { link, button } of controls) {
    const from = canEmbed ? link : button;
    const to = canEmbed ? button : link;
    if (!from.isConnected) continue;
    const hadFocus = document.activeElement === from;
    from.replaceWith(to);
    if (hadFocus) to.focus();
  }
  if (!canEmbed && mount.childElementCount) closePlayer(hadPlayerFocus);
}

for (const control of controls) {
  control.button.addEventListener('click', () => openPlayer(control));
}
closeButton.addEventListener('click', () => closePlayer(true));

// The whole photo starts the main stream, not just the button on it.
cover.addEventListener('click', (event) => {
  if (event.target.closest('a, button')) return;
  current(controls[0]).click();
});

syncPlayerSize();
if ('ResizeObserver' in window) new ResizeObserver(syncPlayerSize).observe(stage);
else window.addEventListener('resize', syncPlayerSize);

const copyButton = document.querySelector('#copy-email');
const copyStatus = document.querySelector('#copy-status');
let copyReset;
if (navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    clearTimeout(copyReset);
    try {
      await navigator.clipboard.writeText(email);
      copyButton.textContent = 'Copied';
      copyStatus.textContent = 'Email copied.';
    } catch {
      copyButton.textContent = 'Copy failed';
      copyStatus.textContent = 'Couldn’t copy. Select the email to copy it instead.';
    }
    copyReset = setTimeout(() => {
      copyButton.textContent = 'Copy email';
      copyStatus.textContent = '';
    }, 2500);
  });
}
