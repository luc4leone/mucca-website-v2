# Componenti

Documentazione dei componenti riusabili (`.c-<nome>`). Convenzioni generali in `design-system/design-system.md`.

## Button (`.c-button`)

**Scopo**: azione primaria cliccabile (CTA, submit).

**Dove usato**: form del pre-corso, nell'hero e nella sezione "Pre-corso gratuito" (`master-ux-ui.html`).

**File**: `css/components/button.css`

**Markup**:

```html
<button type="button" class="c-button">Iscriviti ora</button>
```

Anche su `<a>` quando l'azione è una navigazione, non un submit:

```html
<a href="#" class="c-button">Iscriviti ora</a>
```

**Variabili (interfaccia)**:

- `--button-bg` — default `var(--celadon)`
- `--button-fg` — default `var(--color-on-primary)` (zinc-900, contrasto ~10.7:1 su celadon)

Override per istanza, es. bottone secondario:

```html
<button type="button" class="c-button" style="--button-bg: var(--color-secondary); --button-fg: var(--color-on-secondary)">Scopri di più</button>
```

**Stati**:

- `:hover` — `filter: brightness(0.93)`
- `:active` — `filter: brightness(0.87)`
- `:disabled` — `opacity: var(--opacity-disabled)`, `cursor: not-allowed`
- `:focus-visible` — ereditato dalla regola globale (`--focus-ring-color`), nessuno stile aggiuntivo

**Stile**: minimalista — nessuna ombra, nessun bordo, un solo livello di elevazione (colore pieno), radius `--radius-8`.

## Accordion (`.c-accordion`)

**Scopo**: contenuto collassabile, mostra/nasconde la risposta a una domanda (FAQ).

**Dove usato**: blocco "FAQ" dentro "Il problema del Junior Designer da quando c'è AI", e la sezione "Domande frequenti" in fondo (`master-ux-ui.html`).

**File**: `css/components/accordion.css`

**Markup**: elementi nativi `<details>`/`<summary>` — niente JS, toggle e stato aperto/chiuso gestiti dal browser.

```html
<details class="c-accordion">
  <summary>Domanda?</summary>
  <ul>
    <li>Risposta, punto 1.</li>
    <li>Risposta, punto 2.</li>
  </ul>
</details>
```

**Variabili (interfaccia)**: nessuna esposta per ora — non ce n'è ancora bisogno con un solo caso d'uso.

**Stati**:

- **Chiuso** (default): icona `+` a destra della domanda.
- **Aperto** (`[open]`, attributo nativo di `<details>`): icona diventa `×`, contenuto visibile.
- `:focus-visible` sul `<summary>` — ereditato dalla regola globale.

**Accessibilità**: `<details>`/`<summary>` è un disclosure widget nativo — operabile da tastiera (Invio/Spazio su `<summary>` focus) e stato espanso/collassato annunciato automaticamente dagli screen reader, senza bisogno di `aria-expanded` gestito a mano.

**Stile**: minimalista — nessuna animazione di apertura (native, istantanea), un solo bordo inferiore per separare le voci, icona come unico indicatore di stato.

**Nota**: `git`/`GitHub` corretti da refusi ("gihub", minuscolo) durante la trascrizione da `content.md`; "Il Designer Engineer" corretto in "Il Design Engineer" (refuso, incoerente col resto del documento); "mockups" adattato in "mockup" (uso italiano, plurale invariato).

## Step cards (`.c-step-cards` / `.c-step-card`)

**Scopo**: sequenza di 2+ step numerati, con freccia di collegamento tra un box e il successivo. Basato su uno sketch fornito dall'utente.

**Dove usato**: sotto-sezione "Le soluzioni che offre questo corso" dentro "Il problema del Junior Designer da quando c'è AI" (`master-ux-ui.html`), al posto del paragrafo prosa "Diventa Design Engineer sono le fondamenta...".

**File**: `css/components/step-cards.css`

**Markup** (variante `sketch`, attuale in produzione):

```html
<div class="c-step-cards">
  <div class="c-step-card" data-variant="sketch">
    <img class="c-step-card__sketch" src="assets/images/step-card-sketch-1.svg" alt="Step 1: Diventa Design Engineer">
    <audio class="c-step-card__audio" controls src="assets/audio/step-card-audio-1.m4a"></audio>
  </div>
  <span class="c-step-cards__arrow" aria-hidden="true">➡️</span>
  <div class="c-step-card" data-variant="sketch">
    <img class="c-step-card__sketch" src="assets/images/step-card-sketch-2.svg" alt="Step 2: Migliora la qualità e la presentazione dei tuoi lavori">
    <audio class="c-step-card__audio" controls src="assets/audio/step-card-audio-2.m4a"></audio>
  </div>
</div>
```

Markup delle altre varianti (`corner`/`bar`/`badge`/`outline`/`ghost`, con `.c-step-card__number`/`<p>` invece della SVG): vedi `componenti.html#step-card`.

**Variabili (interfaccia)**: `--step-card-bg`, più per variante (vedi sotto) `--step-card-number-bg`, `--step-card-number-fg`, `--step-card-border`.

**Responsive**: mobile-first.

- Sotto 768px: box impilati in colonna, frecce nascoste (`display: none`).
- Da 768px: box in riga (`flex-direction: row`), frecce visibili.

**Varianti estetiche** (`data-variant`, stessa markup, regole CSS diverse per il numero — vedi `design-system.md`): galleria completa e sempre aggiornata in `componenti.html#step-card`.

