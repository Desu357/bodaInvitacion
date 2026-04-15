/**
 * CONFIGURACIÓN DEL CONTADOR
 * Objetivo: 7 de Noviembre de 2026
 */
simplyCountdown(".simply-countdown", {
  year: 2026, // Año de tu boda
  month: 11,  // Noviembre
  day: 7,     // Día
  hours: 12,  // Hora del evento (formato 24h)
  words: {
    days: { singular: "día", plural: "días" },
    hours: { singular: "hora", plural: "horas" },
    minutes: { singular: "minuto", plural: "minutos" },
    seconds: { singular: "segundo", plural: "segundos" },
  },
  plural: true,
  inline: false,
  enableUtc: false, // Cambia a true si quieres usar hora UTC
});

/**
 * CONTROL DE SCROLL Y AUDIO
 */
const rootElement = document.querySelector(":root");
const audioIconWrapper = document.querySelector(".audio-icon-wrapper");
const audioIcon = document.querySelector(".audio-icon-wrapper i");
const song = document.querySelector("#song");
let isPlaying = false;

function disableScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scrollTop, scrollLeft);
  };

  rootElement.style.scrollBehavior = "auto";
}

function enableScroll() {
  window.onscroll = function () {};
  rootElement.style.scrollBehavior = "smooth";
  playAudio();
}

function playAudio() {
  song.volume = 0.2; // Un poco más alto para que se aprecie
  audioIconWrapper.style.display = "flex";
  song.play();
  isPlaying = true;
}

audioIconWrapper.onclick = function () {
  if (isPlaying) {
    song.pause();
    audioIcon.classList.remove("bi-disc");
    audioIcon.classList.add("bi-pause-circle");
  } else {
    song.play();
    audioIcon.classList.add("bi-disc");
    audioIcon.classList.remove("bi-pause-circle");
  }
  isPlaying = !isPlaying;
};

// Bloquear scroll al cargar la página
disableScroll();

/**
 * REPARACIÓN DE NAVBAR (OFFCANVAS)
 */
const stickyTop = document.querySelector(".sticky-top");
const offcanvas = document.querySelector(".offcanvas");

offcanvas.addEventListener("show.bs.offcanvas", function () {
stickyTop.style.overflow = "visible";
});

offcanvas.addEventListener("hidden.bs.offcanvas", function () {
stickyTop.style.overflow = "hidden";
});

/**
 * ENVÍO DE FORMULARIO RSVP (GOOGLE SHEETS)
 */
window.addEventListener("load", function () {
const form = document.getElementById("my-form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;

    // Cambiamos el texto del botón mientras envía
    const submitButton = form.querySelector("button");
    const originalText = submitButton.innerText;
    submitButton.innerText = "Enviando...";
    submitButton.disabled = true;

    fetch(action, {
      method: "POST",
      body: data,
    }).then(() => {
      alert("¡Confirmación enviada con éxito! Te esperamos.");
      form.reset();
      submitButton.innerText = originalText;
      submitButton.disabled = false;
    });
  });
});