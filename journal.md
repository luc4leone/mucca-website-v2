# Journal

Log delle scelte fatte e da fare sul progetto. A differenza di `CLAUDE.md` (istruzioni operative per Claude), questo file serve a tenere traccia per l'utente del percorso e delle motivazioni dietro le decisioni.

## 2026-07-23 — Struttura file e cartelle (proposta, non ancora creata)

**Stato:** proposta in attesa di conferma. Non ancora messa in piedi nel repo.

### Struttura suggerita

```
muccaWebsiteV2/
├── index.html
├── css/
│   ├── tokens.css
│   ├── base.css
│   ├── components/
│   │   ├── button.css
│   │   ├── card.css
│   │   ├── accordion.css
│   │   └── ...
│   └── layout.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   ├── fonts/
│   └── logo/
├── content.md
├── CLAUDE.md
├── design-system.md
├── componenti.md
├── spiega-worktree.md
└── spiega-worktree-conversazione.md
```

*(struttura CSS aggiornata il 2026-07-23, vedi entry sotto — la versione precedente con `css/sections/` è superata)*

### Motivazioni

- **`index.html` unico**: la struttura pagina (single-page vs multi-pagina) non è ancora decisa. Single-page è il punto di partenza più semplice — meno attrito, nessuna navigazione da gestire. Si splitta dopo, se serve.
- **CSS organizzato per componenti, non per sezione**: i componenti riusabili sono l'unità vera (vedi `design-system.md`). Le sezioni della pagina sono composizioni di componenti dentro `layout.css`, non un'unità di stile a sé.
- **`js/main.js` unico**: senza build step, un solo file evita la gestione manuale di più `<script>` e ordine di caricamento. Si splitta solo se diventa davvero necessario.
- **`assets/` con sottocartelle per tipo**: logo, font e parte delle immagini sono già disponibili — la cartella è pronta a riceverli man mano, senza doverla riorganizzare dopo.

### Import CSS senza build step

```css
@import url("tokens.css");
@import url("base.css");
@import url("components/button.css");
@import url("layout.css");
```

Nessun tool richiesto. Se in futuro pesa sulle performance (più richieste HTTP), si passa a un unico file concatenato a mano.

### Prossimo passo

Decidere se procedere con questa struttura (o modificarla) prima di crearla nel repo.

## 2026-07-23 — Decisioni sul contenitore (design system)

**Stato:** deciso.

Concordate le convenzioni su variabili di tema, naming componenti e interfaccia dei componenti. Dettagli in `design-system.md`.

## 2026-07-23 — Revisione: CSS per componenti, non per sezione

**Stato:** deciso, sostituisce la struttura CSS proposta nell'entry precedente su file/cartelle.

La motivazione originale ("file CSS separati per sezione aiutano a iterare con worktree") era debole: il worktree isola già l'intera cartella del progetto, non un singolo file — quindi non serviva splittare per sezione per ottenere quel vantaggio. Il vero criterio è la riusabilità: componenti in `css/components/`, composizione delle sezioni in `layout.css`. Dettagli in `design-system.md`.

Aggiunte nella stessa sessione (dettagli in `design-system.md`):

- Breakpoint: mobile-first, singolo, 768px — non è una variabile CSS (non funziona dentro `@media`), è una costante documentata da ripetere letteralmente.
- Scala tipografica fissa in px (12–72), naming `--font-size-<valore>`.
- Scala z-index (`--z-base` … `--z-toast`).
- Icone: si usa il set `assets/Icons_v1.0.2` (Refactoring UI Icons), SVG inline, colore via `.primary`/`.secondary` agganciati ai token di tema.
- Stati di interazione componenti: pseudo-classi native, `.is-`/`.has-` solo per stati pilotati da JS.
- Accessibilità di base: focus visibile, `prefers-reduced-motion`, contrasto WCAG AA, HTML semantico.
- Dark mode: fuori scope, scelta esplicita.

## 2026-07-24 — Rinominato theme.css → tokens.css

**Stato:** deciso e applicato.

Il file contiene tutti i token (primitive, semantiche, tipografia, spaziatura, z-index), non solo la sezione semantica che determina l'identità visiva — "theme" descriveva solo una parte del contenuto. Rinominato in tutta la documentazione (`design-system.md`, `spiega-worktree.md`, `spiega-worktree-conversazione.md`).

Creato `css/tokens.css` con i token già decisi (scala tipografica, scala z-index). Colori, spaziatura, radius, ombre, transizioni e font-family/weight/line-height restano da definire — segnati come commenti nel file.

## 2026-07-24 — Token: spaziatura/dimensioni, colori (primitive + semantiche)

**Stato:** deciso e applicato in `css/tokens.css`.

- Scala spaziatura e dimensioni: 27 valori (6px–780px), naming `--space-<valore>` — stessa scala usata sia per spacing (margin/padding/gap) sia per sizing (larghezze, altezze, icone).
- Primitive colore: scala di grigio neutro **zinc** (Tailwind, 11 step) + 5 colori brand (`midnight-violet`, `hot-pink-web`, `celadon`, `apricot-cream`, `cinnamon-wood`).
- Semantiche colore definite con criterio di **minimalismo estetico**: base neutra zinc per sfondo/testo/bordi, `hot-pink-web` come unico accento primario, `midnight-violet` come secondario, `cinnamon-wood` come accento limitato (contrasto al limite della soglia AA con testo piccolo — solo per elementi grandi/decorativi). `celadon` e `apricot-cream` non mappate, restano riserva per iterazioni future.
- Aggiunte `--color-on-primary`/`--color-on-secondary`: mancavano rispetto al pattern già descritto in `design-system.md` (`--button-fg: var(--color-on-primary)`).

Dettagli e motivazioni in `design-system.md`.

## 2026-07-24 — Font: Lora

**Stato:** deciso e applicato.

- Un solo font, **Lora** (variable, asse `wght` 400–700), fallback `serif`. File in `assets/Lora/`.
- `@font-face` in `css/tokens.css` (upright + italic), TTF variable direttamente, niente build step per convertirlo.
- Scala font-weight: `--font-weight-400/500/600/700` — i pesi statici realmente inclusi nel font, non valori intermedi arbitrari.
- Scala line-height: `--line-height-tight` (1.1) / `--line-height-normal` (1.5) / `--line-height-relaxed` (1.7) — naming per fascia d'uso invece che per valore, perché i rapporti con decimali non si prestano al suffisso numerico usato altrove.

Dettagli in `design-system.md`.

## 2026-07-24 — Organizzazione repo: assets, git tracking, .gitignore

**Stato:** fatto.

- `Icons_v1.0.2` spostato in `assets/Icons_v1.0.2` — coerente con `Lora/` già dentro `assets/`.
- Corretto il tracking git: `spiega-worktree.md` e `spiega-worktree-conversazione.md` erano stati spostati manualmente in `spiega/` senza `git mv` — git li vedeva come cancellati anziché rinominati. Ora riconosciuti correttamente come rename.
- Messi in stage tutti i file legittimi non ancora tracciati (`assets/`, `css/`, `design-system.md`, `journal.md`, `container.md`, `CLAUDE.md` modificato). Nessun commit effettuato.
- Creato `.gitignore` con `.DS_Store`.

## 2026-07-24 — Token: radius, ombre, transizioni, focus, e completamento

**Stato:** deciso e applicato in `css/tokens.css`.

Prima passata: radius (`--radius-4/8/12/16/full`), ombre (`--shadow-sm/md/lg`, tinte di zinc-900), transizioni (durata `--duration-150/250/400` + easing `--ease-out`/`--ease-in-out`), focus (`--focus-ring-color/width/offset`, agganciato a `--color-secondary`, verificato per contrasto).

Seconda passata, colmati altri gap emersi rileggendo il sistema:

