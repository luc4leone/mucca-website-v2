/* Interruttore di lingua per un blocco di contenuto bilingue.

   Progressive enhancement: il bottone lo crea questo script, quindi senza
   JS non compare un controllo che non funziona — resta visibile l'italiano,
   che è la lingua di default del blocco.

   Markup atteso: un contenitore con `data-lang-toggle`, dentro cui ogni
   variante porta `lang` (per gli screen reader e per la sillabazione) e
   `data-lang` con lo stesso valore. `data-lang` esiste separato da `lang`
   perché la selezione deve prendere solo le varianti di questo blocco: un
   `lang` annidato per altri motivi (una citazione in inglese nel corpo)
   non deve finire nello scambio. Le varianti non predefinite partono
   `hidden` nel markup, così non lampeggiano prima che lo script parta.

   L'etichetta del bottone è la lingua verso cui si va, non quella corrente. */

document.querySelectorAll('[data-lang-toggle]').forEach((block) => {
  const variants = block.querySelectorAll('[data-lang]');
  if (!variants.length) return;

  const target = block.querySelector('ol, ul, div, p');
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'c-lang-toggle';

  if (target) {
    if (!target.id) target.id = 'lang-block-' + Math.random().toString(36).slice(2, 8);
    button.setAttribute('aria-controls', target.id);
  }

  const labels = {
    it: { next: 'English', lang: 'en', hint: 'Mostra in inglese' },
    en: { next: 'Italiano', lang: 'it', hint: 'Mostra in italiano' },
  };

  let current = block.dataset.langToggle || 'it';

  const render = () => {
    variants.forEach((el) => {
      el.hidden = el.dataset.lang !== current;
    });
    const label = labels[current];
    button.textContent = label.next;
    button.lang = label.lang;
    button.setAttribute('aria-label', label.hint);
  };

  button.addEventListener('click', () => {
    current = current === 'it' ? 'en' : 'it';
    render();
  });

  block.insertBefore(button, block.firstChild);
  render();
});
