# Master UX/UI Design — landing page

Sito statico: HTML/CSS/JS vanilla, nessun framework, nessun build step.

```bash
python3 -m http.server 8765
# → http://localhost:8765/index.html
```

Pagine pubbliche: `index.html` (biglietto da visita alla radice),
`master-ux-ui.html` (landing del corso, italiano), `garanzia.html`,
`portfolio.html` (Works, inglese), `results.html` (Results),
`automations/` (case study delle automazioni), `mini-corso/`.

Documentazione: `CLAUDE.md` (istruzioni operative), `design-system/`
(token, breakpoint, convenzioni CSS, componenti — decisioni nei `.md`,
campioni negli `.html`), `journal.md` (decisioni prese e da prendere,
in ordine di data).

## Una cartella per argomento

I file che si leggono insieme stanno insieme, e ogni cartella ha il suo
`index.html` che dice cosa c'è dentro e in che ordine si legge. La
distinzione utile non è il formato — un `.md` e l'`.html` che ne nasce
sono lo stesso argomento — ma l'argomento:

| cartella | cosa tiene insieme |
|---|---|
| `design-system/` | il sistema e i componenti: decisioni nei `.md`, campioni negli `.html`, più `container.md` per la griglia |
| `marketing/` | il materiale di lavoro del lancio: l'analisi, il piano, il journal dell'outreach — la pagina pubblica «Results» è `results.html`, alla radice |
| `automations/` | la pagina dei case study e gli appunti di costruzione |
| `workflows/` | una cartella per automazione n8n: spec, export del canvas, pagine di bozza |
| `iterazioni/` | le esplorazioni grafiche: più varianti della stessa cosa, una sotto l'altra |
| `upwork/` | gli annunci analizzati prima di candidarsi, uno per pagina |
| `spiega/` | le guide che servono a chi legge il repo, non a chi visita il sito |
| `books/`, `articles/` | quello che ho letto e quello che ho scritto |

Le cartelle di lavoro sono fuori dai motori di ricerca con una regola
sola in `netlify.toml` (`for = "/<cartella>/*"`): è l'altro motivo per
cui il raggruppamento conviene. Il footer usa `href="/"` assoluto proprio
per restare identico a qualsiasi profondità.

## Varianti: dove sono finite

Le versioni alternative delle pagine non si cancellano. Ogni
esplorazione vive su un branch `feature/<nome>`, che resta anche dopo
che un'altra variante è andata in produzione.

| branch | cos'è |
|---|---|
| `feature/portfolio-themes` | portfolio a sezioni-tesi con filtro per tag in cima — la versione da cui sono nate le due seguenti |
| `feature/portfolio-filtro-sticky` | variante C: tiene sezioni **e** tag, aggiunge una pagebar sticky ("dove sono" + "cosa sto filtrando"), conteggi sui tag, `pushState` |
| `feature/portfolio-indice-primo` | variante D: l'indice apribile — **questa è quella in produzione**, già dentro `main` |
| `feature/step-cards-v2` | variante `sketch` delle step card, anche questa già in `main` |

Elenco sempre aggiornato: `git branch`. Il contesto di ogni variante
(perché è nata, cosa risolveva, cosa si è deciso) sta in `journal.md`.

### Rivedere una variante

**Attenzione: solo `main` è su GitHub.** Il remote
(`git@github.com:luc4leone/mucca-website-v2.git`) riceve il push di
`main`; i branch `feature/*` restano su questo disco e non tornano da un
clone. Finché la cartella è in Sync sono coperti dal backup della
cartella, niente di più — se una variante conta, va pushata anche lei.

Il modo consigliato è una worktree, non un checkout: apre la variante in
una **cartella sorella**, lasciando `main` intatto nella cartella
corrente. Così le due versioni si guardano affiancate, su due server
diversi.

```bash
git worktree add ../mucca-website-portfolio-filtro-sticky feature/portfolio-filtro-sticky
cd ../mucca-website-portfolio-filtro-sticky && python3 -m http.server 8767
# main resta su :8765, la variante va su :8767
```

Nessun `-b`: il branch esiste già, `-b` serve solo per crearne uno nuovo
(vedi `CLAUDE.md` per la convenzione dei nomi).

Quando hai finito:

```bash
cd /Users/luca/Sync/muccaWebsiteV2
git worktree remove ../mucca-website-portfolio-filtro-sticky   # il branch resta
```

Se preferisci comunque il checkout in questa cartella:

```bash
git checkout feature/portfolio-filtro-sticky
git checkout main    # per tornare
```

Due cose da sapere sul checkout:

- Sostituisce i file **nella cartella corrente**. Non puoi vedere due
  varianti insieme, ed è la ragione per cui qui si usano le worktree.
- **Un branch già aperto in una worktree non si può ri-checkoutare**:
  git risponde `fatal: … is already checked out at …`. `git worktree
  list` dice quali branch sono occupati e dove.

### Guide

- `spiega/spiega-worktree.md` — sintassi ed esempi completi
- `spiega/spiega-worktree-conversazione.md` — stesso contenuto in
  domanda/risposta