- `--container-max-width: 1080px` — valore già deciso in `container.md`, mancava come token.
- `--color-overlay` — sfondo dietro modale/lead-magnet, collegato a `--z-overlay`/`--z-modal` già esistenti.
- `--color-success`/`--color-on-success` (celadon, prima primitiva non mappata a trovare uso) e `--color-error`/`--color-on-error` (nuova primitiva `--red-600`, unica fuori dalla palette originale — un colore funzionale come l'errore deve restare riconoscibile a prescindere dal brand).
- `--border-width-1/2` e `--letter-spacing-tight/normal/wide`.

Lasciati **come promemoria, non token**: opacity scale (rimandata finché non serve un componente disabled reale) e aspect-ratio (dubbio se sia davvero un token o un valore per-istanza, dato che il rapporto giusto dipende spesso dal contenuto). Il grid split 30/70 di `container.md` resta layout, non token.

Dettagli in `design-system.md`.

## 2026-07-24 — Regola: design-system.md documenta scelte, non scale

**Stato:** deciso e applicato.

`design-system.md` conteneva interi blocchi CSS che duplicavano le scale già in `css/tokens.css` (l'elenco completo di zinc, font-size, space, ecc.). Ridondante e destinato a disallinearsi ogni volta che `tokens.css` cambia. Riscritto per contenere solo scelte, principi, motivazioni e naming — le scale di valori si leggono in `tokens.css`. Un token compare nel file solo come esempio isolato per spiegare un concetto (es. `--blue-600` per illustrare primitive/semantiche), mai come elenco completo.

## 2026-07-28 — Workflow: galleria permanente per varianti estetiche dei componenti

**Stato:** deciso e applicato.

Per iterare varianti puramente estetiche di un componente (stessa markup, CSS diverso), niente file temporaneo da cancellare a scelta fatta — le varianti restano tutte visibili per sempre. Creato `componenti.html`: galleria visiva permanente, parallela a `componenti.md` (stesso schema di naming di `content.md`/`content.html`). Ogni variante esplorata resta lì, etichettata (es. "attuale in produzione" vs scartata) — stesso principio già adottato per i branch git scartati (mai cancellati, restano come riferimento).

Chiarito anche un caso limite in `design-system.md`: una variante può essere "solo estetica" (stessa markup, nessun DOM diverso) ma richiedere comunque un `data-variant` invece di semplici variabili, quando le regole CSS necessarie sono incompatibili tra loro (es. numero come barra vs pallino che sborda dall'angolo) — non solo valori diversi delle stesse proprietà.

Primo caso reale: `.c-step-card`, 4 varianti (`bar`, `badge` — da sketch dell'utente — più `outline` e `ghost`, proposte da Claude), documentate in `componenti.md` e visibili in `componenti.html#step-card`.

**Aggiornamento stesso giorno**: scelta la variante `ghost` per la produzione (`content.html`, sezione "Le soluzioni che offre questo corso"). La variante di default precedente (numero in angolo, nessun attributo) resta in `componenti.html` come riferimento, rinominata informalmente "corner" nella documentazione — non cancellata, coerente col principio appena stabilito.

## 2026-07-28 — Default di `.c-button` cambiato a celadon

**Stato:** deciso e applicato.

Il bottone "Iscriviti ora" (mini corso gratis) era stato colorato celadon come override per-istanza, in attesa di decidere se estenderlo al componente. Ora deciso: `--button-bg` di default in `css/components/button.css` è `var(--celadon)`, non più `var(--color-primary)`. Rimosso l'override ridondante su "Iscriviti ora"; "Prenota il tuo posto" (ammissione) eredita il nuovo default senza bisogno di override. `--button-fg` invariato (zinc-900, contrasto ~10.7:1 su celadon). Aggiornato `componenti.md`.

## 2026-07-29 — Prototipo: pagina portfolio, "molto altro" esce dalla landing

**Stato:** prototipo implementato, da validare.

Discussione su "molto altro" (bio, sezione "Ciao, mi chiamo Luca Leone"): far uscire l'utente dalla landing abbassa la conversione, regola comune — ma è un'euristica contro le distrazioni inutili, non un divieto assoluto quando l'informazione è decisiva per la decisione d'acquisto (vedere il lavoro reale dell'istruttore, per un corso a pagamento, lo è probabilmente). Scartata l'idea di un panel/modale con la lista di screenshot su mobile (pattern scomodo, niente back pulito). Scartato anche `target="_blank"`: buona idea su desktop, meno su mobile — lo switch tab è meno user-friendly, molti browser aprono la tab in background senza una transizione chiara.

Deciso: navigazione normale (stessa tab) verso `portfolio.html`, con un link "torna alla pagina principale" esplicito in cima — più robusto del solo back del browser, perché se l'utente arriva alla pagina da un link condiviso/bookmark non c'è cronologia da cui tornare indietro.

Implementato: `portfolio.html`, layout identico a `content.html` (sidebar/contenuto), griglia `.c-masonry` (CSS multi-column, 1 colonna sotto 768px, 3 colonne sopra) che carica le 56 immagini in `assets/portfolio/` via fetch di `manifest.json` — troppe da scrivere a mano in HTML. Nota: "screenshots UI disegnate all'ultimo master" (indice di `content.md`, sotto "Programma del corso") è una risorsa diversa — screenshot degli studenti, non del lavoro professionale di Luca — non va confusa con questa pagina.

**Aggiornamento stesso giorno — overlay di ingrandimento**: click/tap su uno screenshot lo ingrandisce. Scelto scoped alla colonna contenuto (non full-viewport, sidebar resta visibile), niente prev/next per ora — entrambe scelte esplicite dell'utente per questo primo prototipo, da validare.

Bug trovato e corretto durante il test: il contenitore della griglia è alto quanto tutte le 56 immagini (molto più del viewport) — un overlay `position: absolute; inset: 0` centra l'immagine a metà di quell'altezza, spesso fuori dallo scroll corrente dell'utente. Corretto con `position: fixed` verticalmente (segue sempre il viewport) e `left`/`width` calcolati via JS in base al contenitore, per restare comunque confinato orizzontalmente. Lezione generalizzabile, documentata in `design-system.md` (sezione Z-index) per il prossimo overlay scoped a un contenitore scrollabile.

## 2026-07-30 — Nuovo componente: video facade (lazy-load embed)

**Stato:** implementato, verificato con un video reale.

Aggiunto un video Vimeo (facade cliccabile: thumbnail + play, iframe pesante creato solo al click) sotto "Come insegno?" nella sezione "Ciao, mi chiamo Luca Leone". Markup fornito dall'utente (classi `.video-aspect-ratio`/`.video-facade`/ecc.), rinominato per seguire la convenzione `.c-<nome>` già in uso (`.c-video`, `.c-video__facade`, ecc.). Comportamento click→iframe in `js/video-facade.js` — primo file JS del progetto, cartella `js/` creata solo ora (prima esisteva solo lo script inline di `portfolio.html`).

Bug trovato e corretto durante il test: la `<figcaption>` finiva invisibile, nascosta dietro al video. Causa: avevo messo `aspect-ratio`/`overflow: hidden` direttamente sulla `<figure>` — la figcaption (figlio normale, non posizionato) veniva schiacciata nella stessa box e coperta dal facade (`position: absolute`, che sta sopra elementi non posizionati indipendentemente dallo z-index). Corretto separando un `<div class="c-video__box">` interno che porta `aspect-ratio`/`overflow:hidden`, lasciando la `<figure>` esterna libera di contenere la figcaption come contenuto normale sotto il video. Documentato in `componenti.md`.

Aggiunto anche `figcaption` come stile globale in `base.css` (muted, come `blockquote footer`) — riusabile per didascalie future, non solo video.

## 2026-07-30 — Iterazione: video inline nel bullet, ingrandimento scoped alla colonna

**Stato:** implementato e verificato.

Su richiesta esplicita, prima di procedere ho riformulato la richiesta dell'utente e gliel'ho fatta confermare — comprensione validata prima di scrivere codice, non solo dopo.

Cambiati due aspetti del video facade:

1. **Posizione**: da figure a sé stante sopra la lista, a thumbnail piccola (`--space-216`) inline con float nel primo `<li>` di "Come insegno?" — stesso trattamento già usato per l'avatar di Luca nel paragrafo introduttivo.
2. **Comportamento al click**: non più "iframe sostituisce il facade al suo posto" (restava piccolo). Ora il video si ingrandisce in overlay fino a coprire l'intera colonna contenuto — stesso pattern scoped-al-contenitore già costruito per `.c-masonry-overlay` in `portfolio.html` (`position: fixed` verticale + `left`/`width` via JS). La `figcaption` sparisce quando il video si ingrandisce (conferma esplicita dell'utente) — non è duplicata nell'overlay.

Due bug reali trovati e corretti durante il test:

- **Float non contenuto nel `<li>`**: la figure floatata "sfondava" oltre il primo bullet, sovrapponendosi visivamente ai bullet successivi della lista. I `<li>` non stabiliscono un proprio contesto di formattazione a blocchi di default, quindi un float al loro interno può intromettersi nel flusso dei fratelli successivi. Corretto con `display: flow-root` sul `<li>` specifico — lezione generalizzabile per qualsiasi futuro float dentro un elemento di lista.
- (Riconfermato, stesso bug della sessione precedente) il box `aspect-ratio`/`overflow:hidden` resta un `<div>` interno (`.c-video__box`), mai sulla `<figure>` stessa.

Aggiornato `componenti.md` con markup e comportamento correnti.

## 2026-07-30 — Fix UX: ritardo percepito tra overlay e video visibile

**Stato:** implementato e verificato con video reale.

Problema segnalato dall'utente: al click sul facade, l'overlay appare subito ma il video (iframe Vimeo) impiega un tempo non istantaneo a comparire dentro — box vuoto per un momento, percepito come lag/rottura.

Tre interventi, tutti a costo/complessità basso, nessuna libreria:

1. **Thumbnail e spinner restano visibili finché l'iframe non è pronto**: `js/video-facade.js` ora clona la thumbnail del facade e aggiunge uno spinner dentro il box overlay *prima* di creare l'iframe; l'iframe parte a `opacity: 0` e passa a `opacity: 1` (classe `.is-loaded`, fade con `--duration-250`) solo al suo evento `load`, quando lo spinner viene rimosso. Elimina lo stato "vuoto" — c'è sempre qualcosa di visibile.
2. **`<link rel="preconnect">`** verso `player.vimeo.com`, `i.vimeocdn.com`, `f.vimeocdn.com` in `content.html` — il browser stabilisce la connessione in anticipo durante il caricamento della pagina, a costo zero, riducendo il ritardo reale al click.
3. **Fade-in dell'iframe** invece di comparsa secca (vedi punto 1) — anche a parità di tempo di attesa, il risultato appare più intenzionale.

Spinner con `animation` avvolta in `@media (prefers-reduced-motion: no-preference)`, stesso trattamento delle altre transizioni del progetto. Documentato in `componenti.md`.

## 2026-07-30 — Nuovo componente: `.c-faq` (contenitore con sfondo)

**Stato:** implementato, prima versione ("per iniziare", da iterare).

L'utente ha chiesto un leggero sfondo per il blocco FAQ (h3 + accordion) dentro "Il problema del Junior Designer da quando c'è AI" — prima non erano wrappati in nessun div. Aggiunto `.c-faq` (`css/components/faq.css`): `background: var(--zinc-100)`, `border-radius: var(--radius-8)`, `padding: var(--space-24)`. Wrappa `<h3 id="faq-problema">` + `<details class="c-accordion">` in `content.html`. Nessun problema di margini: la regola già esistente `h3:first-child { margin-top: 0 }` in `base.css` azzera automaticamente il margine superiore dell'h3 come primo figlio del box. Verificato senza overflow orizzontale a 500px e 1280px, accordion si espande correttamente dentro il box.

## 2026-08-06 — Step card: nuova variante "sketch" sostituisce "ghost" in produzione

**Stato:** deciso e applicato (merge di `feature/step-cards-v2` in `main`).

Esplorazione in worktree (`../mucca-website-step-cards-v2`), confronto side-by-side su due server locali (8000 baseline `ghost`, 8001 variante). Idea di partenza dell'utente: non un'icona accanto al numero/testo, ma la SVG (sketch Excalidraw fornito dall'utente) che sostituisce **del tutto** il contenuto della card — niente `.c-step-card__number`/`<p>`, il `<div class="c-step-card">` resta solo un contenitore di layout per un `<img class="c-step-card__sketch">`. Prima iterazione con una sola SVG placeholder riusata per i 3 step, poi completata con una SVG dedicata per step (`assets/images/step-card-sketch-1/2/3.svg`).

Bug del workflow, non del componente: durante l'iterazione, una modifica a `align-items` in `step-cards.css` è stata fatta per errore nel repo principale (`muccaWebsiteV2`, servito su :8000) invece che nella worktree (:8001) — i due sono copie indipendenti, non collegate. Nessun effetto visibile finché la modifica non è stata rifatta nel file giusto.

**Decisione**: `sketch` va in produzione (`content.html`), sostituisce `ghost`. Nessuna variante viene cancellata — stesso principio già in uso per i branch scartati: `ghost` (e le altre: `corner`/`bar`/`badge`/`outline`) restano nel CSS e nella galleria `componenti.html#step-card`, solo l'etichetta "attuale in produzione" si sposta. Worktree rimossa dopo il merge; branch `feature/step-cards-v2` mantenuto nella cronologia.

**Nota a margine**: nella worktree è comparso un file non tracciato (`assets/audioRecords/step1.m4a`), non legato a questo lavoro — spostato in `assets/audioRecords/` su `main` prima di rimuovere la worktree, per non perderlo. Non committato, resta solo su disco.

## 2026-08-06 — Audio opzionale sotto step 1

**Stato:** implementato e verificato.

Aggiunto `.c-step-card__audio` (`<audio controls>` nativo, nessun player custom — coerente con "nessun framework") dentro la card di step 1 in `content.html`, sotto la SVG. File rinominato da `assets/audioRecords/step1.m4a` (nota a margine dell'entry precedente) ad `assets/audio/step-card-audio-1.m4a` — cartella rinominata `audioRecords` → `audio` per coerenza con le altre cartelle di `assets/` (`images`, `portfolio`, nomi semplici senza suffisso). Pensato come pattern riusabile per tutti e 3 gli step, ma opzionale: per ora solo step 1 ha un file audio, step 2/3 no. Documentato in `componenti.md` e in galleria (`componenti.html#step-card`, esempio con audio a fianco di quello senza).

Cartella `assets/temp/` (i 3 SVG originali passati durante l'esplorazione, ora ridondanti — le copie definitive sono in `assets/images/`) eliminata su richiesta esplicita dell'utente.

**Aggiornamento stesso giorno**: aggiunti anche gli audio di step 2 e 3 (`assets/audio/step-card-audio-2.m4a`/`-3.m4a`, stessa convenzione di naming di step 1). Tutti e 3 gli step hanno ora un audio — `.c-step-card__audio` resta comunque un elemento opzionale del pattern (non richiesto per ogni card futura), non è diventato un requisito della variante `sketch`. Aggiornata la galleria in `componenti.html#step-card`: l'esempio "attuale in produzione" mostra ora la combinazione SVG+audio, quello senza audio resta come riferimento per il caso senza.

Bug/promemoria emerso nel test: il browser ha servito una versione cache di `content.html` (mostrava ancora `ghost`) nonostante il file su disco e la risposta del server (verificata via `curl`) fossero già `sketch` — stesso tipo di problema di cache discusso in precedenza per il CSS, stavolta sull'HTML. Risolto con hard refresh.

## 12 settembre 2026 — portfolio.html ridisegnato

- **In inglese, solo inglese.** Il pubblico è Upwork e clienti internazionali; è coerente col messaggio del corso (guarda fuori dall'Italia). Il copy vive in `portfolio.html`, non in `content.md` (che resta la fonte della landing).
- **Una colonna, non il grid 30/70.** La pagina deve dimostrare la tesi ("semplifico software complesso") invece di dichiararla: niente sidebar, niente da decidere su dove guardare. Nuova classe `.l-page` in `layout.css`.
- **Template a 5 etichette fisse** (`Product · Complexity · Immersion · Made obvious · Result`) ripetute uguali su ogni progetto: il ritmo è il messaggio. "Immersion" c'è apposta per dire che gli insight vengono da studio e ricerca.
- **Filmstrip ad altezza fissa** al posto della masonry: proporzioni miste (mobile, HMI, desktop) convivono. Nessun click-to-enlarge, per scelta.
- **HTML statico**, non più manifest JSON + JS: con testi, link e anchor per progetto, il JSON sarebbe un mini-CMS. Pagina a zero JavaScript.
- **Cluster linkabili** (`#ux-audit #ecommerce #hmi #founder #misc`) e progetti linkabili (`#coffee-machine`), per proposte Upwork mirate.
- Testi dei progetti raccolti per intervista, un cluster alla volta, a partire dalla mappatura immagini → progetti (contact sheet temporanea `assets/portfolio/_sheet.html`).

## 12 settembre 2026 — variante portfolio: sezioni-tesi + tag (worktree)

Worktree `../mucca-website-portfolio-themes`, branch `feature/portfolio-themes`. Server locale `:8766` per il confronto con `main` su `:8765`.

- Le sezioni non sono più i tipi di lavoro ma **4 tesi**: "I simplify complex software", "I make an ecommerce sell", "I simplify the human-computer conversation", "I spot where interfaces break". I titoli dicono cosa faccio, non che tipo di progetto è.
- I vecchi cluster (UX audits, Ecommerce, HMI, Founder, Other) diventano **tag**, filtro in cima alla pagina e visibili su ogni progetto. Un progetto sta in una tesi e può avere più tag.
- Titolo pagina: "Works."
- I 7 HMI: 5 Morgan/Lonati in "complex software", 2 Egro in "conversation" (il pubblico è chiunque, non un operatore).
- Con un tag attivo le sezioni vuote spariscono; tag senza progetti → "No projects with this tag yet".
- La pagina passa da zero JS a ~40 righe (`js/portfolio-filter.js`), con progressive enhancement: senza JS i tag sono link `?tag=…` che funzionano col reload.
- Da decidere dopo aver visto le due versioni: quale delle due va su `main`.

## 12 settembre 2026 — audit UX della navigazione di portfolio.html, e due varianti in worktree

**Stato:** audit fatto, due alternative implementate in worktree, nessuna decisione presa.

Audit della navigazione intra-pagina della variante sezioni-tesi + tag (`feature/portfolio-themes`, `:8766`). Misure sulla pagina reale, non a occhio: 21.535px di altezza (27,6 schermate a 1470×779), 25 progetti, 60 immagini, barra filtro non sticky che finisce a 347px dall'inizio, nessun indice delle sezioni, nessun "torna su".

**Il problema di fondo: due tassonomie che competono.** 5 sezioni-tesi (verbi) danno la struttura visiva, 6 tag (tipi di lavoro) sono l'unico controllo. Filtrando `UX audits` restavano 2 progetti in 2 sezioni diverse: due titoli-tesi con un progetto a testa. La gerarchia si sbriciolava invece di restringersi.

Bug confermati in browser, non ipotesi:

- **Filtrare da metà pagina sputava in fondo.** Scroll a 14.000px → click su un tag dentro un progetto → la pagina si accorciava a 3.553px ma `scrollY` restava 2.774: si atterrava sull'ultimo progetto della lista filtrata, con la barra fuori schermo.
- **Indietro non annullava il filtro** (`history.replaceState`): portava fuori dal sito.
- **`?tag=x#progetto-nascosto-da-x`**: il progetto restava `hidden`, la pagina non diceva niente. Rilevante perché i deep link mirati per Upwork sono uno scopo dichiarato della pagina.
- **Nessun conteggio**: si cliccava e la pagina crollava da 27 schermate a 4 senza preavviso. E i numeri dicevano che la tassonomia non reggeva: `Other work` era il tag più grande (8 su 25), `Non-profit` ne aveva 1.
- **`aria-pressed` su `<a>`** non è valido (vale per `role=button`) e nessuna live region annunciava l'esito del filtro.
- **Filmstrip non raggiungibili da tastiera**: 9 su 25 scorrono, nessuna con `tabindex`, quindi azionabili solo col trackpad (WCAG 2.1.1).

### Le due varianti

Entrambe partono da `feature/portfolio-themes`, non da `main`.

| | cartella | branch | server |
|---|---|---|---|
| **C** — tieni entrambe le tassonomie, rendile oneste | `../mucca-website-portfolio-filtro-sticky` | `feature/portfolio-filtro-sticky` | `:8767` |
| **D** — indice-primo, una tassonomia sola | `../mucca-website-portfolio-indice-primo` | `feature/portfolio-indice-primo` | `:8768` |

**C** aggiunge `.c-pagebar`, barra sticky con due menu `<details>` nativi — "In: *sezione corrente*" (aggiornata dallo scroll) e "Showing: *filtro*" — più `.c-section-index` in testata. Il filtro diventa una vista dichiarata: conteggi calcolati dal DOM, `aria-current`, `role=status`, `pushState`, scroll all'inizio dei risultati, e il deep link che vince sul filtro. Tassonomia ridotta da 6 tag a 5: via il bucket "Other work" e il tag da 1 progetto, nuovo "Desktop & web apps" (8).

**D** trasforma ogni progetto in una voce d'indice (`.c-entry`, `<details>` nativo): titolo, riga meta, una riga che dice com'è andata; il dettaglio si apre sul posto. La pagina passa a **4.498px, 6 schermate**, e **zero immagini scaricate** al caricamento (erano 60, tutte dentro `<details>` chiusi). Il filtro per tag sparisce del tutto — è il contrario esatto di C. In più: "Expand all", permalink per voce, deep link che apre la voce.

Le 25 righe di sintesi di D sono copy nuovo, prima bozza — alcune ripetono quasi alla lettera il campo "Made obvious" del dettaglio, va fatto un passaggio.

**Da decidere:** quale delle quattro versioni (main, themes, C, D) va su `main`. C e D non sono mutuamente esclusive al 100%: la pagebar di C funzionerebbe anche sopra l'indice di D, se le 6 schermate risultassero ancora troppe.

## 14 settembre 2026 — la variante D va in produzione

**Stato:** deciso e applicato (merge di `feature/portfolio-indice-primo` in `main`).

`portfolio.html` è ora l'indice: ogni progetto è una riga apribile sul posto (`.c-entry`, `<details>` nativo). 4.498px invece di 21.535, zero immagini scaricate al caricamento, una sola tassonomia — restano le 5 sezioni-tesi, il filtro per tag non c'è più (`js/portfolio-filter.js` rimosso).

Iterazione sulla testata prima del merge: via la seconda frase dell'intro ("Every insight below came from immersion…") e il link "← Back to the course (Italian)". Sottolineatura sempre presente su `.c-section-index a` e `.c-entry__title`, accento all'hover — bastava togliere il `text-decoration: none` che il componente metteva sopra la regola del tema; su `.c-entry__title` (un `<h3>`, non un `<a>`) la regola è replicata a mano.

**Nessuna variante viene cancellata**, stesso principio già usato per le step card: `feature/portfolio-themes` (sezioni-tesi + filtro) e `feature/portfolio-filtro-sticky` (variante C: pagebar sticky, filtro con conteggi, tassonomia a 5 tag) restano come branch. Istruzioni per rivederle in `README.md`.

Worktree `../mucca-website-portfolio-indice-primo` rimossa dopo il merge. Le altre due restano su disco finché servono per il confronto.

**Restano aperte** due cose ereditate da D: le 25 righe di sintesi sono copy di prima bozza (alcune ripetono quasi alla lettera il campo "Made obvious" del dettaglio), e la pagina a voci chiuse è di 6 schermate, non delle ~3 stimate — a pesare sono gli intro di sezione, non le righe.

## 15 settembre 2026 — `marketing.html`

Nuova pagina `marketing.html` ("Results."), equivalente di `portfolio.html` per il lavoro di marketing: stesso guscio (`l-page`, header, lista a righe, footer), contenuto diverso.

Scelte:

- **Niente `<details>`.** In portfolio la riga chiusa è un indice di 25 progetti e l'apertura serve a non scaricare 100 immagini. Qui le voci sono due e il contenuto è una frase: un accordion prometterebbe un dentro che non c'è. Da qui il componente separato `.c-result` invece del riuso di `.c-entry`.
- **I numeri in `<strong>` dentro la frase**, non in stat tile. La cifra da sola non vende: "€180.000" conta perché segue "€2.000 nei primi 6 mesi".
- **Footer con link incrociato** a `portfolio.html`: le due pagine sono due facce della stessa offerta, e chi arriva da LinkedIn atterra su una sola delle due.

Da decidere: se `marketing.html` e `portfolio.html` restino due pagine o diventino due sezioni di una pagina sola quando le voci di marketing cresceranno; e se serva un ingresso a entrambe da `index.html`, che oggi è solo un biglietto da visita senza navigazione.

## 16 settembre 2026 — indice privato

Indice privato di tutte le pagine HTML del sito, comprese quelle fuori dai motori di ricerca. Serve a ritrovare le pagine che non sono linkate da nessuna parte (l'offerta Mediaddress, la galleria componenti, il design system esportato).

Come resta fuori dai motori:

- `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">` nella pagina;
- header `X-Robots-Tag` sul file in `netlify.toml`, per coprire anche chi ignora il meta tag.

Il file si chiama `index-abf92932.html`: suffisso casuale, così l'URL non è indovinabile. È sicurezza per oscurità — non protegge niente, toglie solo la pagina dalla portata di chi tira a indovinare.

**Non è stata aggiunta a `robots.txt`, di proposito.** Due motivi: `robots.txt` è un file pubblico, quindi scriverci dentro il percorso lo annuncia invece di nasconderlo; e un `Disallow` impedisce al crawler di scaricare la pagina, quindi di leggere il `noindex` — le due regole si annullano a vicenda. `Disallow` blocca la scansione, `noindex` blocca l'indicizzazione: per stare fuori dai risultati serve la seconda.

Per lo stesso motivo è stata **tolta la riga `Disallow: /offerta-mediaddress/`** da `robots.txt`: scriveva in chiaro, in un file pubblico, il percorso dell'offerta riservata. L'header `X-Robots-Tag` su quella cartella fa già il lavoro da solo. `robots.txt` ora è solo `Allow: /`.

Il rischio vero non è il motore di ricerca ma il fatto che il contenuto non è protetto: chi ha l'URL vede l'elenco completo delle pagine riservate. Non è un problema finché lì dietro c'è materiale solo "non pubblicizzato" e non riservato; il giorno che ci finisce qualcosa di sensibile serve una password, non un `noindex`.

La pagina usa il guscio del sito (`l-page`, header, footer) e un componente suo, `.c-sitemap` in `css/components/sitemap.css`: stessa lista a righe di `.c-entry` e `.c-result`, ma la riga è un link puro — niente `<details>`, niente numero, solo nome del file e cosa c'è dentro. Una pagina di servizio con uno stile tutto suo sarebbe stata una seconda cosa da mantenere senza guadagnarci nulla.

`code` è diventato un elemento di sistema: la regola sta in `base.css`, non dentro il componente. Serviva qui (i nomi di file sono metà del contenuto) ma non è roba di questa pagina — `componenti.html` lo usa già, e ogni pagina futura che nomina un file lo userà. Due misure in `em` invece che a token, di proposito: `0.9em` perché il monospace del browser rende più piccolo del testo attorno, e `0.25em` di padding laterale perché a 6px fissi la pastiglia staccava dalla virgola che la segue. C'è anche il reset `pre code` — nessuna pagina ha ancora un blocco di codice, ma la regola senza quel guard si rompe il giorno che ne arriva uno.

Il link alla home punta a `/index.html`, non a `/`: con l'editor locale (`_tools/html-editor`) la radice è l'indice dei file dell'editor, non la home del sito. Le altre cartelle (`/mini-corso/`, `/offerta-mediaddress/`) si risolvono correttamente e restano con l'URL canonico.

Da mantenere a mano: l'elenco non si genera da solo, va aggiornato quando si aggiunge o si toglie una pagina.

## 16 settembre 2026 — journal degli annunci Upwork

`upwork.html` è l'elenco degli annunci di lavoro analizzati prima di candidarsi; ogni voce linka alla sua pagina di analisi in `upwork/`. La prima è `upwork/ai-automation-specialist.html`.

**Perché due livelli e non una pagina sola.** L'analisi di un annuncio è lunga — glossario, traduzione frase per frase, i passi di costruzione, i buchi da coprire, le domande da fare al cliente. Impilarne dieci in una pagina la rende inservibile: l'elenco deve restare scorribile in dieci secondi per decidere quale riaprire. L'elenco porta solo il verdetto in una riga; il resto sta dentro.

**Struttura a cartella** (`upwork/<slug>.html`) invece di `upwork-<slug>.html` in radice: gli annunci si accumulano, e in radice diventerebbero rumore accanto alle pagine del sito. Stessa logica di `offerta-mediaddress/`.

**Fuori dai motori**, come le altre pagine di lavoro: `noindex` nel markup e `X-Robots-Tag` in `netlify.toml` su `/upwork.html` e `/upwork/*`. Sono note su clienti potenziali, non contenuto pubblico. Aggiunte anche all'indice privato.

**Componente `css/components/job.css`**, non stile inline nella pagina: le analisi saranno molte e devono somigliarsi. Contiene il filetto/occhiello di testata (`.c-rule`, `.c-eyebrow`, ripresi dal trattamento dell'offerta Mediaddress), l'elenco `.c-job` e i pezzi ricorrenti di un'analisi — `.c-posting` per l'annuncio originale riportato letteralmente, `.c-verdict` per la risposta secca, `.c-defs` per il glossario, `.c-steps` per i passi numerati, `.c-table` per la traduzione.

**Un solo accento per sezione**, come da brand kit: il filetto corallo in testata, il pallino nella pastiglia del verdetto, il bordo sinistro del riquadro `.c-verdict`. Il testo della pastiglia resta nero — se fosse corallo anche quello, l'accento perderebbe forza proprio dove serve.

**La tabella di traduzione è impilata sotto i 768px**, non scrollabile. Due colonne di testo lungo su schermo stretto non si leggono, e lo scroll orizzontale dentro un articolo si perde: sotto il breakpoint ogni riga diventa un blocco (frase inglese in grassetto, traduzione sotto) e il `<thead>` sparisce alla vista ma resta allo screen reader. Scritta mobile-first, come il resto del CSS: il default è impilato, da 768px i `display` tornano a `table-*`.

**`min-width: 0` su `.p-upwork > .l-page`.** Il `body` è un flex container (footer in fondo alla viewport) e un figlio flex ha `min-width: auto`: senza questo la tabella allargava la pagina oltre la viewport invece di restare dentro il suo contenitore. Aggiunto anche a `.p-results`, che ha lo stesso guscio e lo stesso problema latente.

Da mantenere a mano: ogni nuova analisi va aggiunta all'elenco in `upwork.html`. L'indice privato elenca solo `upwork.html`, non le singole analisi — altrimenti va riscritto a ogni annuncio.

## 16 settembre 2026 — i link sono sempre sottolineati

Regola adottata per tutto il sito: **un link è sottolineato sempre**, qualunque elemento lo contenga — un titolo, una voce di indice, una barra di navigazione. Non è decorazione: è la sottolineatura a renderlo riconoscibile come link. Nel tema del brand i link sono nel colore del testo (gerarchia per peso, non per colore), quindi senza riga non resta nessun segnale — e affidarsi al solo colore violerebbe comunque WCAG 1.4.1.

Tolta quindi la `text-decoration: none` da:

- `.c-job__title a` (`job.css`) — il titolo dell'annuncio nell'elenco Upwork. Riga a spessore doppio: sotto Archivo Black a 24px quella di default spariva.
- `.l-section__toc a` (`layout.css`) — l'indice delle sezioni, visibile in `master-ux-ui.html`.
- `.c-cluster-nav a` (`cluster-nav.css`).
- `.c-tag-filter a` (`tag-filter.css`).

Sparite anche le regole `:hover { text-decoration: underline }` che le accompagnavano: ora sono ridondanti, e il colore della riga (grigio, corallo all'hover) lo dà già `a` in `theme-brand.css`.

**Il tag attivo del filtro cambia segnale.** Prima si distingueva perché era l'unico sottolineato. Ora che lo sono tutti, si stacca per colore (`--color-accent`) e spessore doppio della riga. Aggiornata la voce in `componenti.md`.

**`.c-button` resta senza sottolineatura, di proposito.** Dal punto di vista UX è un bottone, non un link in mezzo al testo: il riquadro pieno fa già da affordance, e sottolinearlo lo farebbe leggere come testo cliccabile invece che come azione.

## 16 settembre 2026 — l'analisi diventa anche materiale da usare

L'analisi dell'annuncio AI Automation Specialist cresce di due sezioni: «Come mi candido senza case study» e la bozza di cover letter in inglese. La pagina smette di essere solo uno studio dell'annuncio e diventa il posto da cui si prende la roba per candidarsi davvero.

**Le domande al cliente ora hanno un interruttore di lingua** (`.c-lang-toggle`, `js/lang-toggle.js`). L'idea è di Luca: le sei domande sono il pezzo migliore da mostrare nel video allegato alla cover letter, e nel video vanno in inglese. Italiano = nota di lavoro, inglese = testo rivolto al cliente, stessa fonte.

**Ma la sezione è stata spaccata in due.** Com'era scritta non era condivisibile: conteneva la deliberazione su se il lavoro convenga («se rispondono ERP custom, lasciar perdere»). Mostrarla al cliente comunica «ti sto valutando come rischio». Le domande sono passate nel blocco col toggle, le regole di decisione in un `.c-private` marcato «non va nel video». Il titolo è cambiato da «Cosa chiedere prima di candidarmi» a «Le domande da fare al cliente»: stessa sostanza, cornice diversa — competenza invece che diffidenza.

**`.c-private` e `.c-letter` si distinguono per il bordo**, tratteggiato contro continuo, non per il colore: il corallo in quella pagina è già preso dal filetto di testata e dal riquadro del verdetto, e un terzo accento romperebbe la regola del brand. `.c-slot` segna i buchi da riempire prima di inviare (il costo mensile dei tool, il link al video) — non `<mark>`, che è giallo fuori palette e significa «evidenziato», non «mancante».

**Il toggle è progressive enhancement**: il bottone lo crea lo script, quindi senza JS non compare un controllo morto, resta l'italiano. Le varianti portano sia `lang` sia `data-lang`, e la selezione avviene su `data-lang`: così un `lang` annidato per altri motivi non finisce nello scambio.

Componenti documentati in `componenti.md`.

**Incidente da ricordare.** Nel modificare la pagina via script ho usato `s.index('<p class="c-back"')` per trovare la fine della sezione da sostituire, ma quel markup compare due volte — in testa e in fondo alla pagina. `index` ha restituito la prima occorrenza, che sta *prima* del punto di partenza, e il file si è ritrovato con l'intero documento duplicato (metà nuovo, metà vecchio). Individuato rileggendo l'outline dei titoli, non dal browser: la pagina duplicata si apre senza errori e da sopra sembra giusta. Quando si taglia un file per indici, cercare il delimitatore **a partire dal punto d'inizio**, non dall'inizio del file.

## 17 settembre 2026 — `automations.html`

Terza pagina-vetrina accanto a `portfolio.html` (Works) e `marketing.html` (Results). Contenuto della prima voce da `trello-twilio-automation.md`, che resta la fonte: la pagina ne è la versione per il cliente, non un doppione.

**Nessun componente nuovo, tranne uno minimo.** Riusa `.c-entry` (la riga che si apre, `<details>` nativo) e `.c-project__facts` (le etichette fisse) di portfolio.html. Le etichette però cambiano: qui non sono Product/Complexity/Immersion/Made obvious/Result ma Problem, The trigger, What it does, Safe unattended, When it fails, Cost to run, Not handled yet, Same shape different edges. Sono le domande che un cliente fa di un'automazione, e due di esse — cosa succede quando si rompe, e cosa non fa ancora — sono il motivo per cui la pagina è credibile.

`css/components/automation.css` esiste solo per la figure: con **uno** screenshot il `.c-filmstrip` prometterebbe un seguito che non c'è. Il canvas di n8n è largo 2556px, quindi alla larghezza della colonna il testo dentro i nodi non si legge: l'immagine è un link alla versione intera e la didascalia lo dice a parole, per chi non immagina che il riquadro sia cliccabile. Quando gli screenshot di un'automazione diventano due, si passa al filmstrip e quel file sparisce.

**`js/portfolio-index.js` riusato così com'è.** Non sa nulla di progetti: lavora su `.c-entry`. Su una pagina senza `.c-section-index` si ferma dopo i deep link e non inserisce il bottone "expand all" — che con una voce sola direbbe "expand all 1 projects". Il nome del file resta quello del primo uso; se le pagine che lo usano diventano tre conviene rinominarlo.

Titoli delle voci in `<h2>`, non `<h3>` come in portfolio: lì gli `<h3>` stanno dentro sezioni con un `<h2>`, qui le sezioni non ci sono e un `h3` salterebbe un livello.

Aggiunte all'indice privato `automations.html` (pubblica) e `upwork/ai-automation-specialist.html` (non destinata a diventare pubblica). A quest'ultima manca il `X-Robots-Tag`: il `noindex` c'era già nel markup, ma la cartella ora ha anche l'header in `netlify.toml`, come `offerta-mediaddress`.

## 17 settembre 2026 — `manifesto.html`, il manifesto diventa una lista

`manifesto.md` conteneva la tesi giusta nella forma sbagliata: cinque paragrafi dettati, senza gerarchia, con dentro le autocorrezioni del parlato. Il contenuto è che UX, UI design, marketing e automazione sembrano mestieri diversi e non lo sono, e che l'iperspecializzazione che li separa costa.

**La forma viene da [37signals.com](https://37signals.com/)**, su indicazione di Luca: non lo stile — il brand è il nostro — ma l'elenco e l'interazione con l'elenco. Lì sono 38 voci numerate, ognuna una frase dichiarativa su una riga, e dietro **un solo paragrafo stretto**. La lista si scorre in venti secondi; il ragionamento lo apre chi lo vuole. È il contrario della pagina di prosa: rende scansionabile un insieme di convinzioni.

Il testo è stato spezzato in **tredici affermazioni** (`00`–`12`), tutte già presenti nel dettato, nessuna aggiunta. Il vincolo che regge la forma è doppio: titolo su una riga, paragrafo sotto le 60 parole. Quando un paragrafo non ci stava, voleva dire che l'affermazione ne conteneva due, e si è spezzata.

**Nessun componente nuovo, di nuovo `.c-entry`.** Terza pagina che lo riusa dopo portfolio e automations, e stavolta il riuso è quasi totale: `<details>` nativo, bordo fra le voci, marcatore `+`/`–`, focus ring sulla riga, `scroll-margin-top` per i deep link. Delle tre parti del summary serve solo il titolo — niente meta, niente riga di esito. `css/components/manifesto.css` aggiunge due cose sole: il numero e la misura di lettura del paragrafo.

**Il numero è testo vero nel markup, non un contatore CSS.** Ci ho pensato: il contatore renderebbe gratis il riordino. Ma l'`id` di ogni voce (`#m-05`) è comunque scritto a mano, quindi riordinare tocca già ogni riga e il contatore non farebbe risparmiare niente — toglierebbe solo il numero dall'albero di accessibilità. Precedente nel repo: `.c-step-card__number`.

**Il `display: flex` sul summary è la decisione tecnica non ovvia.** La strada ovvia era `position: absolute` come il marcatore a destra, ma avrebbe richiesto di allineare a mano un numero da 14px a una prima riga da 20px, e si sarebbe scollato al primo ritocco del corpo del titolo. Con `align-items: baseline` le due dimensioni si allineano da sole.

**Niente JS nuovo.** `js/portfolio-index.js` lavora su `.c-entry` e dà i deep link gratis. Non dà il bottone "apri tutto", che pretende una `.c-section-index` e direbbe comunque "Expand all 13 projects": se lo vorremo, la mossa è generalizzare quel file prendendo l'etichetta da un `data-` sulla lista, non scriverne un secondo che duplica la stessa logica. Il nome del file ora è sbagliato per tre pagine su tre: vale la pena rinominarlo.

**Una scelta lasciata aperta nel codice**: l'attributo `name="manifesto"` sui `<details>` renderebbe l'accordion esclusivo in modo nativo. Non c'è, perché due affermazioni aperte in parallelo si possono confrontare. Si aggiunge con un attributo su tredici righe.

Pagina privata per ora: `noindex` nel markup, `X-Robots-Tag` in `netlify.toml`, riga nell'indice privato sotto «Riservate». `manifesto.md` resta la fonte del copy e va riallineato alla versione a lista.

**L'apostrofo resta misto, per scelta.** Nel repo ci sono 66 apostrofi dritti (`'`) nelle pagine già scritte contro 43 curvi (`’`), questi ultimi comparsi convertendo i `&rsquo;`. La regola tipografica chiedeva il curvo e `manifesto.html` lo usa, ma **la riga è stata tolta da `CLAUDE.md`**: le due forme convivono e non c'è niente da normalizzare. Il motivo non è pigrizia — è che non è automatizzabile in sicurezza. Dentro attributi HTML, stringhe JS e codice l'apice singolo è sintassi, e distinguerlo dall'apostrofo non è una sostituzione meccanica: `tools/tipografia.py` non lo tocca di proposito, e una regola che lo strumento non può applicare è una regola che si viola da sola. Le entità (`&rsquo;`, `&ldquo;`) continuano a risolversi come tutte le altre.

## 17 settembre 2026 — `automations.html`, secondo caso d'uso e la sezione che il primo non ha

Il generatore di proposte (modulo n8n → OpenAI → Google Slides → bozza Gmail) entra in `automations.html` come seconda voce, con la stessa struttura `<dl>` della prima. La bozza è stata scritta e provata in `your-third-workflow/your-third-workflow.html`, costruendo il flusso davvero, nodo per nodo: la pagina è il resoconto di quella costruzione, non una parafrasi del `.md` del corso.

**Il passo passo era stato incluso, poi è stato tolto.** La bozza portava una sezione «Come si costruisce passo passo» — sette passi, il template delle slide, il prompt intero, le espressioni n8n — che nella prima voce non esiste. Inserita, rendeva la seconda voce dieci volte più lunga della prima e cambiava il genere della pagina: da indice di automazioni a manuale. `automations.html` risponde a «cosa fa, dove si rompe, cosa non fa»; il come si costruisce è un'altra pagina, con un altro pubblico. Il materiale resta in `your-third-workflow/your-third-workflow.html`, pronto da pubblicare quando avrà un posto suo.

Conseguenza: `.c-automation__code` e `.c-automation__step` in `css/components/automation.css` non sono più usati da nessuna pagina pubblica — li usa solo la bozza. Si tengono finché il passo passo non trova casa, ma vanno ricordati se quel file va ripulito.

**Il flusso consegnato devia dal tutorial su un punto solo, e per un motivo.** La versione originale manda l'email da sola. Qui l'ultimo nodo è `Create a draft`: l'email è l'unico passo irreversibile del flusso e sta subito dopo l'unico passo non deterministico. Il tempo che il sistema fa risparmiare è tutto nella scrittura, non nel clic su «invia» — tre secondi di gesto umano comprano l'unica revisione che il flusso non ha.

**Un nodo in più rispetto ai sei del tutorial: `Proposal`, un Code node.** Il percorso dei campi generati dipende da come il provider impacchetta la risposta — `message.content` con una chiave OpenAI diretta, `output[0].content[0].text` passando dai crediti inclusi di n8n — e sbagliarlo non dà errore, dà `undefined` ventiquattro volte. Il Code node appiattisce la risposta in un punto solo: cambiare credenziale tocca un nodo invece di ventiquattro espressioni. Fa anche una seconda cosa, che è la lezione generale della pagina: **ciò che è già un dato certo non attraversa il modello**. Il nome dell'azienda viene dal modulo, il prezzo viene dal modulo, la data di oggi viene da `$now`. Chiedere a un LLM di ricopiare una stringa è come chiedergli di sommare due numeri che hai in tasca.

**Gli inciampi documentati sono quelli in cui siamo inciampati davvero**, ed è il motivo per cui la sezione vale: la casing dei nomi dei campi (`Company name` ≠ `Company Name`, guasto silenzioso che si manifesta tre nodi dopo), il pin data che resta congelato dopo aver corretto il modulo, `$()` che vuole il nome vero del nodo sul canvas, il campo `Text` del nodo Slides che deve restare in Fixed, `To Email` che sta sotto le opzioni perché una bozza non pretende un destinatario. Nessuno di questi sta nel materiale di partenza.

**Le credenziali Google sono divise fra n8n Cloud e self-hosted.** Su Cloud l'app OAuth la mette n8n e basta un clic (e uno *Switch account* se si è collegato l'account sbagliato); self-hosted vuole progetto Google Cloud, tre API e consenso su Internal. Scritto in un blocco solo, avrebbe mandato metà dei lettori a perdere una mattinata su Google Cloud per niente.

Immagine: `assets/automations/form-to-offer-1.png`, stesso trattamento `.c-automation__figure` della prima voce.

## 18 settembre 2026 — `garanzia.html`, la pagina che il link prometteva

`master-ux-ui.html` linkava `garanzia.html` da giugno e la pagina non esisteva: 404 sull'unica cosa che giustifica 987€. Ora c'è. Il contenuto non è stato inventato — è `strategia-marketing.md` §9, che era già una spec completa: definizione larga di «lavoro», milestone verificabili invece di giudizi a posteriori, journal in repo git come prova, inglese come prerequisito d'ingresso e non come compito.

**Mancavano solo i numeri** (§D8: «senza questi numeri `garanzia.html` non si può scrivere»). Scelta la calibrazione **esigente**: una consegna saltabile, 85% di presenza, 4 progetti in portfolio di cui 3 rifatti col metodo, 10 azioni a settimana per 24 settimane su 26 (di cui 4 contatti diretti), commit in 5 giorni su 7, check-in mensile, C1 di inglese verificato con una call.

**La riserva che resta agli atti**, perché il §9 stesso la solleva: una barra alta rende la garanzia decorativa, e un prospect attento se ne accorge. 24 settimane su 26 lascia due settimane di margine in sei mesi; il C1 esclude dalla garanzia la maggior parte dei junior designer italiani. È autoselezione legittima, ma è una scelta diversa dal «vende anche a chi non la prenderà» del §9. La contromisura in pagina è la prima FAQ, che affronta l'obiezione di petto invece di aggirarla: i numeri non servono a rendere il rimborso difficile, descrivono cosa serve fare perché trovare lavoro diventi probabile. I numeri stanno in un posto solo e si ritoccano senza toccare la struttura.

**Due numeri non erano nel §9 e li ho messi io**: la finestra per chiedere il rimborso (30 giorni dalla scadenza dei sei mesi) e i tempi della risposta (15 giorni) e del bonifico (30 giorni dall'accettazione). Da confermare col legale insieme al resto.

**L'importo rimborsato è il totale versato, non il prezzo di listino.** Chi paga a rate versa 1100€ o 1170€: trattenere la differenza sarebbe legittimo e sarebbe percepito come una fregatura. Vale lo stesso per i materiali, che restano allo studente — se il patto non ha funzionato, il problema non è che ha visto le lezioni.

**Pagina pubblica, indicizzabile**, a differenza di `manifesto.html` e delle pagine `upwork/`: la sua funzione è dimostrare che la promessa è vera, e una pagina di condizioni che aumenta la credibilità deve essere raggiungibile. Nessuna riga in `netlify.toml`.

**Struttura `.l-page`**, colonna singola a larghezza di lettura come `portfolio.html`, non il grid 30/70 di `.l-section`: non c'è niente da mettere in una sidebar, e una clausola si legge in colonna. Componenti nuovi due, `.c-pledge` e `.c-requirement`, documentati in `componenti.md` insieme alla ragione per cui non si è riusato `.c-schedule` (stessa griglia, ma senza lo slot della misura verificabile, che è il punto della pagina).

**Le risposte della FAQ con più di un paragrafo vanno in un `<div>`.** `.c-accordion > p` aggiunge `padding-bottom` a ogni figlio diretto: due paragrafi sciolti si staccano il doppio. Col `<div>` il padding lo prende il contenitore e i paragrafi dentro tengono i margini normali. È la prima FAQ del repo con risposte lunghe, quindi il caso non era ancora emerso.

**Cosa resta aperto**: la clausola va fatta scrivere nel contratto da chi se ne intende (§9 lo dice, e questa pagina non lo sostituisce); `og:image` manca qui come in `master-ux-ui.html`; e resta da decidere quale quota degli 11.844€ di esposizione massima accantonare fino ad agosto 2027.

## 18 settembre 2026 — la gallery dei progetti degli studenti

`master-ux-ui.html` vendeva «diventa Design Engineer» senza far vedere una sola interfaccia prodotta da uno studente, mentre in `assets/images/gallery-progetti-studenti/` c'erano dieci immagini che **non erano referenziate da nessun file del repo**. Stessa sorte per le dieci foto degli studenti in `assets/images/` — quelle restano da usare, sono il prossimo punto della roadmap.

**La provenienza è dichiarata in apertura, ed è la decisione che conta.** Sono lavori del corso di Boolean, classe 2, non del Master: il Master parte il 9 novembre e la prima classe non ha ancora disegnato niente. Scriverlo in grassetto nella prima riga costa una frase e toglie l'unica obiezione che questa sezione potrebbe attirare. È anche la regola che Luca si è dato in `content.md`, «fai capire cosa è esperienza diretta».

**Tre gruppi invece di dieci immagini in fila**, perché il raggruppamento è l'argomento:

- *I due progetti del corso* — macchina del caffè e ufficio stampa sono gli stessi progetti del Modulo 1 e del Modulo 2. Il wireflow di Roberto accanto alla schermata finita di Andrea mostra lo stesso progetto in due momenti: prima cosa succede al tocco, poi cosa si vede.
- *Lo stesso brief, tre studenti* — CozyShoes attraversato da Marco, Antonella e Ilaria. Che il metodo non produca tre copie della stessa interfaccia è più persuasivo di qualunque singola schermata.
- *Poi ognuno va per la sua strada* — i progetti scelti da soli, quando il brief non lo dà più nessuno.

**Riusata `.c-filmstrip`, non la masonry.** La masonry ha l'overlay di ingrandimento, che qui servirebbe, ma vive come JS inline in `componenti.html` e andrebbe estratta; la filmstrip è in produzione in `portfolio.html`, gestisce proporzioni diverse alla stessa altezza ed è già accessibile da tastiera. L'ingrandimento si risolve come in `automations.html`: ogni immagine è un link al file a dimensione intera, e la riga sopra le strip lo dice a parole, perché non si indovina che un'immagine sia cliccabile.

L'aggiunta a `filmstrip.css` è di quattro righe: `.c-filmstrip a { flex: none; display: block; scroll-snap-align: start }`. Il link prende il posto dell'`<img>` come figlio flex, l'immagine dentro continua a prendere altezza e bordo dalla regola che c'era già — quindi le filmstrip senza link di `portfolio.html` non cambiano di una virgola.

**Tre immagini non avevano il gemello `.webp`** (`antonella-wf`, `roberto-coffee-machine-wireflow`, `adn-coffee-machine-proto`). Generati con Pillow a 1360px come gli altri sette: `sips` su questo Mac non scrive webp, `cwebp` non è installato. Le dieci immagini servite pesano ~670KB in tutto, tutte `loading="lazy"`; i `.jpg`/`.png` originali da 2800px restano come bersaglio del link.

**Le attribuzioni vengono dai nomi dei file e vanno confermate.** Solo nomi di battesimo, nessun cognome: le foto in `assets/images/` suggeriscono che ci siano due Davide, e `esercizio-stefano.jpg` mostra la pagina di presentazione di un Roberto Martino — che sia un esercizio di Stefano su un CV altrui o un file battezzato male non è deducibile dal repo. La didascalia dice quello che si vede («tre varianti della stessa pagina di presentazione») e non attribuisce il contenuto a nessuno.

### Correzione lo stesso giorno: la provenienza dei lavori era sbagliata

Avevo attribuito tutta la gallery al corso di Boolean, deducendolo dal fatto che le recensioni in pagina vengono da lì. Sbagliato, e sbagliato nella direzione che costava di più: **macchina del caffè, ufficio stampa e Pound 4 Pound vengono dalla prima edizione di questo Master**, non da Boolean. CozyShoes è l'unico progetto di Boolean; l'esercizio sulla pagina di presentazione viene dal corso di visual design tenuto all'inizio del 2025.

La sezione è stata riscritta **raggruppando per provenienza invece che per tema**, e ci guadagna: il primo gruppo non è più «lavori di un altro corso che dimostrano che so insegnare», è «ecco cosa è uscito da questo stesso corso, dagli stessi due progetti da cui partirai tu». È l'argomento più forte della pagina e stava per finire sotto l'etichetta sbagliata. Sparita la riga «Non sono lavori del Master», che diceva il falso.

Pound 4 Pound si è spostato dal terzo gruppo al primo, dove sta per provenienza, e il suo essere fuori programma è diventato il finale del gruppo: il brief non glielo dava più nessuno e ha continuato a lavorare così.

**Da chiarire con Luca, conseguenza di questa correzione**: la sezione «Ammissione» dice «La prima classe ha 12 posti», ma se una prima edizione c'è già stata, quella del 9 novembre non è la prima classe. Una delle due righe va corretta.

**La lezione**: le didascalie sono affermazioni di fatto su persone reali e su cosa ha prodotto un corso a pagamento. Dedurle dai nomi dei file e dal contesto della pagina non basta — vanno chieste, come i nomi degli studenti che restano da confermare.

### I metadati erano già scritti, in un altro repo

La vecchia gallery in `mucca-website/public/index.html` porta un `data-caption` per immagine — autore, progetto, corso — e la prima versione di questa sezione li aveva persi tutti, sostituendoli con nomi di battesimo dedotti dai nomi dei file. Sette caption su dieci erano già lì, e tre delle mie deduzioni erano sbagliate: Davide è **Vignozzi** (non Cester né Galli, le due foto in `assets/images/` che mi avevano sviato), Stefano è **Soave** (non Falvella, che è l'autore di una delle recensioni in pagina), e **Marco Guidi è della classe 1**, non della 2 — quindi Cozy Shoes è stato attraversato da due classi diverse, non da una. Il copy ora lo dice.

**La riga sotto la strip ora è la didascalia, non il conteggio.** Scelta di Luca fra tre opzioni: una didascalia per immagine sempre visibile (più robusta, niente JS, ma alza la strip e ripete il nome del corso quattro volte), una riga sola che cambia testo seguendo lo scroll, o una forma mista. Vince la seconda: `js/filmstrip-caption.js` tiene una riga sotto ogni strip e ci scrive la didascalia dell'immagine più a sinistra fra quelle visibili, col conteggio in coda.

**Il punto debole del pattern, e come è chiuso.** La riga descrive una sola immagine alla volta: chi non vede la pagina dovrebbe scorrere per sapere di chi è ogni lavoro. Per questo autore e corso stanno **anche in testa all'`alt` di ogni immagine** — il credito c'è comunque, la riga resta una comodità visiva. Non è una rifinitura: sono attribuzioni del lavoro di persone reali, e un credito che dipende da un'interazione è un credito a metà.

**Progressive enhancement, come per il toggle di lingua e la facade video.** La riga è già scritta nell'HTML con la didascalia della prima immagine: senza JS resta quella, non sparisce e non compare un contenitore vuoto. Il conteggio invece nasce `hidden` e lo scopre lo script, perché senza JS direbbe «1 di 4» mentre guardi la terza. `.c-filmstrip__hint` resta in `filmstrip.css` per `portfolio.html`, che non ha metadati per immagine e continua a usarlo.

Tre immagini (il wireflow e il prototipo della macchina del caffè, il wireframe del checkout di Antonella) non erano nella vecchia gallery e quindi non hanno una caption di riferimento: le loro attribuzioni sono dedotte e marcate come tali in `content.md`.

### Bug: l'ultima didascalia non compariva mai

La regola «l'immagine corrente è la prima non ancora uscita dal bordo sinistro» funziona per tutte tranne l'ultima, e non per caso: perché l'ultima diventi la più a sinistra bisognerebbe poter scorrere fino a portarla lì, ma lo scroll finisce prima. Nella prima strip le quattro immagini a 300px di altezza occupano ~1820px in un contenitore da ~700: lo scroll massimo è ~1120px mentre Pound 4 Pound comincia a ~1280. Arrivati in fondo la penultima ha ancora il bordo destro dentro la vista, quindi si teneva la didascalia. Stessa cosa nella strip di Cozy Shoes.

**Correzione**: al fine corsa (`scrollLeft >= scrollWidth - clientWidth`) si mostra l'ultima, che è l'unica interamente visibile. Il controllo che lo scroll esista davvero serve per le strip che non scorrono affatto — una sola immagine, o schermo largo — dove il fondo coincide con l'inizio e la regola normale è già quella giusta.

È il tipo di bug che si vede solo scorrendo fino in fondo davvero: a metà strada tutto funzionava, ed è quello che avevo verificato.

## 18 settembre 2026 — i bottoni ← → della gallery

Sotto ogni filmstrip c'era scritto «scorri o usa ← →», e col mouse quell'istruzione non si poteva seguire: le frecce funzionano solo se la strip ha il focus, ma per dargliela serviva il tasto Tab — cliccare sopra apre il link dell'immagine. Un controllo annunciato e non raggiungibile, che è peggio di nessun controllo.

Ora ci sono due bottoni veri nella riga della didascalia. Risolvono insieme il mouse (si cliccano) e la tastiera (Tab più Invio), e rendono visibile che la strip scorre — cosa che prima si deduceva solo dall'immagine tagliata sul bordo destro. L'istruzione è sparita: sotto resta la didascalia e il conteggio.

**Nella riga, non sui bordi della strip.** La posizione da carosello — pastiglie sovrapposte a sinistra e a destra delle immagini — era la prima idea di Luca, e l'ha scartata lui stesso notando che la strip occupa già tutta la colonna: lì coprirebbero una fetta di immagine, e sopra contenuti di colore imprevedibile servirebbe un fondino opaco. Nella riga della didascalia non rubano spazio a niente.

**La riga è passata da flex a grid.** Con flex, didascalia e conteggio incolonnati a sinistra e i bottoni a destra volevano un contenitore in più attorno ai due testi, se no il conteggio finiva staccato sotto i bottoni. Con `grid-template-columns: 1fr auto` i due testi stanno in due righe della prima colonna e i bottoni occupano la seconda, centrati su entrambe.

**I bottoni sono 36px, non 48.** Attraversano le due righe di testo: se sono più alti della loro somma (~42px) la griglia allarga le righe per contenerli, e fra didascalia e conteggio si apre un buco. 36px sta sotto quella soglia e resta sopra il minimo di 24px del criterio WCAG 2.5.8.

**Due trappole tecniche, tutte e due misurate in console e non indovinate.**

La prima: `behavior: 'smooth'` e `scroll-snap-type: x mandatory` si annullano a vicenda. Lo `scrollTo` partiva e veniva riportato indietro — la strip si muoveva di 13px e tornava a zero, con i bottoni che sembravano morti. La correzione è togliere lo snap per la durata dell'animazione e rimetterlo su `scrollend`: rimettendolo, il browser aggancia da sé il punto di snap più vicino, che è l'inizio dell'immagine dove si voleva arrivare. Il timer di 800ms è la rete per i browser senza `scrollend`, se no lo snap resterebbe spento.

La seconda, scoperta perché la prima correzione non funzionava lo stesso: togliere lo snap e chiamare `scrollTo` nello stesso task non basta. Il browser non ha ancora applicato la regola nuova e ricade nel comportamento di prima. Serve una lettura che forzi il ricalcolo dello stile (`void strip.offsetWidth`) in mezzo — una riga che sembra inutile e non lo è, quindi ha un commento che lo dice.

**`js/filmstrip-caption.js` è diventato `js/filmstrip.js`**: il file ora fa didascalia e navigazione, e il nome vecchio ne descriveva metà. Rinominato subito perché la pagina che lo usa è una sola — il debito che si è accumulato su `portfolio-index.js`, sbagliato per tre pagine su tre, nasce dall'aver rimandato esattamente questo.

Verificato in console su entrambe le strip: si attraversano tutte le immagini avanti e indietro, `disabled` scatta ai due estremi, il gruppo con una sola immagine non riceve bottoni, a 330px di colonna niente straborda e non compare scroll orizzontale di pagina. Invio sul bottone a fuoco avanza come il click.

## 18 settembre 2026 — l'editor visuale salva il DOM, non il sorgente

Luca ha modificato `master-ux-ui.html` con l'editor visuale e ha chiesto di togliere i `<p>` vuoti rimasti dove aveva cancellato il testo. I `<p>` vuoti erano il sintomo più innocuo: il confronto con `.editor-backup/master-ux-ui-20260918-090114.html` ha mostrato che il salvataggio aveva serializzato **il DOM vivo**, non il sorgente.

**Cosa si era rotto.** I bottoni ← → della gallery li crea `js/filmstrip.js` a runtime, e il salvataggio li ha scritti dentro il markup — dentro un `<p>`, per giunta, dove un `<div>` non può stare: il parser chiude il paragrafo e la nidificazione salta. Le didascalie si erano congelate sullo stato del momento («Davide Vignozzi … 3 di 4»), l'attributo `hidden` del conteggio era sparito e `data-caption-text` era diventato `data-caption-text=""`. Ricaricando, lo script trovava il contenitore ma non i due `<span>` — finiti in un `<p>` separato — e appendeva una **seconda** coppia di bottoni: quattro bottoni per strip, didascalia ferma.

**Cosa aveva fatto davvero Luca**, una volta separato dal rumore: accorciato i testi introduttivi dei tre gruppi e cancellato i due paragrafi di chiusura lunghi. Le sue frasi nuove erano finite dentro l'elemento `.c-filmstrip__caption`, che è il posto dove lo script scrive — quindi nel gruppo di Stefano Soave il credito era stato sovrascritto dalla prosa e non compariva più da nessuna parte. Ricucito: la prosa nuova è tornata sopra la strip, dov'era l'introduzione, e la riga della didascalia è tornata a essere solo i due `<span>`.

**La regola che ne esce**: un elemento che il JS riempie a runtime non va usato come contenitore di testo modificabile a mano. Se la gallery tornerà sotto l'editor, il punto fragile è sempre quello — `data-filmstrip-caption` e `.c-filmstrip__nav` non vanno toccati, e i testi si scrivono nei paragrafi normali intorno.

**Bonus, un difetto che c'era da prima.** Cercando gli ultimi `<p>` vuoti ne restavano due nel DOM che nel sorgente non esistevano: li generava il parser per via della `<figure class="c-video">` annidata dentro un `<p>` in «Come insegno» — un `<p>` non può contenere una `figure`, quindi il browser lo chiudeva prima e ne lasciava due vuoti in giro. La figure è stata portata fuori, il testo che la affianca è un `<p>` suo; il float e l'incolonnamento restano identici, verificati a schermo.

**Due cancellazioni di contenuto restano da confermare**, non essendo mie da ripristinare: la frase che apriva la sezione «La garanzia» (*«Se applichi il metodo e in 6 mesi dalla fine del corso non trovi lavoro, ti restituisco tutto.»*) è sparita, e la sezione ora comincia con «Vale per chi conosce l'inglese…», che è la sua qualifica senza la promessa davanti. E nell'apertura della gallery la riga «Le immagini sono grandi: cliccale per aprirle a dimensione intera» è stata sostituita da «Lavori dei miei studenti.», che ripete l'inizio del paragrafo sopra e lascia senza istruzioni su come ingrandire.

## 18 settembre 2026 — le recensioni prendono una faccia

Un nome senza volto è indistinguibile da un nome inventato. Le foto degli autori sono nel repo da mesi, e `componenti.md` le segnalava da tempo come "probabile riuso" in attesa di una collocazione: ora Davide Cester e Stefano Falvella hanno la loro, dentro la citazione che hanno firmato.

**Le citazioni restano dove sono, sparse.** Erano candidate a diventare una vetrina di recensioni tutta insieme; la scelta di Luca è l'opposto, e vale anche per le prossime: ogni recensione entra nella sezione a cui fa da prova, una alla volta, quando si decide quale affermazione deve sostenere. Una citazione vale perché sta accanto alla cosa che dimostra — in fila con altre nove, dimostra solo che esistono altre nove.

**È nato `.c-byline`** (`css/components/byline.css`), non due `style` inline: due usi bastano per la soglia di `design-system.md`. Sta **dentro** il `<footer>` del `blockquote`, non al posto suo — il semantico non cambia e `base.css` continua a dare al footer dimensione e colore del testo secondario. Il componente aggiunge solo la struttura: foto, poi nome in grassetto e provenienza in muted su due righe.

**La prima interfaccia di `.c-avatar`.** Il file portava scritto da sempre "nessuna variabile per ora — dimensione fissa, da esporre se serve una dimensione diversa altrove". È servita adesso: `--avatar-size`, default `var(--space-120)`, consumata da `width`/`height`. La firma imposta `var(--space-48)`. Verificato che la foto grande di Luca in `content.html` misuri ancora 120×120 — è la prova che il default non si è mosso.

**La recensione anonima resta senza foto**, com'è giusto: è una valutazione di fine modulo, un volto lì andrebbe inventato. Il `<footer>` nudo senza classe continua a funzionare, e in `componenti.html` le due forme stanno una sotto l'altra, etichettate entrambe "in produzione" — così il caso senza foto non sembra una dimenticanza.

**Il copy si è accorciato da sé.** L'attribuzione era `— Davide Cester - classe 2 Corso UX/UI Design Boolean` e `— Recensione di Stefano Falvella - …`. La lineetta serviva a dire "questo è l'autore", e ora lo dice la faccia; "Recensione di" dice quello che il `blockquote` già mostra. Restano nome e provenienza, il trattino separatore sostituito dall'andare a capo. Allineato in `content.md`, che resta la fonte del copy.

Nessuna conversione di immagini: i due `.webp` sono 184×184, a 48px in pagina coprono i display a 2× con margine. Verificato a schermo sul tema brand (bordo e corsivo del `blockquote` cambiano lì, il componente eredita senza regole dedicate), e a colonna stretta: la firma non straborda, l'avatar ha `flex-shrink: 0` così ad accorciarsi è il testo e non la faccia.

**Restano fuori**, in attesa di una sezione a cui servano: Bryan Zanella, Andrea Schiavon e Nicolò Giglietti (testo e foto nel vecchio sito, `mucca-website/public/pages/chi-sono.html` — le loro foto sono a 512px, andranno ridotte), Andrea De Nuccio (testo in `content.md`, foto già pronta) e Ilaria Bottinelli, la cui voce in pagina oggi è il `figcaption` del video e non una citazione firmata. Tre foto in `assets/images/` — `antonello_padolecchia`, `riccardo_porrega`, `davide-galli` — non hanno un testo corrispondente da nessuna parte nei due repo: da chiarire prima di usarle.

## 18 settembre 2026 — la recensione prende la superficie scura

Il difetto della prima versione, detto da Luca: la citazione non si distingue dal resto del contenuto. Vero — un `blockquote` con il filetto a sinistra, a colpo d'occhio, è un paragrafo come gli altri, solo un po' rientrato. La foto dell'autore aveva risolto la credibilità, non la gerarchia.

Tre varianti esplorate in `grafica-recensione.html`, ognuna dentro la sezione vera con il testo che la circonda — lo stacco si giudica solo in mezzo al contenuto, non su fondo bianco:

- **A, superficie invertita**: il blocco diventa nero, testo chiaro sopra.
- **B, virgoletta corallo**: piatta, stacco per scala (24px contro 16) più la virgoletta in Archivo Black corallo.
- **C, fuori colonna**: firma in testa, due filetti neri, e da 768px il blocco che sborda a sinistra nella gronda della sidebar.

**Scelta: A.** L'argomento che la regge è che non è una decorazione aggiunta al brand, è il brand: `brand-style.md` dice "sfondo scuro di default, testo chiaro sopra — non un tema alternabile, è la scelta di brand". Il sito ne adotta la variante light; la recensione si riprende la superficie nativa per un blocco solo. In più non spende colore: il corallo resta al CTA, come vuole il principio 2 ("un solo elemento in accento per vista"). B lo spendeva, e sulla recensione lunga di Falvella i 24px diventavano un muro; C era il gesto più forte ma rompeva l'incolonnamento di tutta la pagina per un elemento che ricorre tre volte.

**`.c-quote`** (`css/components/quote.css`), classe sul `blockquote`, niente altro nel markup. La cosa da ricordare è come ricolora i figli: ridefinisce `--color-text` e `--color-text-muted` **su di sé**, così nome e provenienza della firma si adeguano da soli. `.c-byline` continua a non sapere niente della superficie su cui sta — è la ragione per cui i due componenti non si sono intrecciati.

Struttura e default nel componente (`--quote-bg`/`--quote-fg` ricadono su `--color-secondary`/`--color-on-secondary`), valori nel tema: `theme-brand.css` li porta a nero, bianco sporco e grigio neutro (#8C8C94 su #0E0E10 ≈ 5.4:1, passa AA). Il default di `--quote-fg-muted` è `--quote-fg`, non un grigio: senza tema, meglio un testo secondario poco differenziato che uno illeggibile.

**Una cosa da tenere d'occhio**: i blocchi scuri in pagina ora sono tre. Erano un'eccezione quando erano uno; a tre, il rischio è che diventino un motivo ricorrente e perdano l'effetto — da rivalutare quando entreranno le altre recensioni, che erano previste proprio per le altre sezioni.

**Nota di metodo, costata dieci minuti**: il CSS sembrava non applicarsi e la causa era la cache del browser, non la cascata. Un ricaricamento normale non basta — i `<link>` vanno riletti con un parametro nuovo (o hard reload) prima di concludere che una regola non funziona.

## 18 settembre 2026 — le FAQ, riscritte dal vecchio sito

Punto di partenza: le 12 domande frequenti di `mucca-website/public/index.html`. Buon materiale, ma scritto per un corso diverso — 4 mesi invece di 3, ricevimento tutti i giorni, Discord, Windsurf, Figma, le "milestone". Riportarle così com'erano avrebbe messo in pagina informazioni false su cose verificabili.

**Dove sono finite: ultima sezione, dopo "Ammissione alla prossima classe".** Le obiezioni residue si sciolgono dopo aver letto prezzo e processo, non prima: chi legge "987€" e "12 posti" arriva alle FAQ con le domande già formate. Prima dell'ammissione avrebbero risposto a domande che il lettore non si era ancora fatto.

**Cosa è cambiato rispetto alle vecchie.**

- **Tre le ho eliminate.** "In cosa è diverso dai corsi tradizionali" (c'è già una sezione intera che risponde), "Che cosa sono le milestone" e "Chi valuta le milestone" (accorpate: le milestone non si chiamano più così, sono le consegne dei moduli).
- **Una diceva l'opposto di questa pagina.** La vecchia "Mi aiuti con lavoro, CV o colloqui?" rispondeva "non faccio supporto carriera, il focus è la crescita delle skill". Ora il Modulo 3 è un modulo con consegne e c'è una garanzia sul risultato: la risposta è ribaltata. Stessa contraddizione dorme ancora in fondo a `content.md`, nel blocco "A scanso di equivoci" che chiama la ricerca del lavoro "un Bonus" — è materiale archiviato, ma prima o poi va tolto o marcato come superato, se no qualcuno lo ripesca.
- **Quattro risposte le ha decise Luca**, perché non erano deducibili dal repo: le lezioni **sono** registrate (rete di sicurezza, non alternativa al live); **non** si parte da zero (serve un corso base fatto o un lavoro già cominciato); gli strumenti sono Excalidraw, Claude Code, Git/GitHub, Skool, Drive — **niente Figma**; il ritiro resta rimborsato al 100% entro due settimane dall'inizio.
- **Due sono nuove.** "Le lezioni sono registrate?" non trovava risposta da nessuna parte in pagina, ed è la prima domanda che si fa chiunque valuti un corso live. E "Devo sapere l'inglese?": la garanzia vale per chi cerca sui mercati internazionali, quindi l'inglese è un requisito della promessa più importante della pagina e non era detto in nessun punto.

**Sul "posso partire da zero": attenzione a una frizione.** La risposta ora è no, ma la sezione "Per chi è perfetto questo corso" apre con "Chi vuole iniziare una carriera come UX/UI Designer". Le due cose convivono se si legge "iniziare una carriera" come "non lavoro ancora, ma una base ce l'ho" — ed è così che l'ho scritta ("iniziare una carriera sì, iniziare da zero no"). Se però il messaggio deve essere davvero "serve una base", quel primo punto va reso esplicito: oggi si regge su una lettura, non su una frase.

**Niente `.c-faq` attorno alla sezione.** Il fondino di quel componente serve a ritagliare un blocco FAQ dentro un'altra sezione; una sezione che è già solo FAQ ha la sua identità nell'h2 della sidebar, e un fondino alto quanto undici accordion avrebbe aggiunto una terza superficie alla pagina dopo le citazioni scure. `.c-accordion` funziona da solo — era il punto di quel componente.

## 18 settembre 2026 — `motivation.html`, e il set di icone entra in pagina per la prima volta

Pagina nuova: una lista di risorse per chi ha un obiettivo — due voci per ora, Arnold e *The Go-Getter*. Struttura a colonna singola (`.l-page`, come `garanzia.html`), footer standard, link di ritorno alla home e non al Master: la pagina non appartiene al funnel del corso, sta per conto suo.

**Il layout è una bibliografia, non una griglia di card.** Icona del tipo, titolo che è il link, una riga di metadati, il motivo per cui vale la pena. Le voci si separano con un filetto: niente fondini, niente box, niente ombre. Con due risorse una griglia di card sarebbe stata un vestito più grande del corpo, e la lista cresce bene fino a venti voci senza cambiare forma.

**Le icone del repo erano mai state usate.** `assets/Icons_v1.0.2/` sta lì da mesi e `design-system.md` ne descriveva la convenzione — SVG inline, `.primary`/`.secondary` agganciate ai token — ma nessuna pagina l'aveva mai messa in pratica. Ora esiste `.c-icon` (`css/components/icon.css`) e la convenzione è codice, non solo prosa.

**Sono allineate al brand?** Sì, con un'osservazione. Il set è a due tinte, e il brand dice "piatto, niente decorazioni". Ma le due tinte qui sono `--color-icon-primary` e `--color-icon-secondary`, che il tema brand porta a nero e grigio neutro: due valori dello stesso grigio-nero, non una seconda tinta cromatica. Il corallo non entra in nessuna icona — resta l'unico accento, da spendere dove conta.

**Nessun accento in pagina, ed è voluto.** Il corallo comparirebbe come unico elemento consentito, ma qui non c'è un CTA né un elemento che meriti di attirare tutto lo sguardo: una lista di risorse vuole che li guardi tutti. L'accento resta sull'hover dei link, che il tema già dà ed è transitorio.

**Una nota manca, e non l'ho inventata.** Il motivo per cui vale la pena ascoltare l'episodio di Arnold lo deve scrivere Luca: non l'ho ascoltato. Nel markup c'è un commento `TODO` nel punto esatto, e il componente prevede `__why` come opzionale — la voce regge anche senza.

**Passati dall'indice privato**, come chiede la sua stessa riga d'istruzioni: aggiunte `motivation.html`, `grafica-recensione.html` e `garanzia.html`, che era rimasta fuori quando è stata creata.

## 18 settembre 2026 — il video introduttivo nell'hero

Il TODO nell'hero chiedeva esattamente questo: «sostituire il placeholder con la figure `.c-video` (facade Vimeo), stessa markup del video in "Come insegno"». Fatto, con il video 1228030700. Il placeholder e la sua regola in `layout.css` sono spariti: erano codice vivo solo finché il video non esisteva.

**Il link di partenza non era Vimeo.** Luca aveva mandato un link CleanShot (`link.mucca.design/V7dw67rG`): un MP4 da 24 MB su un servizio di screenshot, con la URL finale firmata, a scadenza, e servita come `attachment` — quindi il browser la scarica invece di riprodurla. Tre strade sul tavolo (Vimeo, file nel repo, iframe CleanShot); ha scelto Vimeo, che è anche l'unica che non aggiunge un terzo host alla pagina e riusa il componente che c'era già.

**Due cose del componente erano scritte per un video solo, e si sono viste subito.**

La prima: `aspect-ratio: 16 / 9` era scolpito nel CSS, e questo video è 2004×1080 (1,855:1). Un 16/9 imposto gli avrebbe messo due bande nere dentro un box che ha già i suoi angoli arrotondati. Ora è `--video-aspect-ratio`, e l'overlay se lo copia dal box sorgente all'apertura invece di avere il suo fisso.

La seconda, invisibile finché non l'ho guardata a schermo: **il play bianco su una thumbnail bianca non c'è**. Il glifo è un disco pieno con il triangolo ritagliato, pensato per la thumbnail scura del video di Ilaria; la thumbnail di questo è una slide chiara, e il bottone semplicemente spariva. Ora c'è `--video-play-color`, e l'istanza dell'hero lo porta a nero. È l'unico pezzo del componente legato all'immagine e non al layout: se il video cambia, quel valore va ricontrollato — annotato in `componenti.md`.

**Una terza l'ho vista prima che mordesse.** `video-facade.js` cercava `.closest('.l-section__content')` per decidere su cosa allargare l'overlay, e l'hero quella colonna non ce l'ha: ricadeva su `document.body`, e l'overlay si apriva 1470×827 su un viewport alto 746 — più alto dello schermo, con il video tagliato sopra e sotto. Aggiunto `.l-hero` come secondo anello della catena: ora si apre a 1080×582 e ci sta. Verificato che l'altro video sia rimasto identico, 16/9 e allargamento sulla colonna di contenuto.

**Sulla didascalia**: avevo scritto «Come lavora un Design Engineer: 5 minuti», e l'ho corretta prima di lasciarla. Non avevo visto il video: stavo descrivendo un contenuto che non conoscevo. Ora dice «Video introduttivo — 4:49», che sono due fatti verificabili (l'inquadratura del TODO e la durata dall'API di Vimeo). Se il video merita una didascalia che dica cosa mostra, quella la scrive chi l'ha girato.

**Nota di metodo, la seconda volta oggi**: anche qui il CSS e il JS sembravano non applicarsi, ed era di nuovo la cache. Un `location.reload()` non basta: serve un hard reload vero (cmd+shift+R), se no si continua a testare il file vecchio credendo di testare il nuovo.

## 18 settembre 2026 — il video dell'hero esce da Vimeo e torna in casa

Su Vimeo era sfocato, in locale no. Ho sbagliato la prima diagnosi: avevo dato la colpa al bitrate del master (534 kbps a 1080p60), ma per una registrazione di schermo quasi immobile quel numero è normale — i bit vanno solo alle zone che cambiano, ed è per questo che il file originale è nitido. Le cause vere restano due, e nessuna delle due è il file: il player Vimeo sceglie la resa in base alla dimensione del riquadro (443 px nell'hero: gli basta un 360p), e comunque un sorgente largo 2004 viene ricampionato a 1920, che sul testo si vede.

Invece di rincorrere il player, **il video è entrato negli asset**: `assets/video/video-hero.mp4`, 23 MB, con il suo poster estratto con ffmpeg a un secondo. Nessuna ricompressione: il file è quello che Luca vede nitido sul suo Mac, bit per bit.

**E niente facade.** La facade esiste per non far partire una richiesta a un terzo finché l'utente non clicca; con un file nostro quel problema non c'è, e `preload="none"` fa già tutto — il browser non scarica un byte del video finché non si preme play. Quindi `<video controls>` e basta: controlli nativi, fullscreen del browser incluso, zero JavaScript. Verificato a schermo che il poster compaia e che `networkState` resti inattivo a pagina caricata.

**Il componente ora ha due modi**, documentati in `componenti.md`: facade per i video di terzi, `<video>` nativo per i nostri. Il box è lo stesso, cambia cosa ci sta dentro.

**Tre cose introdotte poco fa e subito rimosse**, perché servivano solo alla facade nell'hero che non esiste più: `--video-play-color` (il play bianco invisibile sulla thumbnail chiara), `.l-hero` nella catena del contenitore dell'overlay in `video-facade.js`, e la copia del rapporto d'aspetto sull'overlay. Tenerle sarebbe stato codice morto con un commento che spiega un caso scomparso. Resta `--video-aspect-ratio`, che serve ancora: il box dell'hero è 2004×1080, non 16/9.

**Da sapere**: 23 MB di binario entrano nella storia di git e ci restano. Per un file che non cambierà più va bene, ma se il video verrà rigirato più volte conviene decidere prima se tenerlo fuori (Git LFS, o un asset non versionato caricato a mano su Netlify) — altrimenti il repo si porta dietro ogni versione.

## 18 settembre 2026 — quattro ipotesi per l'hero

«Così com'è non va bene», senza dire perché. Prima di proporre, quattro difetti messi in fila, in ordine di gravità: **l'h1 è il nome del prodotto** («Master UX/UI Design») e la promessa («Diventa Design Engineer») sta sotto, piccola e in peso normale; **sette blocchi impilati** senza una dominante; **la lista numerata compete col titolo** e anticipa cose che la pagina ripete venti righe dopo; **il video sta al 45% e centrato**, cinque minuti che spiegano tutto trattati come illustrazione di contorno.

Le quattro varianti in `hero-iterazioni.html` sono **quattro ipotesi, non quattro restyling** — ognuna scommette su una cosa diversa, e sotto ognuna è scritto anche cosa costa:

- **A, la promessa in testa**: scambio fra h1 e occhiello, i tre punti contratti in una frase. Cinque blocchi invece di sette. Il cambio più piccolo che risolve il difetto principale.
- **B, il video è l'hero**: colonna unica centrata, video grande, una riga. Scommette che cinque minuti vendano più di qualsiasi paragrafo — e infatti dipende tutta da quante persone premono play.
- **C, manifesto**: solo testo, titolo a 72px, il video scende sotto dove può essere grande davvero. È l'unica che su mobile tiene titolo, frase e bottone sopra la piega.
- **D, scheda del corso**: promessa a sinistra, a destra un riquadro con partenza, durata, posti e prezzo. È l'unica che discute **a chi** stiamo parlando invece di come dirlo: presuppone un pubblico che ti conosce già e vuole i dati.

Sotto ogni hero c'è una riga finta di contenuto seguente: senza, non si vede dove l'hero finisce né quanto pesa rispetto a ciò che lo segue.

Il copy è quello vero ovunque possibile. Dove cambia (la frase unica di A, «Guarda come lavoro. Poi decidi.» di B) cambia perché l'ipotesi lo richiede, e i numeri citati — 12 posti, 987€, 9 novembre, garanzia a sei mesi — vengono tutti da `content.md`.

## 18 settembre 2026 — l'hero diventa un manifesto col video al centro

Scelta la variante B fra le quattro di `hero-iterazioni.html`, con due correzioni di copy di Luca: la riga sotto il titolo è «Obiettivo: trovare lavori (interessanti).» e la riga in fondo chiude con la data della prima live invece che con i posti disponibili.

**Cosa cambia nella sostanza**: l'h1 non è più il nome del corso ma la promessa («Diventa Design Engineer»); il nome scende a occhiello insieme alla data di partenza; i tre punti in lista se ne vanno — li ridice la pagina venti righe dopo; il video passa da colonna laterale al 45% a protagonista centrale. Da sette blocchi impilati a cinque, con una dominante chiara.

**La scommessa è dichiarata**: questa variante vale se le persone premono play. Chi non lo fa riceve un titolo, una riga e un bottone — pochissimo. Se i dati diranno che il video lo guarda una minoranza, la variante A (promessa in testa, ma con la frase che riassume le tre cose) è il ripiego già pronto.

**`.l-hero` è stato riscritto, non affiancato da una variante.** La griglia 55/45 non la usava più nessuno: `content.html` e `mini-corso/index.html` hanno nell'hero solo h1 e tagline, e quella griglia glieli metteva in due colonne affiancate — non credo fosse voluto. Ora l'hero è una colonna sola centrata, larghezza di lettura (780) e non quella del container: un titolo display a tutta pagina si spezza male e la riga sotto diventa troppo lunga. Verificate tutte e tre le pagine a schermo: le altre due ne escono più ordinate di prima.

Nuovo elemento di layout: `.l-hero__eyebrow`, l'occhiello in maiuscoletto spaziato che tiene il nome del prodotto fuori dall'h1.

**Una ridondanza lasciata di proposito**: la riga finale dice «4 live gratuite a ottobre · Prima live 7 ottobre 2026» — «ottobre» compare due volte. È il testo chiesto, e la data esatta vale la ripetizione; se dà fastidio, «4 live gratuite, la prima il 7 ottobre» dice le stesse due cose una volta sola.

## 18 settembre 2026 — l'email si lascia già dall'hero

Il bottone «Iscriviti al pre-corso gratuito», che portava alla sezione più in basso, è diventato il form vero: campo email e bottone sulla stessa riga, sotto il video. Un passo in meno fra chi ha appena guardato il video e l'iscrizione. Sotto, la riga di servizio dice cosa succede lasciando l'email: «4 live gratuite a ottobre · Prima live 7 ottobre 2026 • Lascia l'email: ricevi il link per le live e i replay. Nient'altro.»

`.l-hero__actions` è sparito: non lo usava nessun'altra pagina, e ora il contenitore è `.l-hero__form` — largo al massimo 480, centrato, con `text-align: left` perché il centrato dell'hero si eredita **dentro** il campo, e una email che si scrive dal centro è sgradevole da compilare. Su schermo stretto è `.c-form` che manda il bottone sotto da sé, senza regole nuove.

**Due form con lo stesso `form-name`, e va bene così.** Netlify li registra per nome: quello dell'hero e quello della sezione finiscono nella stessa lista, che è quello che si vuole — una lista sola di iscritti al pre-corso. Per non perdere l'informazione di dove è avvenuta l'iscrizione, ognuno porta un campo nascosto `origine`, `hero` e `sezione`. Senza, le due erano indistinguibili nel pannello, e la domanda «il video converte?» non avrebbe avuto risposta — che è esattamente la scommessa su cui poggia questa versione dell'hero.

## 18 settembre 2026 — ordine nel repo, e la pagina che mancava dopo il form

Tre cose in fila prima del push: mettere ordine, rileggere il contenuto cercando le sviste che costano una conversione, e riallineare il materiale di marketing. Il sito era già online su `www.mucca.design` da giorni, ma `main` locale era **tre commit avanti** sul remote e con mezzo repo non committato: in produzione girava ancora l'hero vecchio e `garanzia.html` rispondeva **404**, pur essendo linkata due volte dalla landing.

### La svista più cara non era nel codice

Il form del pre-corso funziona: Netlify li ha registrati entrambi (la risposta live mostra il markup già post-processato). Il problema stava **dopo**. Chi lasciava l'email atterrava su `/mini-corso/`, una pagina intitolata «Mini corso» con **tre** moduli — contro quattro live — tre immagini placeholder e la didascalia «Video in arrivo». Da nessuna parte c'era scritto che l'iscrizione era andata a buon fine, né quando fosse la prima live, né che il link sarebbe arrivato via email.

Era già la decisione **D6** di `marketing-actions.md`, presa l'11 settembre e mai eseguita. Ora la pagina è una conferma vera: «Ci sei», cosa succede adesso, le quattro date con i titoli (riusando `.c-schedule`, che esisteva già), i replay, e il link di ritorno.

**Una riga è scritta così perché l'invio è manuale** e vale la pena ricordarselo: «ti scrivo io qualche giorno prima della prima live». Netlify Forms salva la submission e avvisa il proprietario — al sottoscrittore non manda niente. Finché non c'è uno strumento di invio, la pagina deve dire la verità su chi scrive e quando, altrimenti la persona resta in attesa di un'automazione che non esiste. Da qui anche l'invito ad aggiungere l'indirizzo ai contatti: l'unica email che riceverà è una scritta a mano da una casella con cui non ha mai parlato.

### Il link condiviso su LinkedIn era nudo

`og:image` era ancora un `TODO` in testa a `master-ux-ui.html`. Il difetto non si vede visitando il sito: si vede quando il link viene incollato in un DM, che è **l'unico canale di acquisizione previsto per ottobre**. Ora l'immagine è il poster del video dell'hero (1280×690, già nel repo, nessun asset nuovo da produrre), con `og:url` assoluto e `twitter:card`. Stessa cosa su `garanzia.html`, che aveva il TODO gemello.

### L'hero non diceva cosa si riceve

Il journal di stamattina descriveva la riga di servizio come «4 live gratuite a ottobre · Prima live 7 ottobre 2026 • Lascia l'email: ricevi il link per le live e i replay. Nient'altro.» In pagina c'era solo la prima metà. Chi si ferma all'hero — cioè quasi chiunque arrivi da un DM — vedeva un campo email senza sapere cosa ne esce. Ripristinata intera, con la data esatta al posto del generico «a ottobre».

### `marketing-actions.md` portava il calendario di una settimana prima

Diceva live il 14/21/28 ottobre e il 4 novembre, partenza il **16 novembre**, mentre `strategia-marketing.md` §8, il sito e `garanzia.html` dicono **7/14/21/28 ottobre** e partenza **9 novembre**. È il file da cui si prendono le date per scrivere i DM: una settimana di errore dentro un messaggio di outreach non si recupera. Riallineato tutto — tabella, piano settimanale, finestra di chiusura.

**E le soglie della garanzia in fondo a quel file sono state buttate**, non aggiornate. Erano una bozza dell'11 settembre; `garanzia.html`, scritta dopo, ha preso decisioni diverse e più severe: inglese **C1** invece di B2, **quattro** progetti in portfolio invece di tre, **24 settimane su 26** invece di 20, **sei** check-in mensili invece di tre. E soprattutto scadenze **relative** all'ultima lezione invece che date assolute ancorate al 16 novembre — che è la ragione per cui la pagina non si è rotta quando il calendario si è spostato e il file di marketing sì. Al loro posto c'è una tabella che mostra le due versioni a confronto e dice quale vale.

### Cosa è uscito dal repo

- **`content.html`**, la vecchia landing. Aveva esaurito la funzione, ma restava pubblicata: Netlify ne registrava i due form (`mini-corso`, e un secondo `lascia-messaggio`) sporcando il pannello con liste fantasma. Rimossa con tutti i suoi riferimenti — cinque in `componenti.md`, uno in `design-system.md`, uno nel README, uno nell'indice privato. I «dove usato» dei componenti ora puntano a `master-ux-ui.html`, che è dove quei componenti vivono davvero.
- **`export-md/design-system.html`**: un export generato il 27 luglio e mai più toccato, mentre il `.md` sorgente è di settembre. Descriveva un design system che non esiste più.
- **`spiega/`** resta nel repo e su GitHub — è lì che serve — ma esce dal sito con un redirect 404 in `netlify.toml`. Un `X-Robots-Tag` non sarebbe bastato: toglie dai motori, non dalla rete.
- `contenuto.md` (0 byte) e tre righe morte nell'indice privato, che puntavano a file rimossi o gitignorati.

**`brand-kit/` invece resta pubblicato**, e vale la pena scriverlo perché a occhio sembra documentazione: `brand-tokens-light.css` è caricato da **quindici** pagine, `master-ux-ui.html` inclusa. Toglierlo dal deploy spegnerebbe il tema ovunque.

Committato anche **`.claude/settings.json`**, che finora era fuori dal repo pur contenendo l'hook della tipografia: è una regola di progetto, non una preferenza di questa macchina. `settings.local.json`, che invece lo è, è finito in `.gitignore`.

### Due cose viste solo guardando a schermo stretto

**`.c-schedule` non aveva un comportamento mobile.** La colonna della data era fissa a 108px a qualsiasi larghezza: a 390px lasciava al testo meno di 250 pixel, e ogni titolo si spezzava in tre righe. Ora sotto i 768px la data sta su una riga sua, in orizzontale («14 ott mercoledì, 19:00»), e il testo prende tutta la colonna. Sopra, le due colonne affiancate come prima — verificato che il desktop sia rimasto identico. Il difetto era già in pagina da stamattina: nessuno aveva guardato quel componente a larghezza di telefono, che è esattamente da dove arriveranno i lettori del DM.

**Nota di metodo, la terza volta in due giorni**: il CSS sembrava non applicarsi, ed era di nuovo la cache. Stavolta il test girava dentro un iframe largo 390px — un modo onesto di provare le media query senza rimpicciolire la finestra — e ricaricare l'iframe non basta: vanno riscritti gli `href` dei `<link>` con un parametro nuovo, se no si continua a misurare il foglio di stile vecchio.

### Due aggiunte piccole con una ragione precisa

**`404.html`**: serviva comunque al redirect di `spiega/`, e il sito non ne aveva una. Dice dove andare invece di lasciare la pagina bianca di Netlify.

**La home ora linka il corso.** `index.html` era un biglietto da visita con la sola email: chi cercava «mucca design» dopo aver letto il DM trovava un vicolo cieco. Una riga sopra i contatti. Se la scelta di tenere la radice muta era voluta, è un `git revert` di una riga — ma vale la pena riconfermarla adesso che la landing è viva.

### E la cosa che non è un file

Prima live: **7 ottobre**, fra diciannove giorni. `strategia-marketing.md` §8 chiede 400-600 contatti per arrivare a 60-80 iscritti al pre-corso, cioè ai 12 studenti; LinkedIn permette ~100-200 inviti a settimana, quindi il tetto fisico è ~270-540 contatti — **partendo oggi e senza saltare un giorno**. L'outreach non è ancora partito: in repo non c'era nessuna lista né journal, benché il piano lo prevedesse dal 14 settembre.

Aperto `outreach.md`, che è anche lo strumento che il Modulo 3 chiede agli studenti. Ma il numero da guardare non è lì: **la coorte da 12 non è più lo scenario centrale**, ed è una decisione da prendere adesso e non a metà ottobre. §8 lo contemplava già («un pre-corso con 20 iscritti si tiene lo stesso e produce le registrazioni per la coorte 2»).

## 19 settembre 2026 — Tre recensioni in più nel Master

Da tre a sei citazioni firmate in `master-ux-ui.html`, ognuna accanto alla sezione che conferma:

- **Andrea Schiavon**, in fondo a «Come insegno?»: «non ci hai mai fatto vedere una slide» conferma il primo punto della lista, «Ti mostro come faccio, non te lo racconto». Al suo posto c'era stata per poco Ilaria Bottinelli, tolta: la sua frase ripeteva quello che dice già nel video sopra.
- **Andrea De Nuccio**, sotto il secondo form del pre-corso: «Non vedevo l'ora di collegarmi a lezione» è la cosa giusta da leggere subito dopo aver lasciato l'email per una live. Corretto nel copy un refuso («II famoso» → «Il famoso»).
- **Bryan Zanella**, in fondo a «Risultati, non promesse»: è l'unica delle rimaste che parla del lavoro prodotto («è tutto un altro livello», «super analitico»), non dell'insegnante. Testo dal vecchio sito, aggiunto anche a `content.md`.

Foto di Andrea Schiavon e Bryan Zanella ridotte a 184px webp come le altre. Resta senza collocazione Nicolò Giglietti.

Poi altre due, con il testo arrivato oggi (non stava in nessun file del repo né del vecchio sito):

- **Antonello Padolecchia**, in fondo ad «Ammissione alla prossima classe», subito prima delle FAQ. Nella prima versione stava sotto Stefano Falvella in «Cosa rende diverso questo corso?»; spostata qui, chiude la parte pratica (costi, date, ammissione) prima delle domande.
- **Riccardo Porrega**, in fondo a «Programma del corso»: un ringraziamento generico, messo in una sezione che non aveva voci di studenti.

Correzione alla voce del 18 settembre («le recensioni prendono una faccia»): per `davide-galli.webp` il testo c'è, nel vecchio sito (`mucca-website/public/pages/chi-sono.html`, firmato «Senior Developer and Architect»). Non ancora in pagina.


## 19 settembre 2026 — il video di Ilaria parte al suo posto

Il video in «Come insegno?» non apre più l'overlay: al click la facade lascia il posto al player Vimeo dentro lo stesso box, e per ingrandirlo c'è il fullscreen dei controlli. È un'opzione della facade (`data-inline` in `js/video-facade.js`), non un cambio di comportamento generale: senza l'attributo l'overlay funziona come prima.

## 19 settembre 2026 — il bottone del pre-corso su mobile

Su iPhone il bottone «Iscriviti al pre-corso gratuito», andato a capo sotto il campo email, restava largo quanto il suo testo: in verticale sembrava un errore, in orizzontale peggio. Ora in entrambi i form (hero e sezione «Iscriviti»):

- **quando va a capo si allarga a tutta la riga**, come il campo sopra;
- **quando c'è spazio sta in riga col campo**, come su desktop.

Niente breakpoint nuovo: il punto in cui si passa da una forma all'altra dipende dalla larghezza del testo del bottone, e lo decide lo spazio reale con due flex-grow sproporzionati (999 sul campo, 1 sul bottone — dettaglio in `css/components/form.css`). Misurato: impilati fino a ~570px di viewport (iPhone in verticale), in riga da ~667 (iPhone in orizzontale).

La riga «4 live gratuite…» sotto il form dell'hero è allineata a sinistra sotto i 768px, a destra da 768 in su (il breakpoint unico del sito).

Stesso giro su iPhone: gli sketch delle tre step card in «3 sfide per il Junior Designer di oggi» sotto i 768px erano a tutta larghezza e risultavano ingranditi. Ora `max-width: 80%`, centrati; da 768px, con le card in riga, tornano a riempire la card.

## 19 settembre 2026 — tre progetti, quattro moduli

Il programma elencava due progetti (Coffee Machine, Press Office) mentre «Risultati» ne mostrava tre. Sono tre: **Pound 4 Pound**, il gestionale per una palestra di sport da combattimento, entra come **Modulo 3** (app mobile: lezioni, atleti, certificati). Nella prima edizione l'aveva scelto Roberto di sua iniziativa; ora è nel programma.

Il portfolio e la ricerca del lavoro diventano **Modulo 4**. Rinumerati tutti i riferimenti: FAQ del Master, `garanzia.html` («le esercitazioni dei quattro moduli»), `outreach`, `marketing-actions`, `content.md`. Il portfolio finale contiene «i tre progetti del corso».

Nasce insieme alla bozza di **«Cosa ti porti a casa»**, subito prima del programma: cinque risultati (interfacce complesse, AI per un'app intera, tre progetti in portfolio, un portfolio presentato meglio, strategie oltre LinkedIn). Prima si legge cosa ottieni, poi come ci arrivi.

Pound 4 Pound non è un cliente pagante ma è un progetto reale: nasce da Nimesh Palakuttige, ex studente e founder di una startup che quel gestionale lo sta costruendo. Detto in «Retroscena», accanto a Rancilio/Egro e Mediaddress, e nel punto 3 di «Cosa ti porti a casa» («due partono da specifiche simili a quelle dei clienti, il terzo da una startup»).

## 21 settembre 2026 — il design system diventa una cartella, con i campioni

Domanda di partenza: gli esempi di interlinea si capiscono solo vedendoli, ma una pagina di esempi accanto a `design-system.md` sembra creare due fonti di verità.

Non le crea, per due motivi. **Non contengono la stessa cosa**: il `.md` dice *perché* l'interlinea scende quando il corpo cresce, l'`.html` mostra 48px e 18px alla stessa interlinea uno accanto all'altro. Un campione non si scrive in Markdown e una spiegazione non si legge in un campione. **E la pagina non descrive il sistema, lo esegue**: ogni campione riceve i token per custom property (`--sample-lh: var(--line-height-snug)`, mai `1.3`), quindi segue `tokens.css` da sé. L'unica cosa che può divergere è la prosa, che sta in un posto solo.

La regola, che è anche l'unico modo di sbagliare: *il `.md` spiega e decide; l'`.html` mostra, e per ogni campione ha una riga sola di didascalia. Se stai scrivendo un paragrafo dentro l'HTML, sta andando nel posto sbagliato.*

Scartate: tenere solo l'HTML (il ragionamento finirebbe nei commenti del markup, illeggibile in diff) e generare un file dall'altro (serve un build step, che il repo esclude).

Struttura: `design-system/` con `index.html` (indice e rationale), `design-system.md` (spostato, nome invariato così i «vedi design-system.md» sparsi nei commenti CSS restano validi) e `design-system.html` (i campioni). Precedente nel repo: `componenti.md` + `componenti.html`, che già dividevano così senza che la regola fosse scritta.

I campioni: interlinea (le quattro bande, più i due confronti che hanno prodotto `snug`), scala tipografica (nome del token e corpo reale — i numeri restano solo in `tokens.css`), colori semantici (fondo + testo, non quadrati: la domanda è se si legge), spaziatura, pesi del font, focus ring sui fondi colorati, ombre.

## 21 settembre 2026 — chi si prende una superficie si prende quello che ci sta sopra

Il frammento `.md` dentro la citazione dell'indice del design system era bianco su grigio chiaro. Non era un difetto di quella pagina: `.c-quote` ha fondo nero e `code` si teneva il fondino chiaro che `base.css` gli dà pensando alla pagina. Vale per tutte e 12 le citazioni del sito — nessuno se n'era accorto perché finora nessuna conteneva codice.

Risolto nel componente con `--quote-code-bg`, un velo chiaro al 16% invece di un colore pieno: regge su qualunque `--quote-bg` decida il tema, oggi nero e domani altro.

La cosa interessante è che è la seconda volta, e la prima l'avevamo appena documentata: `.c-icon` su fondo scuro sparisce, per lo stesso motivo. Due casi fanno una regola, ora in `design-system.md` come sezione **Superfici**: chi cambia il fondo dichiara, come variabili proprie, ogni convenzione ereditata che quel fondo rompe — `code`, colore dei link, bordi, focus ring, icone. Con la checklist da ripassare quando nasce una superficie nuova.

## 21 settembre 2026 — una cartella per argomento, non per formato

`design-system/`, `workflows/`, `books/`, `articles/` erano già nate così, una
alla volta. Fatto l'inventario della radice, il criterio si è lasciato
generalizzare: **i file che si leggono insieme stanno insieme**, e la divisione
utile è l'argomento, non il formato — un `.md` e l'`.html` che ne nasce sono la
stessa cosa in due stati, e separarli per estensione è la cosa che rompe di più.

Cinque cartelle nuove, ognuna col suo `index.html` che dice cosa c'è dentro e in
che ordine si legge:

| cartella | cosa ha assorbito |
|---|---|
| `upwork/` | `upwork.html` → `upwork/index.html`: l'indice stava fuori dalla cartella che indicizzava |
| `marketing/` | `marketing-actions` + `outreach` (`.html` e `.md`) e `strategia-marketing.md` |
| `iterazioni/` | `hero-iterazioni.html` e `grafica-recensione.html` |
| `design-system/` | `componenti.html`, `componenti.md`, `container.md` |
| `automations/` | `automations.html` → `index.html`, più `trello-twilio-automation.md` |

### Le tre cose che non erano ovvie

**La pagina «Results» non è entrata in `marketing/`.** È «Results», una pagina
pubblica, mentre la cartella contiene date non annunciate, decisioni in corso e i
nomi delle persone contattate su LinkedIn. Mescolarli non è un problema di
ordine ma di conseguenze: le cartelle di lavoro sono `noindex` con **una regola
sola** in `netlify.toml` (`for = "/marketing/*"`), e una pagina pubblica lì
dentro sparirebbe dai motori insieme al resto. Il criterio che ne esce: il
raggruppamento segue l'argomento, tranne quando taglia la linea
pubblico/riservato — lì vince quella.

L'ambiguità che ne nasceva — `/marketing` (il file) e `/marketing/` (la
cartella) convivono su Netlify, ma si distinguono per una barra — è stata
chiusa subito: la pagina si chiama **`results.html`**, che era già il suo
titolo. Non era un problema di funzionamento: i due indirizzi si servono senza
conflitto. Era un problema di lettura, e il costo di sbagliare non è simmetrico
— chi cerca la pagina pubblica e finisce in cartella vede materiale di lavoro,
chi cerca la cartella e finisce sulla pagina si accorge subito. Il vecchio
indirizzo resta valido con un 301.

**Spostare una pagina pubblica costa un redirect.** `automations.html` era
l'unica delle cinque a essere pubblica: il vecchio indirizzo resta valido con un
301 in `netlify.toml`. Le altre quattro sono riservate e si sono spostate senza
lasciare traccia.

**Le varianti hanno due sedi, e non è una ridondanza.** In `iterazioni/` stanno
le varianti che si **escludono a vicenda** — quattro hero, di cui uno solo andrà
in pagina. In `design-system/componenti.html` stanno quelle che **convivono in
produzione**. E quando una variante riscrive la pagina intera, la sede non è né
l'una né l'altra ma un branch `feature/*` in worktree, come il portfolio.

### Il bug trovato per strada

`netlify.toml` proteggeva ancora `/your-third-workflow/*`, percorso che non
esiste dal giorno in cui la cartella è finita dentro `workflows/`. La regola
girava a vuoto da allora: i file erano raggiungibili e indicizzabili, e nessuno
se n'era accorto perché una regola che non matcha niente non fallisce, tace.
Ora è `/workflows/*`. È l'argomento più concreto a favore delle regole per
cartella: una regola per file è una riga che va aggiornata a ogni spostamento,
e non protesta quando non lo fai.

Aggiunte anche `/design-system/*` e `/iterazioni/*`, che prima non avevano
nessuna regola: la galleria dei componenti mostra copy fuori contesto e varianti
mai andate in pagina.

### Cosa non si è fatto

`personale/` (`life`, `motivation`, `manifesto`, e sotto `books/` e `articles/`)
è rimandata: annidare cartelle appena nate e ancora vuote è lavoro che si
disfa. `master/` (`master-ux-ui`, `garanzia`, `content.md`, `mini-corso/`) è il
raggruppamento logicamente più forte del repo ed è **quello da non fare adesso**:
è l'URL che sta girando nei DM dell'outreach, e si sposta a lancio finito.

`automations/` e `workflows/` restano due cartelle: i case study raccontano cosa
fa un'automazione, le cartelle di lavoro come è stata costruita. Pubblici i
primi, interne le seconde.

## 21 settembre 2026 — cinque articoli salvati da birbi.biz prima che chiuda

`birbi.biz` è il vecchio blog personale, e chiude. Tre pezzi sono stati
copiati in `articles/`, che finora era un guscio vuoto:

| qui | là |
|---|---|
| `la-via-del-codice-dialogo-2.html` | `/la-via-del-codice-dialogo-2/`, 16 dic 2024 |
| `pensiero-divergente.html` | `/pensiero-divergente/`, 3 dic 2024 |
| `la-via-del-codice-dialogo-1.html` | `/tutti-dovrebbero-imparare-a-programmare/`, 30 lug 2024 |
| `calcioclip-due-lezioni.html` | `/calcioclip-postmortem-2-lezioni-dal-fallimento-di-una-startup/`, 30 apr 2024 |
| `il-blog-piu-semplice-del-mondo.html` | `/il-blog-piu-semplice-del-mondo/`, 24 apr 2024 |

I primi tre sono arrivati per primi, gli ultimi due in un secondo giro: la
cartella era già in piedi, e aggiungerli è costato due file e due righe
d'indice. È la prova che la struttura regge — era il punto di aprirla.

**Due URL su cinque erano sbagliati o troppo lunghi.** Il primo dialogo Lo slug diceva «tutti dovrebbero
imparare a programmare», il titolo in pagina «La Via del Codice: Dialogo 1» —
residuo di un titolo precedente rimasto nell'indirizzo. Il postmortem aveva
invece uno slug di sessanta caratteri che ripeteva il titolo per intero
(`calcioclip-postmortem-2-lezioni-dal-fallimento-di-una-startup`), accorciato
in `calcioclip-due-lezioni.html`. Visto che il sito chiude e nessun vecchio
link sopravvive comunque, qui i file prendono il nome che gli serve, e i due
dialoghi si linkano a vicenda come la serie che sono.

**Le sette immagini sono state scaricate**, non linkate — le sei di Munari e
lo screenshot di Calcioclip. Stavano su un
CDN legato alla piattaforma del blog: lasciare l'`src` puntato lì avrebbe
significato pubblicare una pagina che dipende da un servizio che stiamo
chiudendo. Ora sono in `assets/images/articoli/`, con `width`/`height` in
pagina perché la griglia non salti in caricamento.

L'indirizzo `luca@birbi.biz` in fondo ai pezzi è diventato `luca@mucca.design`.
In coda a ogni articolo c'è una riga che dice da dove viene e quando è stato
scritto: un pezzo del 2024 letto nel 2026 senza quella riga sembra attuale.

### Cosa non è stato portato

«Libri su UX/UI design (bozza)», del 7 dicembre 2024. L'autore l'aveva marcato
bozza, e la decisione è stata di lasciarlo morire col sito invece di aprire
`books/` con un pezzo che non convinceva. Restano fuori anche le due liste di
link della vecchia home, «Persone che mi hanno ispirato» e «Articoli che mi
hanno ispirato»: sono segnalibri, e se servono hanno una casa diversa da
`articles/`.

### `articles/` diventa pubblica

Era `noindex` come le altre cartelle di lavoro, ma questi pezzi erano pubblici
e indicizzati su birbi.biz: tenerli fuori dai motori qui significherebbe
spegnerli nel passaggio. Tolto il `noindex` dall'indice e messe le pagine fra
le «Pubbliche» nell'indice privato. Nessuna regola in `netlify.toml`: la
cartella è pubblica, e il default è già quello.

### I primi blocchi di codice del sito

`base.css` preparava il terreno da tempo — «nessuna pagina ha ancora un blocco
di codice, ma la regola sopra senza questa si rompe il giorno che ne arriva
uno» — e i dialoghi sono quel giorno. Nasce `css/components/article.css`, che
lo carica solo chi ne ha bisogno: un font monospace su `garanzia.html` sarebbe
peso pagato per niente. Il file tiene anche `.c-figure` — una schermata a tutta
colonna col filetto attorno, perché uno screenshot su fondo bianco senza bordo
si fonde con la pagina invece di leggersi come immagine.

Due cose decise lì dentro. Il **nome di chi parla** in un dialogo è attenuato,
non corallo: il colore d'accento è del CTA, e venti battute in corallo lo
svuoterebbero. Lo **pseudocodice** ha un trattamento suo — filetto a sinistra,
niente fondo — perché nell'articolo fa un lavoro diverso dal JavaScript: è una
ricetta in italiano, si discute, non si esegue. Distinguerli a colpo d'occhio
era il senso di quel passaggio dell'articolo.

### I cinque articoli vecchi restano dove sono

Due su Smashing Magazine (2014, 2016) e tre su Medium: in `articles/` c'è la
sezione «Altrove», che li elenca e li linka. Riusato `.c-resource`, lo stesso
componente di `motivation.html` — icona, titolo che è il link, riga di
metadati — così le due sezioni della pagina sono la stessa lista con due
destinazioni diverse, e non è servito CSS nuovo.
