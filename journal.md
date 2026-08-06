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
