# Master UX/UI Design — landing page

## Panoramica

Doppio scopo del repo:

- Landing page che vende il corso **"Master UX/UI Design"** — tagline: *"Diventa Design Engineer"*.
- Prototipo del workflow di progettazione UI con AI dell'autore (design + iterazione assistita da Claude Code).

Pubblico target del corso: junior designer già al lavoro, o appena usciti da un corso base, in cerca di occupazione.

## Stack tecnico

- Solo HTML/CSS/JS vanilla. Nessun framework.
- Nessun build step. File statici.
- Server locale: `python3 -m http.server <porta>`.
- Deployment: Netlify o Vercel (branch deploy automatico per confrontare varianti live).

Non introdurre framework o build tool senza richiesta esplicita.

## Struttura pagina

Non ancora decisa (single-page vs multi-page) — valutare in base a come si evolve il contenuto.

Sezioni previste:

- Hero
- Programma / curriculum
- Prezzo
- Testimonianze
- Bio dell'istruttore
- "Come insegno"
- Lead magnet (mini corso gratis)
- FAQ
- CTA
- Iscrizione newsletter

## Contenuto e copy

- I testi (in bozza) vivono in `content.md`: è la fonte di verità per il copy.
- Se il copy cambia, aggiornare `content.md` — non lasciarlo disallineato dall'HTML.

## Design e identità visiva

- Nessun brand kit completo esistente.
- Asset parziali già disponibili: immagini, logo, font — incompleti, verificare cosa manca prima di darli per scontati.
- Riferimenti/ispirazioni da raccogliere man mano (link, screenshot) quando disponibili.

## Workflow di iterazione (worktree)

Il repo è anche il banco di prova del workflow di progettazione AI-assisted dell'autore: le varianti UI si esplorano con `git worktree`, non con branch checkout nella stessa cartella.

Convenzione fissa per ogni variante:

- cartella sorella: `../mucca-website-<nome-variante>`
- branch: `feature/<nome-variante>`

```bash
git worktree add ../mucca-website-hero-v2 -b feature/hero-v2
```

Prima di iniziare una nuova variante: committare lo stato corrente su `main`, poi creare la worktree. Non sviluppare esperimenti direttamente su `main`.

Guide di riferimento nel repo:

- `spiega-worktree.md` — spiegazione tecnica completa (sintassi, esempi, pubblicazione varianti).
- `spiega-worktree-conversazione.md` — stesso contenuto in formato domanda/risposta.

## Note operative per Claude

- Rispettare sempre la convenzione di naming worktree/branch sopra descritta quando si creano varianti.
- Il copy definitivo è quello in `content.md`: non inventare testi diversi senza allinearsi a quella fonte.
- Verificare quali asset (immagini, logo, font) sono effettivamente presenti nel repo prima di referenziarli nel codice.
