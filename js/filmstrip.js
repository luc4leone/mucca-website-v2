/* Navigazione e didascalia di una `.c-filmstrip`.

   Due cose, che stanno insieme perché guardano lo stesso stato — quale
   immagine si sta guardando:

   - una riga sola sotto la strip che descrive l'immagine più a sinistra
     fra quelle visibili (autore, progetto, corso), col conteggio in coda;
   - due bottoni ← → nella stessa riga, che spostano di un'immagine.

   I bottoni esistono perché «scorri o usa ← →» era un'istruzione che col
   mouse non si poteva seguire: le frecce funzionano solo se la strip ha
   il focus, e per dargliela bisognava premere Tab — cliccare sopra apre
   il link dell'immagine. Un controllo annunciato e non raggiungibile.

   Il metadato sta in `data-caption` su ogni link della strip.

   Progressive enhancement: la riga è già scritta nell'HTML con la
   didascalia della prima immagine, quindi senza JS resta quella — non
   sparisce e non appare un contenitore vuoto. Il conteggio invece è
   marcato `hidden` nel markup e lo scopre questo script: senza JS direbbe
   sempre «1 di 4» mentre guardi la terza. I bottoni li crea lo script per
   lo stesso motivo, come in `js/lang-toggle.js`: senza JS non compare un
   controllo morto.

   Il credito completo sta anche nell'`alt` di ogni immagine: chi non
   vede la pagina non deve scorrere per sapere di chi è il lavoro. */

(function () {
  var strips = document.querySelectorAll('[data-filmstrip]');
  if (!strips.length) return;

  strips.forEach(function (strip) {
    var slides = strip.querySelectorAll('[data-caption]');
    var box = document.querySelector('[data-filmstrip-caption="' + strip.dataset.filmstrip + '"]');
    if (!box || slides.length < 2) return;

    var text = box.querySelector('[data-caption-text]');
    var count = box.querySelector('[data-caption-count]');
    if (count) count.hidden = false;

    var shown = -1;
    var pending = false;

    /* Quanto si può ancora scorrere. Se è zero la strip ci sta tutta
       nella colonna: niente bottoni, e il fine corsa coincide con
       l'inizio. Si ricalcola a ogni giro perché cambia col resize. */
    function maxScroll() {
      return strip.scrollWidth - strip.clientWidth;
    }

    /* L'immagine "corrente" è la prima non ancora uscita dal bordo
       sinistro: con due o tre immagini in vista è quella che si legge
       per prima. La tolleranza di 8px evita che un arrotondamento di
       subpixel faccia scattare la didascalia un attimo prima.

       Il caso a parte è il fine corsa. L'ultima immagine è in vista ma
       non diventa mai la più a sinistra: lo scroll che resta è minore
       della larghezza di quella prima, quindi quella prima non esce mai
       dal bordo e si tiene la didascalia. Con quattro immagini nella
       prima strip lo scroll massimo è ~1120px mentre l'ultima comincia
       a ~1280px — la sua didascalia non sarebbe comparsa mai. Arrivati
       in fondo si mostra l'ultima, che è la sola interamente visibile.
       Il controllo su `max` serve per le strip che non scorrono affatto
       (una sola immagine, o schermo largo): lì il fondo coincide con
       l'inizio e la regola normale è già quella giusta. */
    function currentIndex() {
      var max = maxScroll();
      if (max > 2 && strip.scrollLeft >= max - 2) return slides.length - 1;

      var left = strip.getBoundingClientRect().left;
      for (var i = 0; i < slides.length; i++) {
        if (slides[i].getBoundingClientRect().right > left + 8) return i;
      }
      return slides.length - 1;
    }

    /* Lo scroll morbido e lo snap non vanno d'accordo: con
       `scroll-snap-type: x mandatory` addosso, uno `scrollTo` con
       `behavior: 'smooth'` parte e viene riportato indietro al punto di
       partenza — misurato, non temuto. Si toglie lo snap per la durata
       dell'animazione e lo si rimette quando è finita: rimettendolo, il
       browser aggancia da sé il punto di snap più vicino, che è proprio
       l'inizio dell'immagine dove volevamo arrivare.

       `scrollend` è l'evento giusto perché scatta quando lo scroll si è
       davvero fermato; il timer è la rete per i browser che non lo
       implementano, se no lo snap resterebbe spento. */
    var snapTimer;

    function restoreSnap() {
      strip.style.scrollSnapType = '';
      strip.removeEventListener('scrollend', restoreSnap);
      clearTimeout(snapTimer);
    }

    /* Porta l'immagine `i` a inizio riga. Il clamp non è una cautela di
       troppo: le ultime immagini NON possono essere portate a inizio
       riga, perché lo scroll finisce prima — è lo stesso motivo per cui
       `currentIndex` ha il caso di fine corsa. Chiedere l'ultima quindi
       porta a fondo corsa, e la didascalia la legge comunque giusta. */
    function goTo(i) {
      if (i < 0 || i >= slides.length) return;
      var delta = slides[i].getBoundingClientRect().left - strip.getBoundingClientRect().left;
      var left = Math.max(0, Math.min(strip.scrollLeft + delta, maxScroll()));

      /* Chi ha chiesto meno animazioni salta di netto: niente da
         disinnescare, lo snap con uno scroll istantaneo funziona. */
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        strip.scrollTo({ left: left });
        return;
      }

      strip.style.scrollSnapType = 'none';

      /* Lettura che forza il ricalcolo dello stile. Senza, lo snap viene
         tolto e lo scroll morbido parte nello stesso task: il browser
         non ha ancora applicato la regola nuova e riporta indietro
         l'animazione esattamente come prima. Una riga che sembra inutile
         e non lo è. */
      void strip.offsetWidth;

      strip.addEventListener('scrollend', restoreSnap);
      clearTimeout(snapTimer);
      snapTimer = setTimeout(restoreSnap, 800);
      strip.scrollTo({ left: left, behavior: 'smooth' });
    }

    var nav = document.createElement('div');
    nav.className = 'c-filmstrip__nav';

    function makeButton(label, symbol, step) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'c-filmstrip__button';
      b.textContent = symbol;
      b.setAttribute('aria-label', label);
      b.addEventListener('click', function () {
        goTo(currentIndex() + step);
      });
      nav.appendChild(b);
      return b;
    }

    var prev = makeButton('Immagine precedente', '←', -1);
    var next = makeButton('Immagine successiva', '→', 1);
    box.appendChild(nav);

    function update() {
      pending = false;

      /* I bottoni servono solo se c'è qualcosa da scorrere. Su schermo
         molto largo la strip può starci tutta: allora spariscono, e
         ricompaiono se la finestra si stringe. */
      var max = maxScroll();
      nav.hidden = max <= 2;
      prev.disabled = strip.scrollLeft <= 2;
      next.disabled = strip.scrollLeft >= max - 2;

      var i = currentIndex();
      if (i === shown) return;
      shown = i;
      if (text) text.textContent = slides[i].dataset.caption;
      if (count) count.textContent = (i + 1) + ' di ' + slides.length;
    }

    function schedule() {
      if (pending) return;
      pending = true;
      requestAnimationFrame(update);
    }

    strip.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
  });
})();
