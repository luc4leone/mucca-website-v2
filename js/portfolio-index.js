/* Indice del portfolio: apertura e chiusura delle voci è tutta nativa
   (<details>). Qui restano due cose che il browser non fa da solo.

   1. Deep link. Un <details> chiuso nasconde il suo contenuto, quindi
      portfolio.html#next2 porterebbe alla riga giusta ma chiusa. Il
      link condiviso in una proposta deve aprire il progetto che
      promette — vale al caricamento e a ogni cambio di hash.
   2. "Expand all" / "Collapse all". Il comando esiste solo se il JS
      c'è: un bottone che non fa niente è peggio di un bottone assente,
      quindi lo inserisce lo script invece di stare nel markup.

   Usato da portfolio.html e automations.html. Il nome resta quello del
   primo uso; il codice non sa nulla di progetti, lavora su `.c-entry`.
   Su una pagina senza `.c-section-index` (automations.html, che ha una
   voce sola) si ferma dopo i deep link e non inserisce il bottone: un
   "expand all 1 projects" non serve a nessuno. */
(function () {
  var entries = Array.prototype.slice.call(document.querySelectorAll('.c-entry'));
  if (!entries.length) return;

  /* --- deep link ---------------------------------------------------- */

  function openFromHash(scroll) {
    if (!location.hash) return;
    var el = document.getElementById(location.hash.slice(1));
    if (!el || !el.classList.contains('c-entry')) return;
    el.open = true;
    if (scroll) el.scrollIntoView();
  }

  /* Al caricamento il browser ha già provato a saltare all'ancora
     trovandola chiusa: va rifatto dopo l'apertura. */
  openFromHash(true);
  window.addEventListener('hashchange', function () { openFromHash(true); });

  /* --- expand all --------------------------------------------------- */

  var nav = document.querySelector('.c-section-index');
  if (!nav) return;

  var toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'c-entry-list__toggle';
  toggle.setAttribute('aria-expanded', 'false');

  function label() {
    var open = entries.filter(function (e) { return e.open; }).length;
    var allOpen = open === entries.length;
    toggle.setAttribute('aria-expanded', allOpen ? 'true' : 'false');
    toggle.textContent = allOpen
      ? 'Collapse all ' + entries.length + ' projects'
      : 'Expand all ' + entries.length + ' projects';
  }

  toggle.addEventListener('click', function () {
    var allOpen = entries.every(function (e) { return e.open; });
    entries.forEach(function (e) { e.open = !allOpen; });
    label();
  });

  entries.forEach(function (e) {
    e.addEventListener('toggle', label);
  });

  label();
  nav.parentNode.appendChild(toggle);
})();
