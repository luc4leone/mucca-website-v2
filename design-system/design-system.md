# Design System

Decisioni sul "contenitore": variabili di tema, breakpoint, organizzazione CSS, convenzione componenti, e come i componenti espongono la propria interfaccia. Il contenuto (copy) resta in `content.md`.

I campioni visivi delle scelte qui descritte stanno in [`design-system.html`](design-system.html), disegnati con i token veri. Il criterio di divisione fra i due file — e perché non sono due fonti di verità — è in [`index.html`](index.html).

Questo file documenta **scelte, principi e regole** — non le scale di valori, che vivono in `css/tokens.css` e vanno lette lì. Un token compare qui solo come esempio isolato per spiegare un concetto, mai come elenco completo.

## Variabili di tema

Due livelli: primitive e semantiche.

- **Primitive**: valori grezzi. Es. `--blue-600: #2f5aff`.
- **Semantiche**: referenziano le primitive, sono quelle che i componenti consumano. Es. `--color-primary: var(--blue-600)`.

Cambiare identità visiva di solito significa due cose insieme: aggiungere le primitive nuove che servono (spesso nuovi colori) e rimappare le semantiche che devono puntarci. Non tutte le semantiche cambiano, e il numero di primitive nuove non corrisponde necessariamente al numero di semantiche rimappate — una primitiva nuova può alimentare più semantiche, o una semantica può bastare rimapparla su una primitiva già esistente. In ogni caso, componenti e markup non si toccano: il punto di intervento resta il livello dei token.

Vivono in `css/tokens.css`, dichiarate su `:root`.

### Colori