- *"corner"* (default, nessun attributo): sfondo `--zinc-100`, numero in alto a destra, testo muted.
- `data-variant="bar"` — barra scura a piena larghezza in alto, numero centrato dentro (sketch utente).
- `data-variant="badge"` — pallino scuro che sborda dall'angolo in alto a destra (sketch utente).
- `data-variant="outline"` — nessun riempimento, bordo, numero a sinistra in `--color-primary`.
- `data-variant="ghost"` — **precedente in produzione**, mantenuta come riferimento (non cancellata, stesso principio dei branch scartati): numero enorme e tenue come sfondo decorativo, testo sopra.
- `data-variant="sketch"` — **attuale in produzione**, markup diverso dalle altre varianti (eccezione al "stessa markup" generale): nessun `.c-step-card__number`/`<p>`, solo un `<img class="c-step-card__sketch">`. La SVG (sketch fornito dall'utente, disegnato in Excalidraw) contiene già numero, illustrazione e testo — sostituisce del tutto il contenuto della card, il `<div class="c-step-card">` resta solo un contenitore di layout (`background: none; padding: 0`). Una SVG dedicata per step: `assets/images/step-card-sketch-1.svg`/`-2.svg`/`-3.svg` — l'`alt` di ogni `<img>` porta comunque la label testuale dello step, come alternativa accessibile al testo scritto a mano dentro la SVG.

**Audio per step (`.c-step-card__audio`)**: elemento aggiuntivo dentro `.c-step-card` (variante `sketch`), sotto la SVG — `<audio class="c-step-card__audio" controls src="...">`. Controlli nativi del browser, nessun player custom (coerente con "nessun framework/build step"). Presente su tutti e 3 gli step (`assets/audio/step-card-audio-1.m4a`/`-2.m4a`/`-3.m4a`) — resta comunque un elemento opzionale del pattern, non obbligatorio per ogni card futura.

**Stile**: minimalista — nessun bordo nel default, radius `--radius-12`. Freccia: emoji `➡️`, marcata `aria-hidden="true"` perché puramente decorativa (l'ordine è già chiaro dai numeri e dall'ordine del DOM).

## Masonry (`.c-masonry`) — solo su branch

> Su `main` nessuna pagina carica `masonry.css`: il componente è in uso su
> `feature/step-cards-v2`. Resta qui perché quel branch è vivo.

**Scopo**: griglia di immagini a colonne (effetto "masonry"), altezze diverse impaginate senza buchi vistosi.

**Dove usato**: `componenti.html` (galleria vecchia). Non più in `portfolio.html`, che dal 12 settembre 2026 usa `.c-project` + `.c-filmstrip`.

**File**: `css/components/masonry.css`

**Markup**: il contenitore `.c-masonry` viene popolato via JS a runtime (fetch di `assets/portfolio/manifest.json`), non staticamente — 56 immagini, troppe da scrivere a mano nell'HTML.

```html
<div class="c-masonry">
  <img src="assets/portfolio/1.jpg" alt="Screenshot 1 di un'interfaccia progettata da Luca Leone" loading="lazy">
  <!-- ... -->
</div>
```

**Variabili (interfaccia)**: nessuna per ora.

**Responsive**: mobile-first.

- Sotto 768px: `column-count: 1`.
- Da 768px: `column-count: 3`.

**Nota tecnica**: implementato con CSS multi-column (`column-count`/`break-inside: avoid`), non con `grid-template-rows: masonry` — quest'ultimo non ha supporto affidabile nei browser stabili. È un'approssimazione a colonne (ogni immagine scorre nella colonna più corta), non una vera masonry riga per riga, ma è l'approccio standard senza JS di impaginazione dedicato.

**`loading="lazy"`**: nativo, nessuna libreria — utile con 56 immagini nella stessa pagina.

### Overlay di ingrandimento (`.c-masonry-overlay`)

**Scopo**: click/tap su uno screenshot lo mostra ingrandito. Scoped alla colonna contenuto (non copre la sidebar), non full-viewport — scelta esplicita dopo un confronto tra pattern.

**Markup**: dentro `.c-masonry-container`, accanto a `.c-masonry`.

```html
<div class="c-masonry-container">
  <div class="c-masonry">...</div>
  <div class="c-masonry-overlay" hidden>
    <button type="button" class="c-masonry-overlay__close" aria-label="Chiudi">×</button>
    <img class="c-masonry-overlay__img" src="" alt="">
  </div>
</div>
```

**Comportamento** (JS in `portfolio.html`, nessuna libreria):

- Click su un'immagine della griglia → apre l'overlay con quell'immagine (`object-fit: contain`, ingrandita al massimo dentro la colonna contenuto).
- Click ovunque nell'overlay, tasto Esc, o bottone "×" → chiude.
- Nessuna navigazione prev/next per ora (prototipo — vedi `journal.md`).

**Nota tecnica importante**: `position: fixed` verticalmente + `left`/`width` calcolati via JS (`getBoundingClientRect()` del contenitore) ad ogni apertura e su resize. Necessario perché il contenitore (`.c-masonry-container`) è alto quanto tutta la griglia (molto più del viewport) — un overlay `position: absolute; inset: 0` centrerebbe l'immagine a metà di quell'altezza, spesso fuori dallo scroll corrente. Dettagli in `design-system.md`, sezione Z-index.

**Stati**: nessuno stato hover/focus particolare oltre al default globale. Il bottone "×" è raggiungibile da tastiera; Esc chiude.

## Avatar (`.c-avatar`)

**Scopo**: foto profilo/persona, ritagliata a cerchio.

**Dove usato**: sezione "Ciao, mi chiamo Luca Leone" — inline con float a inizio paragrafo. (Provata anche in sidebar sotto il link "Come insegno?", scartata dopo confronto diretto.)

**File**: `css/components/avatar.css`

**Markup**: uso inline con testo che avvolge (float) — stile posizionale via `style` inline sull'istanza, non fa parte dell'identità del componente, è specifico del contesto:

```html
<img src="assets/images/luca-selfie.webp" alt="Foto di Luca Leone" class="c-avatar" style="float: left; margin-right: var(--space-18); margin-bottom: var(--space-12)">
```

**Variabili (interfaccia)**: `--avatar-size` (default `var(--space-120)`) — consumata da `width` e `height`. Esposta quando è servita la prima dimensione diversa: la foto piccola nella firma di una recensione (`.c-byline`).

**Stile**: `object-fit: cover` (ritaglio pulito indipendentemente dal rapporto d'aspetto originale), `border-radius: var(--radius-full)` (cerchio).

**Nota**: le foto degli autori delle testimonianze in `assets/images/` sono il secondo uso del componente, dentro `.c-byline` (sotto). Davide Cester, Stefano Falvella, Andrea Schiavon, Andrea De Nuccio, Bryan Zanella, Antonello Padolecchia e Riccardo Porrega sono in pagina; Giglietti, Galli e Bottinelli hanno la foto ma non ancora una collocazione (la voce di Ilaria in pagina è il video in «Come insegno?»).

## Citazione di una recensione (`.c-quote`)

**Scopo**: far staccare una recensione dal contenuto attorno. Il difetto della versione precedente era esattamente questo: un `blockquote` con il filetto a sinistra, a colpo d'occhio, è un paragrafo come gli altri.

**Dove usato**: i tre `blockquote` di `master-ux-ui.html` — la recensione anonima in "Ciao, mi chiamo Luca Leone", Davide Cester in "Non è il corso giusto per tutti", Stefano Falvella in "Cosa rende diverso questo corso?".

**File**: `css/components/quote.css` — struttura e valori insieme.

**Markup**: una classe sul `blockquote`, niente di più. Dentro, la firma è `.c-byline`.

```html
<blockquote class="c-quote">
  <p>A mio parere come Teacher sei uno dei migliori che abbia avuto…</p>
  <footer class="c-byline">…</footer>
</blockquote>
```

**Variabili (interfaccia)**: `--quote-bg`, `--quote-fg`, `--quote-fg-muted`, `--quote-code-bg`. Le prime due hanno come default `--color-secondary`/`--color-on-secondary`; la terza ricade su `--quote-fg`, così senza un tema che dia un grigio leggibile sul fondo scuro il testo secondario resta comunque visibile. Il tema brand le porta a nero, bianco sporco e grigio neutro.

**Stile**: superficie piena con `--radius-4`, niente filetto a sinistra, testo a 18px. La superficie scura è quella nativa del brand (`brand-kit/brand-style.md`, principio 1: "sfondo scuro di default") — il sito ne adotta la variante light, la recensione se la riprende per un blocco solo. Nessun colore d'accento speso: il corallo resta al CTA, come vuole il principio 2.

`--quote-code-bg` è il fondo di `code` dentro la citazione: `base.css` lo dà chiaro perché lì sotto c'è la pagina, ma qui sotto c'è la superficie scura e un frammento di codice uscirebbe bianco su grigio chiaro. Il default è un velo chiaro al 16% e non un colore pieno, così regge su qualunque `--quote-bg` il tema decida.

**Come ricolora i figli**: il componente ridefinisce `--color-text` e `--color-text-muted` su di sé. Nome e provenienza della firma si adeguano da soli, senza una regola per ogni figlio — è il motivo per cui `.c-byline` non sa niente della superficie su cui sta.

**Stati**: nessuno. Non è interattivo.

**Varianti esplorate**: tre, in `iterazioni/grafica-recensione.html` — superficie invertita (questa), virgoletta corallo, fuori colonna. Le altre due restano lì come riferimento.

## Firma di una citazione (`.c-byline`)

**Scopo**: attribuire una recensione a una persona con la sua faccia — foto, nome, provenienza. Un nome senza volto è indistinguibile da un nome inventato.

**Dove usato**: nel `<footer>` dei `blockquote` di `master-ux-ui.html`, dentro `.c-quote` — Davide Cester in "Non è il corso giusto per tutti", Stefano Falvella in "Cosa rende diverso questo corso?".

**File**: `css/components/byline.css`

**Markup**: sta dentro il `<footer>` del `blockquote`, non lo sostituisce. È `base.css` a dare al footer dimensione e colore del testo secondario; il componente aggiunge solo la struttura a due righe accanto alla foto.

```html
<blockquote>
  <p>A mio parere come Teacher sei uno dei migliori che abbia avuto…</p>
  <footer class="c-byline">
    <img class="c-avatar c-byline__avatar" src="assets/images/davide_cester.webp" alt="Foto di Davide Cester">
    <span>
      <strong class="c-byline__name">Davide Cester</strong>
      <span class="c-byline__meta">classe 2 Corso UX/UI Design Boolean</span>
    </span>
  </footer>
</blockquote>
```

**Variabili (interfaccia)**: nessuna propria. `.c-byline__avatar` imposta `--avatar-size: var(--space-48)`, che è l'interfaccia di `.c-avatar`, non una variabile di questo componente.

**Stile**: `flex` con `align-items: center` e `gap: var(--space-12)`. Il nome prende `--font-weight-700` e `--color-text` (risale dal muted del footer), la provenienza resta muted. L'avatar ha `flex-shrink: 0`: a larghezze strette si accorcia il testo, non la faccia.

**Senza foto**: il componente è additivo. La recensione anonima nella sezione "Ciao, mi chiamo Luca Leone" resta un `<footer>` di solo testo, senza classe — non si inventa un volto per una valutazione anonima.

**Stati**: nessuno. Non è interattivo.

## Video facade (`.c-video`)

**Scopo**: embed video (Vimeo) con caricamento lazy — mostra solo una thumbnail + icona play finché l'utente non clicca. Al click, il video si ingrandisce in overlay fino a coprire l'intera colonna contenuto (non tutto il viewport, non la sidebar).

**Due modi, stesso box.**

1. **Facade** (`.c-video__facade` + `data-src`): per i video di terzi. Mostra solo la thumbnail finché non clicchi, così il provider non riceve nessuna richiesta da chi il video non lo guarda, e al click si apre in overlay sulla colonna di contenuto. Usato in "Come insegno?" (Vimeo).
2. **`<video>` nativo**: per i file che serviamo noi. Nessuna facade e nessun JS — non c'è una richiesta a terzi da evitare, e `preload="none"` fa già il lavoro: il file non parte finché non si preme play. Controlli nativi del browser, fullscreen compreso. Usato nell'hero di `master-ux-ui.html`.

```html
<figure class="c-video">
  <div class="c-video__box" style="--video-aspect-ratio: 2004 / 1080">
    <video controls preload="none" playsinline poster="assets/video/video-hero-poster.jpg" width="2004" height="1080">
      <source src="assets/video/video-hero.mp4" type="video/mp4">
    </video>
  </div>
  <figcaption>Video introduttivo — 4:49</figcaption>
</figure>
```

**Dove usato**: hero di `master-ux-ui.html` (file nostro, `<video>` nativo) e inline in "Come insegno?" (Vimeo, facade con float).

**File**: `css/components/video.css` + `js/video-facade.js` (nessuna libreria).

**Markup** (thumbnail piccola, float — dimensione/posizione via `style` inline sull'istanza, non fa parte dell'identità del componente):

```html
<li style="display: flow-root">
  <figure class="c-video" style="float: left; width: var(--space-216); margin-right: var(--space-18); margin-bottom: var(--space-12)">
    <div class="c-video__box">
      <div class="c-video__facade" data-src="https://player.vimeo.com/video/ID?autoplay=1">
        <img class="c-video__thumbnail" src="..." alt="" loading="lazy">
        <svg class="c-video__play" ...>...</svg>
      </div>
    </div>
    <figcaption>Testo della didascalia.</figcaption>
  </figure>
  <strong>Testo del bullet</strong>: resto del testo che avvolge la thumbnail.
</li>
```

**Nota strutturale — due bug reali trovati e corretti durante il test** (dettagli in `journal.md`):

1. Il box con `aspect-ratio`/`overflow: hidden` è `.c-video__box`, un `<div>` interno — **non** la `<figure>` stessa. Se fosse sulla `<figure>`, la `<figcaption>` (figlio normale, non posizionato) finirebbe schiacciata nella stessa box e nascosta dietro al facade (`position: absolute`), invisibile.
2. Il `<li>` che contiene la figure floatata ha bisogno di `display: flow-root` — senza, il float non resta contenuto nel suo `<li>` e "sfonda" visivamente sovrapponendosi ai bullet successivi della lista.

**Comportamento**: click su `.c-video__facade` → JS crea (una volta sola, per facade) un overlay `position: fixed`, con `left`/`width` calcolati via `getBoundingClientRect()` del `.l-section__content` più vicino, e ci inietta un `<iframe>` con `src` da `data-src`. Nessuna richiesta di rete al provider finché l'utente non clicca. Chiusura: click sul backdrop, bottone "×", o Esc — la thumbnail torna al suo stato piccolo iniziale (l'iframe viene distrutto, non solo nascosto). Stesso pattern scoped-al-contenitore già usato per `.c-masonry-overlay` in `portfolio.html`.

**Variabili (interfaccia)**:

- `--video-aspect-ratio` (default `16 / 9`) — il rapporto del box. Lo detta il file, non lo stile: il video dell'hero è 2004×1080, e un 16/9 imposto gli metterebbe due bande nere dentro un box che ha già i suoi angoli arrotondati.

**Accessibilità**: `alt=""` sulla thumbnail (decorativa, la `figcaption` già descrive il contenuto — evita doppio annuncio agli screen reader). La `figcaption` non è duplicata nell'overlay ingrandito (scompare insieme alla thumbnail piccola, per scelta esplicita).

**Stato di caricamento nell'overlay**: al click, prima di creare l'iframe, JS clona la thumbnail del facade e aggiunge uno spinner (`.c-video-overlay__thumbnail` + `.c-video-overlay__spinner`) dentro `.c-video-overlay__box`. L'iframe parte a `opacity: 0`; al suo evento `load` riceve la classe `.is-loaded` (fade a `opacity: 1`, `--duration-250`) e lo spinner viene rimosso. Evita il "buco vuoto" percepito tra apertura overlay e comparsa effettiva del video — vedi `journal.md` (2026-07-30). Completato con `<link rel="preconnect">` verso i domini Vimeo in `master-ux-ui.html` (connessione di rete anticipata, indipendente dal componente in sé).

## Icona (`.c-icon`)

**Scopo**: dare colore e dimensione a un SVG del set Refactoring UI (`assets/Icons_v1.0.2/`). Primo uso reale del set: fino a `motivation.html` le icone erano nel repo ma non in pagina, e la convenzione esisteva solo scritta in `design-system.md`.

**Dove usato**: `motivation.html`, per segnalare il tipo di ogni risorsa (audio, testo, video).

**File**: `css/components/icon.css`

**Markup**: SVG inline copiato nel markup, non sprite — non c'è build step. Il `class="c-icon"` va sull'`<svg>`; i due `<path>` interni arrivano dal file con le loro classi `primary`/`secondary` e non si toccano.

```html
<svg class="c-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
  <path class="primary" d="…"/>
  <path class="secondary" d="…"/>
</svg>
```

`aria-hidden="true"` perché il tipo della risorsa è già scritto in chiaro nella riga dei metadati: l'icona lo ripete a colpo d'occhio, non lo aggiunge.

**Variabili (interfaccia)**: `--icon-size`, default `var(--space-24)`.

**Le tre usate finora**: `icon-headphones` (audio), `icon-book-open` (testo o libro), `icon-film` (video, pronta ma non ancora usata — nessuna risorsa video in lista).

**Allineamento al brand**: le due tinte `.primary`/`.secondary` prendono `--color-icon-primary` e `--color-icon-secondary`, che nel tema brand sono nero e grigio neutro. Non è una seconda tinta cromatica, sono due valori dello stesso grigio-nero: il "piatto, niente decorazioni" del brand regge. Il corallo non entra mai in un'icona — è l'unico accento della pagina e va speso dove conta.

## Risorsa (`.c-resource`)

**Scopo**: una voce di lista di risorse — icona del tipo, titolo che è il link, una riga di metadati, e il motivo per cui vale la pena.

**Dove usato**: `motivation.html`.

**File**: `css/components/resource.css`

**Markup**: `<li>` dentro `<ul class="c-resources">`. Il titolo è un `<p>`, non un heading: una lista di link non ha bisogno di una gerarchia di titoli, e un `h2` prenderebbe Archivo Black a 30px dal tema.

```html
<li class="c-resource">
  <span class="c-resource__icon"><svg class="c-icon">…</svg></span>
  <div>
    <p class="c-resource__title"><a href="…" target="_blank" rel="noopener">The Go-Getter ↗</a></p>
    <p class="c-resource__meta">Racconto lungo · Peter B. Kyne, 1921 · in inglese</p>
    <p class="c-resource__why">Perché vale la pena…</p>
    <p class="c-resource__alt">Un'altra edizione, o come averlo in italiano…</p>
  </div>
</li>
```

**`__why` e `__alt` sono opzionali**: la voce regge anche solo con titolo e metadati (è il caso della prima risorsa in pagina, in attesa della nota).

**Variabili (interfaccia)**: nessuna per ora.

**Stile**: griglia a due colonne (icona 24px, contenuto), voci separate da un filetto come le righe di una bibliografia — niente fondini, niente box. È il trattamento più piatto possibile, che è quello che il brand chiede. Titolo a 20px in peso 700: gerarchia per peso, non per colore.

**Stati**: nessuno proprio. I link prendono gli stati globali del tema (sottolineatura nel colore del testo, corallo all'hover).

## FAQ container (`.c-faq`)

**Scopo**: dare identità visiva/contenimento a un blocco titolo+accordion (sfondo leggero, angoli arrotondati, padding) — prima h3 e `.c-accordion` non erano wrappati in nulla, vivevano nudi nel flusso della colonna.

**Dove usato**: blocco FAQ dentro "Il problema del Junior Designer da quando c'è AI" (`master-ux-ui.html`), wrappa `<h3 id="faq-problema">` + `<details class="c-accordion">`.

**File**: `css/components/faq.css`.

**Markup**:

```html
<div class="c-faq">
  <h3 id="faq-problema">FAQ</h3>
  <details class="c-accordion">...</details>
</div>
```

**Stile**: `background: var(--zinc-100)`, `border-radius: var(--radius-8)`, `padding: var(--space-24)`. Nessuna variabile d'interfaccia per ora — prima versione esplicitamente "per iniziare", da iterare.

**Nota**: l'h3 come primo figlio del box non ha bisogno di reset aggiuntivo — la regola globale `h3:first-child { margin-top: 0 }` (`base.css`) si applica già.

**Il secondo caso d'uso è arrivato, e non usa questo contenitore**: la sezione "Domande frequenti" di `master-ux-ui.html` è una `.l-section` intera, con undici `.c-accordion` direttamente dentro `.l-section__content`. Il fondino di `.c-faq` serve a ritagliare un blocco FAQ *dentro* un'altra sezione, dove se no vivrebbe nudo nel flusso; una sezione che è già solo FAQ ha la sua identità nell'h2 della sidebar, e un fondino su tutta l'altezza aggiungerebbe una terza superficie alla pagina. Quindi `.c-faq` resta com'è, specifico per il blocco in linea, e `.c-accordion` si conferma indipendente dal contenitore.

## Schedule (`.c-schedule`)

**Scopo**: elenco di appuntamenti — data a sinistra, titolo e una riga di descrizione a destra. Nessuna interazione.

**Dove**: sezione "Pre-corso gratuito" di `index.html`, le 4 live.

**Markup**:

```html
<ol class="c-schedule">
  <li class="c-schedule__item">
    <div class="c-schedule__date">14 ott <small>mercoledì, 19:00</small></div>
    <div>
      <p class="c-schedule__title">Titolo della live</p>
      <p>Una riga di descrizione.</p>
    </div>
  </li>
</ol>
```

**Variabili esposte**: nessuna per ora — consuma `--color-border`, `--color-text-muted` e la scala `--space-*`. La colonna data è fissa a `--space-108`.

**Stati**: nessuno.

**Nota**: la data è in `--font-display`, dichiarato in fondo a `schedule.css`. Il resto del componente usa solo il peso, così non dipende dal font scelto.

## Filmstrip (`.c-filmstrip`)

**Scopo**: immagini con proporzioni diverse (9:16, 4:3, 16:9) tutte alla stessa altezza, in fila. Se non stanno, scorrono in orizzontale dentro il contenitore, mai la pagina. Nessun ingrandimento al click.

**Dove**: gallery dei progetti in `portfolio.html`.

**Markup**:

```html
<div class="c-filmstrip">
  <img src="assets/portfolio/41.png" alt="Coffee machine: customize your drink" loading="lazy">
  <img src="assets/portfolio/10.jpg" alt="…" loading="lazy">
</div>
```

**Variabili esposte**: `--filmstrip-height` (default `--space-240`, `--space-300` da 768px).

**Stati**: nessuno. `scroll-snap-type: x mandatory` per lo scroll a scatti.

**Immagini cliccabili (dal 18 settembre 2026)**: ogni `<img>` può stare dentro un `<a>` che punta al file a dimensione intera. Il link diventa il figlio flex al posto dell'immagine e ne prende `flex` e lo `scroll-snap-align`; l'immagine dentro continua a prendere altezza, bordo e raggio dalla regola esistente, quindi il markup senza link resta valido com'era.

```html
<div class="c-filmstrip" tabindex="0" role="group" aria-label="3 immagini di progetti, scorrevoli">
  <a href="assets/images/gallery-progetti-studenti/wireflow.png" target="_blank" rel="noopener">
    <img src="assets/images/gallery-progetti-studenti/wireflow.webp" width="1360" height="799" alt="…" loading="lazy">
  </a>
</div>
```

Serve dove le immagini sono canvas larghi 2800px, che a 300px di altezza si vedono ma non si leggono — stessa soluzione di `.c-automation__figure` in `automations.html`. Usato nella gallery dei progetti degli studenti in `master-ux-ui.html`; le filmstrip di `portfolio.html` non hanno link e non cambiano.

**Didascalia e navigazione (`.c-filmstrip__caption`, `js/filmstrip.js`)**: una riga sola sotto la strip, sempre nello stesso punto, che descrive l'immagine più a sinistra fra quelle visibili e tiene a destra i bottoni ← →. Prende il posto di `.c-filmstrip__hint` dove esistono metadati per immagine — autore, progetto, corso — e ne eredita il margine negativo; il conteggio sta sotto la didascalia, i bottoni a fianco di entrambi.

```html
<div class="c-filmstrip" data-filmstrip="master" tabindex="0" role="group" aria-label="4 immagini di progetti, scorrevoli">
  <a href="…" target="_blank" rel="noopener" data-caption="Roberto Migani · Wireflow della macchina del caffè · Master Mucca Design UX/UI">
    <img src="…" width="1360" height="799" alt="Roberto Migani, wireflow della macchina del caffè (Master…): …" loading="lazy">
  </a>
  …
</div>
<p class="c-filmstrip__caption" data-filmstrip-caption="master">
  <span data-caption-text>Roberto Migani · Wireflow della macchina del caffè · Master Mucca Design UX/UI</span>
  <span class="c-filmstrip__count" data-caption-count hidden>1 di 4</span>
</p>
```

I bottoni non stanno nel markup: li crea lo script e li appende alla riga, dentro un `.c-filmstrip__nav`. Nascono solo se le immagini sono più di una **e** la strip scorre davvero (`scrollWidth > clientWidth`), e si nascondono da sé se la finestra si allarga al punto che ci stanno tutte. `disabled` agli estremi — stato nativo, non `.is-`.

L'attributo `data-filmstrip` accoppia la strip alla sua riga: servono perché in una pagina ce n'è più di una.

**Progressive enhancement**: la riga è già scritta nell'HTML con la didascalia della prima immagine, quindi senza JS resta quella — non sparisce e non compare un contenitore vuoto. Il conteggio invece è `hidden` nel markup e lo scopre lo script: senza JS direbbe «1 di 4» mentre guardi la terza. Una strip con una sola immagine usa la stessa classe senza `data-` né conteggio: è una didascalia normale.

**Il credito sta anche nell'`alt` di ogni immagine**, non solo nella riga. È il punto debole di questo pattern: la didascalia visibile ne descrive una sola, quindi chi non vede la pagina dovrebbe scorrere per sapere di chi è il lavoro. Con autore e corso in testa all'`alt` il credito c'è comunque, e la riga resta una comodità visiva.

**Perché non una didascalia per immagine**: valutata e scartata da Luca. Sarebbe stata più robusta (niente JS, tutti i crediti sempre presenti) ma alza la strip di ~40px e ripete il nome del corso sotto ogni immagine dello stesso gruppo.

**Perché i bottoni stanno nella riga e non sui bordi della strip**: la posizione da carosello (pastiglie sovrapposte ai bordi) coprirebbe una fetta di immagine — la strip occupa già tutta la colonna — e sopra contenuti di colore imprevedibile servirebbe un fondino opaco per restare leggibili. Nella riga non rubano spazio a niente e sostituiscono un'istruzione con i controlli veri.

**Due trappole tecniche, entrambe misurate** (dettagli nei commenti di `js/filmstrip.js`):

- `behavior: 'smooth'` e `scroll-snap-type: x mandatory` si annullano a vicenda: lo scroll parte e torna al punto di partenza. Si toglie lo snap per la durata dell'animazione e lo si rimette su `scrollend` — rimettendolo, il browser aggancia da sé il punto giusto.
- Togliere lo snap e chiamare `scrollTo` nello stesso task non basta: serve una lettura che forzi il ricalcolo dello stile (`void strip.offsetWidth`) in mezzo, se no il browser non ha ancora applicato la regola nuova e si ricade nel caso di sopra.

## Project (`.c-project`)

**Scopo**: un progetto del portfolio — titolo, riga meta, filmstrip, template a etichette fisse, link. Le etichette sono sempre le stesse cinque (`Product · Complexity · Immersion · Made obvious · Result`): il ritmo ripetuto è parte del design della pagina.

**Dove**: `portfolio.html`, uno per progetto, dentro la `<section>` del cluster.

**Markup**: vedi il primo `<article class="c-project">` in `portfolio.html`. Sul branch `feature/portfolio-themes` l'article ha `data-tags="hmi"` (più tag separati da spazio) e una riga `.c-project__tags` sotto il meta con i tag come link `?tag=…`. `<dl>` per il template (etichetta = `<dt>`, testo = `<dd>`): da 768px griglia a due colonne (`--space-144` + 1fr), sotto etichetta sopra testo. Una riga del template può essere omessa (es. `Result` se non c'è nulla di onesto da dire), mai riempita.

**Variabili esposte**: nessuna.

**Stati**: nessuno.

## Cluster nav (`.c-cluster-nav`) — rimosso

`css/components/cluster-nav.css` è stato cancellato il 21 settembre 2026: nessuna
pagina lo caricava e nessun branch lo usava. Era l'indice orizzontale di anchor in
testa a `portfolio.html`, sostituito da `.c-section-index`. Il codice resta nella
storia di git, se dovesse servire.

## Tag filter (`.c-tag-filter`) — solo su branch

> Su `main` nessuna pagina lo carica, e `js/portfolio-filter.js` non esiste: il
> componente vive su `feature/portfolio-themes` e `feature/portfolio-filtro-sticky`.

**Scopo**: filtra i progetti per tipo di lavoro. Le sezioni della pagina sono le 4 tesi ("I simplify complex software"…), i tag sono i tipi (HMI, ecommerce…). Un tag attivo nasconde i progetti senza quel tag e le sezioni rimaste vuote.

**Dove**: `portfolio.html`, sotto l'intestazione.

**Markup**:

```html
<nav aria-label="Filter by type of work">
  <ul class="c-tag-filter">
    <li><a href="?" aria-pressed="true">All</a></li>
    <li><a href="?tag=hmi" aria-pressed="false">HMI &amp; embedded</a></li>
  </ul>
  <p class="c-tag-filter__empty" hidden>No projects with this tag yet.</p>
</nav>
```

**Comportamento** (`js/portfolio-filter.js`): progressive enhancement. Senza JS i link ricaricano la pagina con `?tag=…`; lo script legge il parametro al caricamento e applica il filtro, e intercetta i click solo per evitare il reload (`history.replaceState`). Funziona anche dai link `.c-project__tags` dentro i progetti. URL linkabile: `portfolio.html?tag=hmi#simplify`.

**Stati**: tutti i tag sono sottolineati, perché sono link. `[aria-pressed="true"]` → la sottolineatura passa a `--color-accent` e a spessore doppio: l'attivo si stacca per colore e spessore della riga, non per la sua presenza. Unico accento della pagina.


## Lang toggle (`.c-lang-toggle`)

**Scopo**: mostrare lo stesso blocco di contenuto in due lingue, con un interruttore. Nasce per le domande al cliente in `upwork/ai-automation-specialist.html`: la versione italiana è la nota di lavoro, quella inglese è il testo da mostrare al cliente.

**Dove**: `upwork/ai-automation-specialist.html`, sezione 6.

**Markup**:

```html
<div data-lang-toggle="it">
  <ol>
    <li>
      <span lang="it" data-lang="it">Quante automazioni stimate?</span>
      <span lang="en" data-lang="en" hidden>How many automations do you expect?</span>
    </li>
  </ol>
</div>
```

`data-lang-toggle` porta la lingua di partenza. Ogni variante ha **sia** `lang` (per screen reader e sillabazione) **sia** `data-lang`: la selezione avviene su `data-lang` perché un `lang` annidato per altri motivi — una citazione in inglese dentro il testo — non deve finire nello scambio. Le varianti non predefinite partono `hidden` nel markup, così non lampeggiano prima che parta lo script.

**Comportamento** (`js/lang-toggle.js`): progressive enhancement. Il bottone lo crea lo script, quindi senza JS non compare un controllo che non funziona: resta visibile la lingua di partenza. Il bottone prende `aria-controls` sul primo blocco utile e un `aria-label` descrittivo; l'etichetta visibile è la lingua **verso cui si va**, non quella corrente.

**Variabili esposte**: nessuna. **Stati**: nessuno — il bottone non è premuto/non premuto, cambia etichetta.

## Private note (`.c-private`) e Letter (`.c-letter`)

**Scopo**: due riquadri della pagina di analisi annunci. `.c-private` marca quello che resta note interne e non va mostrato al cliente; `.c-letter` marca un testo da copiare così com'è (la bozza di cover letter).

**Dove**: `upwork/ai-automation-specialist.html`, sezioni 6, 7 e 8.

**Markup**:

```html
<div class="c-private">
  <p class="c-private__label">Nota privata — non va nel video</p>
  <p>…</p>
</div>

<div class="c-letter" lang="en">
  <p>Hi — …roughly <span class="c-slot">$X</span>/month…</p>
</div>
```

La differenza visiva è il bordo: tratteggiato per il privato, continuo per la lettera. Non un colore — il corallo in quella pagina è già impegnato dal filetto di testata e dal riquadro del verdetto. `.c-slot` segna un buco da riempire prima di inviare; non usa `<mark>` perché il giallo di default non è in palette e il senso non è «evidenziato» ma «mancante».

**Variabili esposte**: nessuna. **Stati**: nessuno.

## Result (`.c-result-list` / `.c-result`)

**Scopo**: una riga di risultato — un cliente e il numero che è cambiato. Fratello di `.c-entry` (portfolio), ma senza `<details>`: la riga è già tutto il contenuto, quindi niente marker "+", niente cursore, niente titolo sottolineato.

**Dove usato**: `results.html`, lista unica sotto l'header "Results.".

**File**: `css/components/result.css`

**Markup**:

```html
<div class="c-result-list">
  <article class="c-result" id="beautytune">
    <p class="c-result__client"><a href="https://beautytune.it/" target="_blank" rel="noopener">beautytune.it ↗</a></p>
    <p class="c-result__line">… generating <strong>€180,000 over the following 12 months</strong>.</p>
  </article>
</div>
```

**Variabili (interfaccia)**: nessuna per ora — usa direttamente i token di bordo, spazio e tipografia.

**Convenzioni di contenuto**: i numeri vanno in `<strong>` dentro il testo, non isolati in una stat tile: si devono poter trovare senza leggere la riga, ma restano dentro la frase che dice cosa li ha mossi.

**Stati previsti**: nessuno. L'unico stato interattivo è l'hover sul link del cliente, gestito dal tema.

## Manifesto (`.c-manifesto`)

**Scopo**: una lista di affermazioni numerate, ognuna con dietro un paragrafo che si apre sul posto. La forma viene da [37signals.com](https://37signals.com/): titoli brevi e dichiarativi da scorrere in venti secondi, e il ragionamento dietro solo per chi lo vuole.

**Non è un componente autonomo**: è un modificatore di `.c-entry` (`css/components/entry.css`), che porta già `<details>` nativo, bordo fra le voci, marcatore `+`/`–`, focus ring sulla riga e `scroll-margin-top` per i deep link. `.c-manifesto` aggiunge solo il numero e la misura di lettura del paragrafo. Delle tre parti del `<summary>` di `.c-entry` usa solo `__title`: niente `__meta`, niente `__line`.

**Dove usato**: `manifesto.html`, lista unica sotto l'header "Manifesto.".

**File**: `css/components/manifesto.css` (+ `css/components/entry.css`, obbligatorio, e va caricato prima)

**Markup**:

```html
<div class="c-entry-list c-manifesto">
  <details class="c-entry" id="m-05">
    <summary class="c-entry__summary">
      <span class="c-manifesto__num" aria-hidden="true">05</span>
      <h2 class="c-entry__title">Disegnare un'automazione è disegnare un flusso</h2>
    </summary>
    <div class="c-entry__body">
      <p class="c-manifesto__text">…</p>
      <p class="c-entry__permalink"><a href="#m-05">Link a questa voce</a></p>
    </div>
  </details>
</div>
```

**Variabili (interfaccia)**: nessuna — usa i token semantici di spazio, corpo e colore. Gli eventuali ritocchi di brand vanno nel file del componente stesso, non altrove.

**Convenzioni di contenuto**:

- Affermazione su **una riga**, dichiarativa. Se serve una subordinata, probabilmente sono due affermazioni.
- Paragrafo **sotto le 60 parole**. Se non ci sta, la voce ne conteneva due: si spezza.
- Il numero è **testo vero nel markup**, non un contatore CSS: è il nome della voce (`#m-05`), e l'`id` è comunque scritto a mano. Riordinare la lista vuol dire rinumerare a mano — con tredici voci è il prezzo giusto per avere link stabili.
- `<h2>` e non `<p>`: è quello che fanno `portfolio.html` e `automations.html`, e solo `h1, h2, h3` ricevono il font display dal tema.

**Stati previsti**: solo quelli nativi di `<details>` — chiuso e `[open]`. Nessuna classe `.is-open`: lo stato lo tiene il browser. Apertura, chiusura e tastiera (Tab, Invio, Spazio) funzionano senza JS; `js/portfolio-index.js` aggiunge solo il deep link.

**Scelta lasciata aperta**: l'attributo `name="manifesto"` sui `<details>` renderebbe l'accordion esclusivo (una voce aperta alla volta) in modo nativo. Per ora non c'è: due affermazioni aperte in parallelo si possono confrontare.

## Pledge (`.c-pledge`) e Requirement (`.c-requirement`)

**Scopo**: i due pezzi di `garanzia.html`. `.c-pledge` è il riquadro che apre la pagina con la promessa in una frase; `.c-requirement` è una condizione della garanzia — numero, titolo, una o due frasi, e la riga che dice come si verifica.

**Dove usati**: `garanzia.html`. Il pledge una volta sola, in cima; i requirement in tre liste (ammissione, durante il corso, nei sei mesi dopo), otto voci in tutto numerate `0`–`7`.

**File**: `css/components/garanzia.css` — uno solo per due componenti, perché nascono insieme e servono la stessa cosa. Precedente: `automation.css`.

**Perché non si riusa `.c-schedule`**, che ha la stessa griglia (colonna stretta + corpo): lì la colonna stretta è una data e il corpo è una frase. Qui serve una quarta parte che `.c-schedule` non ha — `__check`, la misura verificabile — ed è l'unico motivo per cui quella pagina è credibile. In un `<p>` normale si leggerebbe come commento invece che come criterio.

**Markup**:

```html
<div class="c-pledge">
  <p class="c-pledge__promise">Se applichi il metodo e in sei mesi… ti restituisco tutto.</p>
  <p>…</p>
</div>

<ul class="c-requirement-list">
  <li class="c-requirement">
    <span class="c-requirement__num" aria-hidden="true">1</span>
    <div class="c-requirement__body">
      <h3 class="c-requirement__title">Tutte le esercitazioni consegnate</h3>
      <p>…</p>
      <p class="c-requirement__check"><strong>Come si verifica:</strong> …</p>
    </div>
  </li>
</ul>
```

**Variabili (interfaccia)**: `--pledge-accent` (default `--color-accent`) — il bordo sinistro del pledge. `.c-requirement` non espone variabili: usa i token semantici.

**Il numero è testo vero nel markup, non un contatore CSS**: la numerazione è citabile nel contratto ("requisito 4"), quindi deve stare nell'albero di accessibilità e non solo nel rendering. Stessa scelta, stesso motivo, di `.c-manifesto__num`.

**L'accento**: il bordo del pledge è l'unico elemento con il corallo in pagina, come chiede la regola di moderazione del brand kit. `__check` si stacca con un filetto e non con un fondino: i fondini sono già presi dal pledge e da `.c-faq`, e un terzo livello di superficie renderebbe la pagina a strisce.

## Annuncio analizzato (`.c-job`) e Pastiglia di esito (`.c-badge`)

**Scopo**: la riga di un annuncio Upwork analizzato — data, titolo che è il link, sommario, e il verdetto con la pastiglia.

**Dove**: `upwork/index.html`, dentro `.c-job-list`. Il CSS sta in `css/components/job.css`, che porta anche gli stili della pagina di analisi (`.c-posting`, e altri).

**Markup**:

```html
<ol class="c-job-list">
  <li class="c-job">
    <p class="c-job__date"><time datetime="2026-09-16">16 settembre 2026</time></p>
    <h3 class="c-job__title"><a href="…">AI Automation Specialist</a></h3>
    <p class="c-job__summary">Cosa chiede l'annuncio.</p>
    <p class="c-job__verdict">
      <span class="c-badge">Fattibile</span>
      <span>Il perché, in una riga.</span>
    </p>
  </li>
</ol>
```

**Variabili esposte**: nessuna.

**Stati**: `.c-badge--no` per l'esito negativo. Stesso disegno, pallino spento (`--color-text-muted` invece di `--color-accent`).

**Perché il pallino e non il testo colorato**: la pastiglia sta in un elenco di titoli, e un testo colorato competerebbe con loro. Il pallino è l'unico accento della riga, il testo resta nel colore del corpo: gerarchia per peso, non per colore.

## Albero di file (`.c-tree`)

**Scopo**: l'elenco delle pagine del sito come albero di cartelle, nell'indice privato.

**Dove**: `index-abf92932.html`. Ha sostituito `.c-sitemap`, che era una lista piatta col path intero ripetuto a ogni riga e una descrizione sotto: il path ripetuto nascondeva la gerarchia, e le descrizioni non venivano lette.

**Markup**: `<ul>` dentro `<li>`, così l'annidamento che si vede è quello che legge anche uno screen reader.

```html
<div class="c-tree">
  <ul class="c-tree__list">
    <li class="c-tree__item c-tree__item--dir">
      <span class="c-tree__dir">articles/</span>
      <ul class="c-tree__list">
        <li class="c-tree__item"><a href="/articles/">index.html</a></li>
      </ul>
    </li>
    <li class="c-tree__item"><a href="/life.html">life.html</a><span class="c-tree__tag">noindex</span></li>
  </ul>
</div>
```

**Variabili esposte**: nessuna.

**Stati**: nessuno. Niente JS, nessun nodo da aprire o chiudere: con 37 voci non c'è niente da richiudere.

**Note**: i filetti dell'albero sono bordi CSS, non caratteri `├─`, che verrebbero letti ad alta voce e si copierebbero insieme al nome del file. Il nome di cartella non è un link: la pagina della cartella è il suo `index.html`, elencato come figlio. I link restano sottolineati come ovunque nel sito, ma con `text-underline-offset: 0.25em` invece dello `0.15em` del tema: quello è tarato sull'Archivo, e sul monospace la riga passava dentro le discendenti di `p`, `g`, `y`.

## Pezzi di articolo (`article.css`) — raccolta, non blocco

Gli altri file di `css/components/` definiscono un blocco con i suoi elementi.
Questo no: raccoglie quello che serve a una pagina di `articles/` e che non è né
un componente riusabile né stile di base. Non esiste una classe `.c-article`, e
non deve esistere: il contenitore è il `<main>` della pagina.

Cinque pagine lo caricano, quindi non è uno stile di pagina — è un insieme di
pezzi condivisi fra pagine della stessa famiglia.

- **`.c-article__date`** — la data sotto il titolo. C'è, ma non compete con
  l'attacco del pezzo.
- **`.c-article__nota`** — la nota che un pezzo tradotto o recuperato da un altro
  sito porta con sé. Voce a parte rispetto al corpo.
- **`.c-dialogue`** — il dialogo: le battute sono paragrafi normali che si aprono
  col nome di chi parla in `<strong>`. Il nome prende il testo attenuato, non il
  corallo: l'accento è del CTA.
- **`.c-figure`** — uno screenshot a tutta colonna, col bordo, perché quasi tutte
  le immagini hanno il fondo chiaro come la pagina.
- **`.c-figures`** e **`.c-figures__caption`** — la griglia di figure da guardare
  insieme, quando il confronto è il contenuto.

**Markup**: vedi `articles/pensiero-divergente.html`.

## Pezzi di case study (`automation.css`) — raccolta, non blocco

Come sopra: nessuna classe `.c-automation`, solo gli elementi che servono a una
pagina di automazione. Caricato da `automations/index.html` e dalle pagine di
`workflows/`.

- **`.c-automation__figure`** — lo schema del flusso. Il canvas di n8n è largo
  ~2500px: alla larghezza della colonna il testo dei nodi non si legge, quindi
  l'immagine è un link a sé stessa a dimensione intera, e la didascalia porta lo
  stesso link per chi non pensa a cliccare l'immagine.
- **`.c-automation__facts`** — si usa **insieme a `.c-project__facts`**, che dà la
  griglia: è un `<dl>`, e questo file aggiunge solo il passo verticale, perché le
  voci sono elenchi e non prosa.
- **`.c-automation__step`** — il passo numerato del «come si costruisce». È un
  **titolo** (`<h2>`), non un paragrafo.
- **`.c-automation__code`** — lo pseudocodice: un filetto a sinistra invece del
  fondo pieno, perché non è un linguaggio vero ma una ricetta scritta in italiano,
  e il fondo pieno lo farebbe sembrare JavaScript.

**Markup**: vedi `automations/index.html` e
`workflows/your-third-workflow/come-si-costruisce.html`.
