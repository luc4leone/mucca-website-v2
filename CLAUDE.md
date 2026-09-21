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

## Convenzioni tipografiche

I file sono UTF-8: nel copy si scrive **il carattere vero**, mai l'entità HTML e mai
l'approssimazione da tastiera. `&rarr;` e `→` si vedono uguali nel browser, ma mescolarli
rende il sorgente impossibile da cercare e da correggere in blocco.

| Si scrive | Non si scrive |
| --- | --- |
| `→ ← ↑ ↓ ↗` | `->`, `&rarr;`, `&larr;`, `&#8599;` |
| `— –` | `&mdash;`, `&ndash;` |
| `…` | `&hellip;` |
| `• · › «  »` | `&bull;`, `&middot;`, `&rsaquo;`, `&laquo;` |
| `à è é ì ò ù È` | `&agrave;`, `&egrave;`, `&igrave;`… |
| `€ £ ° × ≠ ≤ ≥ © ®` | `&euro;`, `&deg;`, `&times;`, `&copy;`… |

Restano entità solo le quattro che l'HTML richiede per non confondere il markup —
`&amp;` `&lt;` `&gt;` `&quot;` — e `&nbsp;`, che da carattere vero sarebbe invisibile
nell'editor e indistinguibile da uno spazio normale.

**Apostrofi e virgolette restano fuori dalla regola, per ora.** L'apostrofo dritto (`'`)
va bene: nel repo ce ne sono decine nelle pagine già scritte, ed è quello che si digita.
Non c'è quindi da convertirlo in `’`, né viceversa — le due forme convivono. Il motivo per
cui non è una regola come le altre è che non è automatizzabile in sicurezza: dentro
attributi, stringhe JS e codice l'apice singolo è sintassi, e distinguerlo dall'apostrofo
non è una sostituzione meccanica. `tools/tipografia.py` non lo tocca di proposito.

Le **entità** di apostrofo e virgolette invece si risolvono come tutte le altre:
`&rsquo;` `&ldquo;` `&rdquo;` diventano `’` `“` `”`.

**Eccezione: dentro `<pre>`, `<code>`, `<script>`, `<style>`, i commenti HTML e i
blocchi/backtick del Markdown non si tocca niente.** Lì `->` è notazione e un'entità è
l'esempio che si sta mostrando. Stessa cosa per i file di terze parti (`assets/`,
`export-md/`) e per gli export di altri strumenti: il JSON di n8n in
`your-third-workflow/` non si tocca.

La regola è applicata da `tools/tipografia.py`, che salta da sé tutte le zone protette:

```bash
python3 tools/tipografia.py --check .   # elenca i file fuori regola, non scrive
python3 tools/tipografia.py file.html   # corregge sul posto
```

Lo stesso script gira da solo dopo ogni scrittura di `.html` o `.md`, tramite l'hook
`PostToolUse` in `.claude/settings.json`. L'hook è la rete di sicurezza, non la regola:
il copy va scritto già giusto.

## Design e identità visiva

- Nessun brand kit completo esistente.
- Asset parziali già disponibili: immagini, logo, font — incompleti, verificare cosa manca prima di darli per scontati.
- Riferimenti/ispirazioni da raccogliere man mano (link, screenshot) quando disponibili.
- **Il CSS ha quattro livelli e basta**: `css/tokens.css` (tutti i token, in tre blocchi: scale, palette, semantiche — e nessuna regola CSS), `css/base.css` (elementi HTML nudi), `css/layout.css` (`l-*`), `css/components/<nome>.css` (un componente per file, **completo**: forma e colore insieme). Un componente non ha mai stili in un altro file — è la regola che il refactor del 21 settembre 2026 ha ristabilito togliendo `theme-brand.css`. Un valore nuovo è un token in `tokens.css`, non un numero scritto nel componente.
- Convenzioni sul "contenitore" (variabili di tema, naming componenti, interfaccia via CSS custom property) in `design-system/design-system.md`, con i campioni visivi in `design-system/design-system.html`. I singoli componenti stanno nella stessa cartella e con la stessa divisione: `design-system/componenti.md` (uno per uno, token consumati, varianti) e `design-system/componenti.html` (la galleria). La griglia in `design-system/container.md`. Indice e criterio di divisione: `design-system/index.html`. Rispettarle quando si scrive CSS o markup di componenti.

## Dove va un file nuovo

Il repo raggruppa **per argomento, non per formato**: un `.md` e l'`.html` che ne nasce stanno nella stessa cartella. Ogni cartella ha un `index.html` che elenca cosa contiene e in che ordine si legge — quando aggiungi un file alla cartella, aggiungi la sua riga lì.

Le cartelle esistenti e cosa tengono insieme sono elencate in `README.md`, sezione «Una cartella per argomento». Due regole che non si vedono dall'elenco:

- **Una cartella di lavoro è `noindex` in blocco**, con una regola sola in `netlify.toml` (`for = "/<cartella>/*"`). Per questo una pagina pubblica non entra in una cartella di lavoro: «Results» resta alla radice e non va in `marketing/`, che contiene date, decisioni non annunciate e nomi di persone contattate. Si chiama `results.html` proprio per questo: da `marketing.html` a `/marketing` la distanza era una barra.
- **Spostare una pagina pubblica costa un redirect.** Se un indirizzo è già stato condiviso, il vecchio percorso resta valido con un `[[redirects]]` 301 in `netlify.toml` (esempio: `/automations.html` → `/automations/`). Le pagine riservate si spostano senza.

Il footer usa `href="/"` assoluto proprio per restare identico a qualsiasi profondità; gli altri percorsi in una pagina spostata vanno corretti a mano (`css/`, `assets/`, `js/` diventano `../css/` e così via).

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

- `spiega/spiega-worktree.md` — spiegazione tecnica completa (sintassi, esempi, pubblicazione varianti).
- `spiega/spiega-worktree-conversazione.md` — stesso contenuto in formato domanda/risposta.

## Footer

Il footer di chiusura è **identico in ogni pagina**, e si copia da `index.html` senza reinventarlo:

```html
<footer class="l-card__footer">
  <p>2026 • <a href="/">Mucca Design</a> di Luca Leone • VAT IT08200720962</p>
</footer>
```

Il nome porta alla home, e l'`href` è **assoluto dalla radice** (`/`), non relativo: è l'unico modo di tenere il footer identico ovunque, visto che da `books/` servirebbe `../index.html` e da `workflows/your-third-workflow/` `../../index.html`. Vale anche in locale, purché il server stia sulla radice del repo (`python3 -m http.server` da qui). Sta sempre fuori da `<main>`, subito prima degli `<script>`.

Se una pagina ha bisogno di contenuto proprio in fondo (il form di contatto in `master-ux-ui.html`, la nota sulle fonti in `offerta-mediaddress/`, link incrociati ad altre pagine), quello è contenuto di pagina: va **sopra** il footer, non al posto suo.

## Journal

`journal.md` documenta per l'utente le scelte fatte e da fare (struttura, decisioni di design, motivazioni), a differenza di questo file che sono istruzioni operative per Claude.

Quando si propone o si decide qualcosa di rilevante (struttura file, scelte di design, cambi di rotta), registrarlo in `journal.md`.

## Note operative per Claude

- Rispettare sempre la convenzione di naming worktree/branch sopra descritta quando si creano varianti.
- Il copy definitivo è quello in `content.md`: non inventare testi diversi senza allinearsi a quella fonte.
- Verificare quali asset (immagini, logo, font) sono effettivamente presenti nel repo prima di referenziarli nel codice.
