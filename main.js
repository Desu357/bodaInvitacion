/* ═══════════════════════════════════════
   main.js — Invitación de Boda
═══════════════════════════════════════ */

// ── Referencias a elementos del DOM ──────────────────────────────────────────
const rootEl       = document.documentElement;
const stickyNav    = document.querySelector('.sticky-top');
const offcanvas    = document.querySelector('.offcanvas');
const audioWrapper = document.querySelector('.audio-icon-wrapper');
const audioIcon    = audioWrapper.querySelector('i');
const song         = document.getElementById('song');
const btnVerInv    = document.getElementById('btn-ver-invitacion');

let isPlaying = false;

// ── COUNTDOWN ─────────────────────────────────────────────────────────────────
/**
 * Calcula la diferencia entre ahora y la fecha de la boda
 * y actualiza los elementos del countdown en el DOM.
 */
function updateCountdown() {
  const target = new Date('2026-11-07T15:00:00');
  const now    = new Date();
  const diff   = target - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent  = '000';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent  = '00';
    document.getElementById('cd-secs').textContent  = '00';
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

// Ejecutar inmediatamente y luego cada segundo
updateCountdown();
setInterval(updateCountdown, 1000);

// ── SCROLL LOCK ───────────────────────────────────────────────────────────────
/**
 * Bloquea el scroll de la página (usado en la pantalla Hero inicial).
 */
function disableScroll() {
  const scrollTop  = window.pageYOffset;
  const scrollLeft = window.pageXOffset;
  window.onscroll = () => window.scrollTo(scrollLeft, scrollTop);
  rootEl.style.scrollBehavior = 'auto';
}

/**
 * Desbloquea el scroll y arranca la música.
 * Se llama al hacer clic en "Ver la invitación".
 */
function enableScroll() {
  window.onscroll = null;
  rootEl.style.scrollBehavior = 'smooth';
  playAudio();
}

// Bloquear scroll al cargar la página
disableScroll();

// Enlazar el botón del hero
btnVerInv.addEventListener('click', enableScroll);

// ── AUDIO ─────────────────────────────────────────────────────────────────────
/**
 * Inicia la reproducción del audio y muestra el botón flotante.
 */
function playAudio() {
  song.volume = 0.1;
  audioWrapper.style.display = 'flex';
  song.play();
  isPlaying = true;
}

/**
 * Alterna entre play y pause al hacer clic en el ícono de audio.
 */
audioWrapper.addEventListener('click', () => {
  if (isPlaying) {
    song.pause();
    audioIcon.className = 'bi bi-pause-circle';
  } else {
    song.play();
    audioIcon.className = 'bi bi-disc';
  }
  isPlaying = !isPlaying;
});

// ── NAVBAR OFFCANVAS — FIX DE OVERFLOW ───────────────────────────────────────
/**
 * Cuando el offcanvas se abre, el navbar sticky necesita overflow:visible
 * para que el panel no quede recortado. Se restaura al cerrarse.
 */
offcanvas.addEventListener('show.bs.offcanvas',   () => stickyNav.style.overflow = 'visible');
offcanvas.addEventListener('hidden.bs.offcanvas', () => stickyNav.style.overflow = 'hidden');