// ── Countdown a 7 de noviembre 2026, 15:00 ──
function updateCountdown() {
  const target = new Date('2026-11-07T15:00:00');
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '000';
    return;
  }

  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs  = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent  = String(days).padStart(3, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-mins').textContent  = String(mins).padStart(2, '0');
  document.getElementById('cd-secs').textContent  = String(secs).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ── Scroll lock ──
const rootEl = document.documentElement;
function disableScroll() {
  const scrollTop  = window.pageYOffset;
  const scrollLeft = window.pageXOffset;
  window.onscroll = () => window.scrollTo(scrollLeft, scrollTop);
  rootEl.style.scrollBehavior = 'auto';
}
function enableScroll() {
  window.onscroll = null;
  rootEl.style.scrollBehavior = 'smooth';
  playAudio();
}
disableScroll();

// ── Audio ──
const audioWrapper = document.querySelector('.audio-icon-wrapper');
const audioIcon    = audioWrapper.querySelector('i');
const song         = document.getElementById('song');
let isPlaying = false;

function playAudio() {
  song.volume = 0.1;
  audioWrapper.style.display = 'flex';
  song.play();
  isPlaying = true;
}

audioWrapper.onclick = () => {
  if (isPlaying) {
    song.pause();
    audioIcon.className = 'bi bi-pause-circle';
  } else {
    song.play();
    audioIcon.className = 'bi bi-disc';
  }
  isPlaying = !isPlaying;
};

// ── Offcanvas overflow fix ──
const stickyNav = document.querySelector('.sticky-top');
const offcanvas  = document.querySelector('.offcanvas');
if(offcanvas && stickyNav) {
  offcanvas.addEventListener('show.bs.offcanvas',   () => stickyNav.style.overflow = 'visible');
  offcanvas.addEventListener('hidden.bs.offcanvas', () => stickyNav.style.overflow = 'hidden');
}