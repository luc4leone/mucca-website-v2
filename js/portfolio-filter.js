/* Filtro per tag del portfolio. Progressive enhancement: senza JS i tag
   sono link a ?tag=… che ricaricano la pagina e questo stesso script
   applica il filtro al caricamento. Il click intercetta solo per evitare
   il reload. */
(function () {
  var projects = document.querySelectorAll('.c-project');
  var sections = document.querySelectorAll('.l-page > section');
  var filterLinks = document.querySelectorAll('.c-tag-filter a');
  var empty = document.querySelector('.c-tag-filter__empty');

  function currentTag() {
    return new URLSearchParams(location.search).get('tag') || '';
  }

  function apply(tag) {
    var visible = 0;
    projects.forEach(function (p) {
      var tags = (p.dataset.tags || '').split(' ');
      var hide = !!tag && tags.indexOf(tag) === -1;
      p.hidden = hide;
      if (!hide) visible++;
    });
    sections.forEach(function (s) {
      s.hidden = !s.querySelector('.c-project:not([hidden])');
    });
    filterLinks.forEach(function (a) {
      var linkTag = new URL(a.href).searchParams.get('tag') || '';
      a.setAttribute('aria-pressed', linkTag === tag ? 'true' : 'false');
    });
    if (empty) empty.hidden = visible > 0;
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="?tag="], a[href="?"]');
    if (!a || a.origin !== location.origin) return;
    e.preventDefault();
    var tag = new URL(a.href).searchParams.get('tag') || '';
    var url = location.pathname + (tag ? '?tag=' + tag : '') + location.hash;
    history.replaceState(null, '', url);
    apply(tag);
  });

  apply(currentTag());
})();