Primitive: scala di grigio neutro **zinc** (Tailwind, 11 step) + 5 colori brand + 1 primitiva funzionale (`--red-600`, per l'errore — nessun rosso nella palette originale, ma un colore funzionale deve restare riconoscibile a prescindere dal brand).

Semantiche assegnate secondo un criterio di **minimalismo estetico** — pochi colori attivi, il resto neutro:

- **Base neutra (zinc)** per sfondo/testo/bordi: fa il lavoro pesante, non distrae.
- **`--color-text-muted` = zinc-600**: testo secondario (es. attribuzione di una citazione). Contrasto su zinc-50: ~7.4:1, passa AAA — preferito a un `opacity` ad-hoc, coerente col livello semantico degli altri colori.
- **`--color-primary` = hot-pink-web**: unico accento dominante, coerente con un posizionamento energico ("Diventa Design Engineer"). Testo/icona sopra (`--color-on-primary`, zinc-900): contrasto ~6.7:1, passa AA.
- **`--color-secondary` = midnight-violet**: stessa famiglia cromatica del rosa (viola-magenta), per elementi secondari o sezioni scure. Testo/icona sopra (`--color-on-secondary`, zinc-50): contrasto ~15:1, passa AAA.
- **`--color-accent` = cinnamon-wood**: uso limitato a elementi grandi o decorativi (bordi, icone, testo grande/bold). Con testo piccolo sopra il contrasto è al limite della soglia AA (~4:1) — non usarlo come sfondo di testo piccolo.
- **Icone monocrome per default** (`--color-icon-primary`/`--color-icon-secondary`), niente terza tinta a meno di un'eccezione voluta.
- **`--color-success` = celadon**: verde tenue già in palette, prima primitiva non mappata a trovare un uso. Testo scuro sopra: ~10.7:1. Testo chiaro sopra fallisce (~1.7:1) — non usarlo.
- **`--color-error` = red-600**: unica primitiva introdotta fuori dalla palette originale — un colore funzionale come l'errore deve restare riconoscibile a prescindere dal brand, non è un compromesso estetico. Testo chiaro sopra passa AA (~4.8:1); testo scuro piccolo no (~3.7:1).
- **`--color-overlay`**: sfondo dietro modale/lead-magnet, tinto di zinc-900 (coerente con le ombre) invece di nero puro.
- **`apricot-cream` non mappata**: riserva per iterazioni future — non tutte le primitive devono avere una semantica.

### Superfici

Un componente che si prende una superficie propria — un fondo diverso da quello della pagina — **si prende anche tutto quello che ci sta sopra**. `base.css` colora gli elementi pensando a un solo fondo, quello della pagina: `code` ha un fondino chiaro, i link hanno il colore d'accento, i filetti sono grigio chiaro. Su una superficie scura nessuna di queste scelte regge, e il difetto non si vede finché qualcuno non ci mette dentro proprio quell'elemento.

La regola è quindi: chi cambia il fondo dichiara, come variabili proprie, ogni convenzione ereditata che quel fondo rompe. Le due volte in cui è già successo:

- **`code` dentro `.c-quote`**: fondo nero del componente, fondino chiaro di `base.css`, testo bianco sopra — illeggibile. Risolto con `--quote-code-bg`, un velo chiaro invece di un colore pieno, così vale per qualunque `--quote-bg` il tema decida.
- **`.c-icon` su fondo scuro**: i due token dell'icona puntano a grigi scuri, e l'icona sparisce. Vanno rimappati dal contenitore (campione in `design-system.html`, sezione Icone).

Da controllare quando si crea una superficie nuova: testo e testo secondario (di solito già coperti ridefinendo `--color-text` e `--color-text-muted`), `code`, il colore dei link, i bordi, il focus ring, le icone.

### Tipografia

**Font-family**: un solo font, **Lora** (variable, asse `wght` 400–700), fallback `serif`. File in `assets/Lora/`, caricato via `@font-face` in `css/tokens.css` (upright + italic). TTF variable direttamente in produzione: niente build step per convertirlo. Eventuale conversione a woff2 (più leggero) resta un'ottimizzazione futura opzionale.

**Font-size**: scala fissa in px, naming `--font-size-<valore>`.

**Font-weight**: solo i 4 pesi statici effettivamente inclusi nel font (Regular/Medium/SemiBold/Bold) — il variable font ne permetterebbe altri intermedi, ma questi sono gli unici stop disegnati intenzionalmente dal type designer. Naming coerente con `--font-size-<valore>`/`--space-<valore>`: il valore è il nome.

**Line-height**: qui il naming per valore numerico non regge (rapporti con decimali, es. `1.1`, scomodi come suffisso). Naming per fascia d'uso invece che per valore:

- `tight`: titoli grandi (hero, titoli di sezione) — righe corte, non serve respiro.
- `normal`: default per UI e body text generico.
- `relaxed`: paragrafi lunghi (descrizione corso, programma) — con un serif come Lora, un'interlinea più generosa aiuta la lettura prolungata.

**La regola che decide quale usare: `tight` solo su testo che non va a capo.** È una misura da display — titoli, numeri grandi, etichette di una riga sola. Qualunque cosa possa arrivare alla seconda riga (paragrafi, voci di lista, descrizioni, didascalie) sta a `normal`; a 1.1 le discendenti di una riga sfiorano le maiuscole di quella dopo, e il blocco si legge come una macchia.

Il corollario pratico è che **il body text non ha bisogno di dichiarare l'interlinea**: `body` è già a `normal` in `base.css`, e il valore eredita. Una dichiarazione di `line-height` dentro un componente è quindi sempre un'eccezione, e va scritta solo quando c'è una ragione — di solito per stringere un titolo, non per allargare un paragrafo.

Caso reale che ha prodotto la regola: `.l-section__toc li` stava a `tight`. Nell'indice di sezione del Master ogni voce è una riga sola e la differenza non si vedeva; negli indici di cartella (`workflows/`, `books/`) la stessa classe porta una descrizione che va a capo, e le righe si toccavano.

**E i titoli che vanno a capo?** Restano l'eccezione vera: `tight` su un titolo di 18px che occupa due righe si legge male, ma `normal` lo fa smettere di sembrare un titolo. Il criterio che risolve il caso non è il ruolo — "titolo" — ma la **dimensione**: l'interlinea giusta scende al crescere del corpo, perché a 48px lo spazio fra due righe è già abbondante in proporzione, a 18px no.

La banda mancante è quindi una sola, fra `tight` e `normal`, per i titoli sotto i 30px: **`snug`, 1.3**.

`--line-height-snug: 1.3` è in `tokens.css`, e i tre titoli che l'hanno motivato sono stati convertiti tutti insieme — `.c-requirement__title` (18px), `.c-resource__title` e `.c-entry__title` (20px) — perché convertirli a spizzichi avrebbe lasciato due interlinee diverse su titoli identici in pagine diverse.

Per lo stesso motivo `base.css` porta a `snug` anche gli `h3`-`h6`, che stanno sotto i 30px: lasciarli a 1.1 avrebbe reso un `h3` più stretto di un `.c-entry__title` che gli sta accanto, a parità di corpo. `h1` e `h2` sono display e restano `tight`.

Cosa resta a `tight`, e perché: i titoli display (`h1` e `h2` in `base.css`), i numeri grandi (`.c-requirement__num`, `.c-manifesto__num`, il contatore di `.c-life`), il marcatore `+`/`–` di `.c-entry__summary` e le date di `.c-schedule` — tutta roba che non va mai a capo.

Riassunto operativo, per dimensione del testo:

| Corpo | Interlinea | Cosa |
| --- | --- | --- |
| ≥ 30px | `tight` (1.1) | titoli display, numeri grandi |
| 18-24px, titolo | `snug` (1.3) | titoli di componente che vanno a capo |
| qualsiasi, testo corrente | `normal` (1.5) | paragrafi, liste, descrizioni — ereditato da `body` |
| paragrafi lunghi | `relaxed` (1.7) | lettura prolungata |

**Letter-spacing**: stessa ragione di naming del line-height — decimali (anche negativi) scomodi come suffisso, naming per fascia:

- `tight`: titoli grandi in Lora — un filo più stretti a dimensioni display.
- `normal`: esplicito a `0` per poterlo sovrascrivere senza ambiguità.
- `wide`: badge/eyebrow in maiuscolo — la tracciatura larga aiuta la leggibilità dell'uppercase.

**Ritmo verticale dei titoli**: `margin-top` sempre maggiore di `margin-bottom` — mai il contrario. Principio di prossimità: un titolo si raggruppa visivamente con il contenuto che introduce, non con quello che precede. La spaziatura sotto resta minima (relazione stretta col contenuto proprio); quella sopra segna la separazione dalla sezione precedente.

Applicato per ora solo a `h3` (`margin-top: var(--space-30)`, `margin-bottom` invariato a `--space-12`). `h1`/`h2`/`h4`-`h6` ancora da decidere — probabile che il gap sopra debba crescere con l'importanza del titolo (h2 separa sezioni più grandi di h3), non usare lo stesso valore per tutti i livelli.

**Eccezione — primo figlio del contenitore**: `margin-top` va a `0` quando l'heading è il primo elemento dentro il suo contenitore (`h3:first-child`). La separazione dal contenuto precedente la garantisce già il contenitore stesso (padding/gap della sezione), non serve un secondo margin che si somma. Senza questa eccezione, un `h3` come primo figlio di `.l-section__content` non si allinea in alto con l'`h2` della colonna sidebar accanto — il margin-top lo spinge in basso solo nella sua colonna, rompendo l'allineamento tra le due colonne del layout a griglia.

### Spaziatura e dimensioni

Stessa scala per margin/padding/gap e per dimensioni di elementi (larghezze, altezze, icone...), naming `--space-<valore>`. Un'unica scala per entrambi gli usi, non due scale separate.

### Radius, ombre, transizioni

**Radius**: naming per valore, coerente con `--font-size-<valore>`/`--space-<valore>`. Eccezione: `--radius-full` per pillole/cerchi — "full" è un concetto a sé, non un valore in px.

**Border-width**: stesso criterio di naming per valore.

**Ombre**: naming per fascia (`sm`/`md`/`lg`), non per valore — un'ombra è composita (offset, blur, colore), non un singolo numero, stessa eccezione vista per line-height. Tinte di `--zinc-900` invece di nero puro: ombra più morbida, coerente con la base neutra del tema.

**Transizioni**: durata per valore (coerente con la maggior parte dei token), easing per nome — una curva bezier non è un singolo numero.

**Opacity**: `--opacity-disabled` (0.5) — primo valore introdotto al primo caso d'uso reale (stato disabled di `.c-button`), non anticipato prima.

### Z-index

Scala fissa, incrementi di 10 per lasciare spazio a inserimenti futuri. Copre: eventuale header/CTA sticky, overlay del lead magnet, modale, toast di conferma iscrizione newsletter.

**Overlay scoped a un contenitore, non al viewport**: se il contenitore è più alto del viewport (es. una griglia lunga di immagini), centrare l'overlay con `position: absolute; inset: 0` lo centra rispetto all'**intera altezza del contenitore**, non rispetto a ciò che è visibile a schermo — il contenuto centrato può finire fuori dallo scroll corrente. Soluzione: `position: fixed` (segue sempre il viewport verticalmente), con `left`/`width` impostati via JS in base al `getBoundingClientRect()` del contenitore, per restare comunque confinati orizzontalmente (es. non coprire la sidebar). Primo caso reale: overlay di `.c-masonry` in `portfolio.html`.

### Layout

`--container-max-width`: valore già deciso in `container.md` per il container a 2 colonne. A differenza del breakpoint, può essere una vera custom property: non serve dentro `@media`, solo come `max-width` su un elemento.

## Breakpoint

Mobile-first. Un solo breakpoint per tutto il sito: **768px**.

Un solo breakpoint non vuol dire che ogni sezione fa la stessa cosa alla stessa soglia — sezioni diverse possono rispondere a 768px in modo diverso (una passa da 1 a 2 colonne, un'altra resta 1 colonna ma prende un max-width). È una soglia condivisa, non un layout imposto.

**Non è una variabile CSS.** Le custom property non funzionano dentro `@media` — `@media (min-width: var(--breakpoint))` non è valido CSS, e senza build step non c'è modo di aggirarlo (niente PostCSS/custom-media). Il valore `768px` è quindi una **costante documentata**, da scrivere letteralmente in ogni `@media (min-width: 768px)` nel CSS. Non provare a referenziarlo con `var()`.

## Organizzazione file CSS

```
css/
├── tokens.css             # tutti i design token
├── base.css               # reset + stili elemento base
├── components/
│   ├── button.css
│   ├── card.css
│   ├── accordion.css
│   └── ...
└── layout.css             # composizione: come i componenti si dispongono nelle sezioni
```

- **`components/`**: un file per componente riusabile. È l'unità vera — iterare su un componente significa toccare solo il suo file, e l'effetto si vede ovunque sia usato.
- **`layout.css`**: come i componenti si dispongono nelle sezioni della pagina. Un file solo finché resta gestibile; si spezza solo se necessario, non per regola fissa.
- Iterare un **layout intero** (con worktree): si tocca solo `layout.css`, senza toccare i componenti.
- Le sezioni della pagina (hero, programma, prezzo...) **non** hanno un file CSS dedicato a testa — sono composizioni di componenti dentro `layout.css`, non un'unità di stile a sé.

## Convenzione naming

Prefisso per intento, sul modello ITCSS/SMACSS:

- `.c-<nome>` → componente (es. `.c-button`, `.c-card`)
- `.l-<nome>` → wrapper di layout (es. `.l-container`)
- `.u-<nome>` → utility (es. `.u-hidden`, `.u-lead` — testo che apre un paragrafo con peso visivo da h3 senza essere un vero heading, `.u-list-none` — rimuove il marker di lista quando un'emoji nel testo fa già da marker; vivono in `css/base.css`, non c'è ancora un file utilities dedicato)
- `.is-<stato>` / `.has-<stato>` → stato (es. `.is-active`, `.has-error`)

## Componenti: quando nascono e come si documentano

Un elemento o un insieme di elementi grafici usato più di una volta diventa un componente.

Documentazione in un file unico, `componenti.md`, con per ogni componente:

- nome
- scopo
- dove viene usato nella pagina
- markup di esempio
- variabili che espone (la sua interfaccia — vedi sotto)
- stati previsti (`.is-active`, `.has-error`, ecc., più gli stati d'interazione — vedi sotto)

## Interfaccia dei componenti: variabili, non varianti

I componenti espongono variazioni tramite **variabili CSS scoped**, non tramite classi modificatore (`--button-large` invece di `.c-button--large`).

Perché:

- Evita l'esplosione combinatoria di classi modificatore (size × colore × stato = decine di classi).
- Permette override puntuale per singola istanza, senza inventare una nuova classe ogni volta.
- Si integra con le variabili di tema: il componente è un consumatore di token, con default agganciati al tema.

```css
.c-button {
  --button-bg: var(--color-primary);
  --button-fg: var(--color-on-primary);
  background: var(--button-bg);
  color: var(--button-fg);
}
```

```html
<button class="c-button" style="--button-bg: var(--color-accent)">Iscriviti</button>
```

### Confine: quando le variabili non bastano

Le custom property cambiano solo *valori*, non *struttura*. Se una variazione richiede DOM diverso o logica condizionale (es. bottone con icona vs senza, layout flex vs grid), servono comunque un attributo o una classe minima — non forzare tutto dentro le variabili.

Approccio ibrido:

- Variabili per l'asse "stile" (colore, spaziatura, dimensioni, radius).
- Classi/attributi solo per differenze strutturali reali (es. `data-variant="icon-only"`).

### Iterare varianti estetiche di un componente

Un caso a parte, diverso da "DOM diverso": stessa markup, ma una variazione puramente estetica che richiede **regole CSS diverse**, non solo valori diversi delle stesse regole (es. numero come barra a piena larghezza vs pallino che sborda dall'angolo — stesso `<span>`, `position`/`display`/`border-radius` incompatibili tra loro). In questo caso serve comunque un `data-variant` sul componente, anche se la markup non cambia:

```html
<div class="c-step-card" data-variant="badge">...</div>
```

Le variabili restano il modo per personalizzare i *colori* di ogni variante (es. `--step-card-number-bg`), il `data-variant` seleziona quale *insieme di regole* applicare.

**Workflow di esplorazione — non si cancella nulla**: le varianti estetiche esplorate vivono in `componenti.html`, una galleria visiva permanente (parallela a `componenti.md`). Ogni variante provata resta visibile lì, etichettata (es. "attuale in produzione" vs scartata) — stesso principio già adottato per i branch git scartati: non si eliminano, restano disponibili come riferimento. Quando si sceglie una variante, `componenti.md` documenta quale sia il default in produzione; le altre restano comunque nella galleria.

## Icone: Refactoring UI Icons (`assets/Icons_v1.0.2/`)

- 200 SVG in `assets/Icons_v1.0.2/icons/`, uno per file, nome `icon-<nome>.svg`.
- Uso: **SVG inline copiato nel markup**, non sprite — coerente con l'assenza di build step.
- Ogni icona ha due path interni, classe `.primary` e `.secondary`, colorati via `fill`.
- Convenzione: `.primary`/`.secondary` referenziano i token semantici di tema, mai hex hardcoded:
  ```css
  .primary { fill: var(--color-icon-primary); }
  .secondary { fill: var(--color-icon-secondary); }
  ```
- Dimensione: `width`/`height` sull'`<svg>`. Quando l'icona è affiancata a testo, `width: 1em; height: 1em;` così scala con il font-size del contesto.

## Stati di interazione componenti

- Pseudo-classi native dove possibile: `:hover`, `:focus-visible`, `:active`, `:disabled`.
- `.is-`/`.has-` riservati agli stati pilotati da JS che CSS puro non intercetta (es. `.is-open` per l'accordion FAQ, `.has-error` su un campo dopo validazione).

## Accessibilità di base

- `:focus-visible` sempre visibile, mai `outline: none` senza sostituto. Colore legato a `--focus-ring-color` (midnight-violet, verificato ≥3:1 sia su sfondo chiaro ~14:1 sia su `--color-primary` ~5.7:1) — componenti su altri sfondi colorati vanno verificati caso per caso e possono sovrascriverlo.
- `@media (prefers-reduced-motion: no-preference)` per avvolgere animazioni non essenziali.
- Contrasto minimo WCAG AA (4.5:1 testo normale, 3:1 testo grande/UI) nella scelta dei colori del tema.
- HTML semantico: `<button>`/`<a>` veri, `alt` sulle immagini, label sui campi form (lead magnet, newsletter).
- **Mai scroll-bar orizzontale**, a nessuna larghezza di finestra — corrisponde al criterio WCAG 1.4.10 Reflow.
- **Affordance visiva**: lo stile che segnala interattività (colore link, sottolineatura, cursore a manina, stati hover/focus) è riservato esclusivamente a elementi realmente interattivi — mai preso in prestito per enfasi estetica su testo statico. Vale anche il verso opposto: un vero link non va mai stilizzato in modo indistinguibile dal testo normale. Corrisponde al criterio WCAG 1.4.1 Use of Color.

## Promemoria: non ancora token

- **Aspect-ratio** (video, lead magnet): dubbio se debba essere un token o un valore per-istanza. L'aspect-ratio giusto è spesso dettato dal contenuto stesso (rapporto nativo del video), non da una scelta di stile da applicare ovunque — a differenza di radius o ombre, che sono davvero "un look" coerente su tutto il sito. Valutare quando si disegna quella sezione.

Il grid split 30/70 di `container.md` **non** è un token: è layout, va scritto direttamente in `layout.css` quando serve, non forzato in `tokens.css`.

## Dark mode

Fuori scope. Scelta esplicita, non un'assenza da rivalutare — e dal 21 settembre
2026 anche senza file: `brand-kit/brand-tokens.css`, la variante scura che
nessuna pagina caricava, è stata rimossa.

## Il brand sta nei token (`css/tokens.css`)

Un file solo, tre blocchi: **scale** (misure e tempi), **palette** (i colori
grezzi del brand, più i grigi e i funzionali), **semantiche** (i nomi che i
componenti consumano). Un componente consuma sempre il terzo blocco, mai gli
altri due: cambiare identità visiva è riscrivere la palette e rimappare le
semantiche, senza toccare un file in `components/`.

Il brand kit portabile resta in `brand-kit/brand-style.md`: sono i principi —
piatto, niente ombre, gerarchia per peso del font, un solo accento per sezione —
e vanno letti prima di aggiungere un colore da qualche parte.

**Prima erano tre file.** `tokens.css` teneva le scale e una palette di default,
`brand-kit/brand-tokens-light.css` i colori del brand, e `css/theme-brand.css`
faceva da ponte fra i due. Il problema non era la frammentazione dei token: era
che il terzo file, oltre a rimappare venti token, conteneva **venti regole di
componente** — il `border-radius` di bottoni, FAQ, step card, video e pannelli,
la scala dei titoli, il font del calendario. Lo stile di un componente stava in
due file, e il secondo non portava il suo nome.

Quelle regole sono tornate ciascuna nel file del proprio componente, e le regole
di elemento (titoli, link, citazione) in `base.css`. `tokens.css` non contiene
più una sola regola CSS oltre a `:root`.

**Due doppioni tolti nel passaggio**: `--color-text-secondary` era un alias di
`--color-text-muted` (4 usi contro 42) e `--color-bg` di `--color-background`
(1 contro 7). Ne resta uno per concetto.

Aggiunte al brand kit fatte per questo progetto, documentate nel file stesso:
`--color-grey-dark` (testo secondario che passa AA su sfondo chiaro, il grigio
originale fa ~3,2:1), `--color-coral-dark` (l'accento quando è testo: il corallo
pieno su bianco fa 2,8:1) e `--color-line` per bordi e filetti.

L'ordine di caricamento è `tokens.css` → `base.css` → `layout.css` →
`components/*`, e non ci sono più fogli che devono stare per ultimi.

Il tema precedente non ha più una pagina viva che lo mostri: `content.html`, che
faceva da riferimento, è stata rimossa il 18 settembre 2026. Resta nella storia
di git, e il principio che dimostrava — stessi componenti, stesso markup, due
identità visive, con il punto di intervento al livello dei token — vale ancora,
anzi ora è più vero: il punto di intervento è un file solo.
