/* Porta in vista il pannello di `.c-message-widget` quando si apre.

   Il widget sta in fondo alla pagina: aperto, il form nasce quasi tutto
   sotto la viewport e chi ha appena cliccato "Lascia un messaggio" vede
   comparire un bordo e basta. Lo spazio per scorrere c'è — lo crea il
   pannello stesso, che allunga la pagina — ma il browser non lo usa da
   sé, perché il <details> non sposta il focus e la scrollata la deve
   chiedere qualcuno.

   Progressive enhancement: senza JS il <details> si apre lo stesso, il
   form funziona ed è raggiungibile scorrendo. Questo script toglie lo
   scorrimento a mano, non abilita il widget. */

(function () {
  var widgets = document.querySelectorAll('.c-message-widget');
  if (!widgets.length) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  Array.prototype.forEach.call(widgets, function (widget) {
    widget.addEventListener('toggle', function () {
      if (!widget.open) return;

      var panel = widget.querySelector('.c-message-widget__panel');
      if (!panel) return;

      /* Già tutto visibile (schermo alto, widget non in fondo): fermi.
         Una scrollata non richiesta è più fastidiosa di nessuna. */
      if (panel.getBoundingClientRect().bottom <= window.innerHeight) return;

      panel.scrollIntoView({
        behavior: reduced.matches ? 'auto' : 'smooth',
        block: 'end'
      });
    });
  });
})();
