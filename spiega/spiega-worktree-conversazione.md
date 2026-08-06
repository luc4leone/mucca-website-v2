# Git Worktree: domande e risposte

## D: Cos'è git worktree?

R: Crea più cartelle collegate allo stesso repository.

- Ogni cartella ha il proprio branch checkato out.
- Tutte condividono la stessa cronologia (`.git`).
- Non serve clonare il repo più volte.
- Non serve fare `checkout`/`stash` continui per cambiare branch.

## D: Come si fa il setup iniziale?

R: `git init` e il primo commit si fanno solo nella cartella principale, una sola volta.

```bash
cd muccaWebsiteV2
git init
git add .
git commit -m "initial commit"
```

Le worktree condividono questo stesso `.git`. Non vanno reinizializzate una per una.

Serve almeno un commit prima di creare worktree: `git worktree add <path> -b <branch>` deve partire da un punto della cronologia per creare il nuovo branch.

## D: Come si creano le worktree?

R:

```bash
git worktree add ../mucca-website-hero-v2 -b feature/hero-v2
git worktree add ../mucca-website-hero-v3 -b feature/hero-v3
```

Risultato: cartelle sorelle indipendenti.

- `muccaWebsiteV2/`
- `mucca-website-hero-v2/`
- `mucca-website-hero-v3/`

Comandi utili:

```bash
git worktree list                              # elenca le worktree attive
git worktree remove ../mucca-website-hero-v2   # rimuove una worktree
```

## D: Se scrivo `git worktree add -b feature/hero-v2` senza cartella, che errore commetto?

R: Il path è obbligatorio, non l'hai fornito.

```
git worktree add [-b <nuovo-branch>] <path> [<commit-ish>]
```

- `<path>` è obbligatorio: dove creare la nuova cartella.
- `-b <branch>` è opzionale: crea anche un nuovo branch.

Cosa succede se ometti il path:

- Git legge `-b` e consuma `feature/hero-v2` come nome del branch.
- Non resta nessun argomento per `<path>`.
- Git risponde con un errore di utilizzo.

Perché il path serve sempre: una worktree è prima di tutto una cartella sul disco. Il branch è solo cosa checkare out dentro quella cartella.

Versione corretta:

```bash
git worktree add ../mucca-website-hero-v2 -b feature/hero-v2
```

## D: Cos'è `<commit-ish>` nella sintassi del comando?

R: Argomento opzionale che indica da quale punto della cronologia partire.

- Può essere un branch, un tag, un hash di commit, o riferimenti relativi (es. `HEAD~3`).
- Se omesso, git parte da `HEAD` (l'ultimo commit del branch corrente).

Esempi:

- Partire da un altro branch, non da quello corrente:
  ```bash
  git worktree add ../mucca-website-hero-v2 -b feature/hero-v2 main
  ```
- Partire da un commit specifico:
  ```bash
  git worktree add ../mucca-website-old -b feature/old-version a1b2c3d
  ```
- Checkare out un branch già esistente, senza crearne uno nuovo (si omette `-b`):
  ```bash
  git worktree add ../mucca-website-hero-v2 feature/hero-v2
  ```
  Qui `feature/hero-v2` è il `<commit-ish>`: dice a git quale branch esistente mettere in quella cartella.

In sintesi:

- `-b <branch>` → nome del nuovo branch da creare.
- `<commit-ish>` → punto di partenza (con `-b`) oppure branch/commit da checkare out (senza `-b`).

## D: Perché è utile per iterare su componenti UI?

R:

- **Confronto fianco a fianco**: più varianti dello stesso componente aperte in tab diverse del browser, in tempo reale.
- **Preservare una versione buona**: una worktree resta ferma come baseline, mentre in un'altra si sperimenta liberamente.
- **Nessun context-switch costoso**: niente riavvii di server o invalidazione di cache dovuti a cambio branch nella stessa cartella.
- **Sperimentazione parallela con agenti**: ogni worktree può essere assegnata a un processo o agente diverso, senza conflitti sugli stessi file.

## D: Come si usa con HTML + CSS + JS vanilla?

R: Ogni worktree ha la sua copia dei file. Basta lanciare un server statico diverso in ognuna.

```bash
# worktree principale
cd muccaWebsiteV2
python3 -m http.server 8000

# variante 1
cd ../mucca-website-hero-v2
python3 -m http.server 8001

# variante 2
cd ../mucca-website-hero-v3
python3 -m http.server 8002
```

Poi si aprono in tab separate:

- `localhost:8000`
- `localhost:8001`
- `localhost:8002`

Accorgimenti:

- Con server live-reload (`live-server`, `browser-sync`): specificare sempre una porta diversa per ognuno, altrimenti vanno in conflitto sulla porta di default.
- Controllare che non ci siano path hardcoded (es. `localhost:8000` scritto nel codice) in service worker o chiamate `fetch`.

## D: Esempio pratico — sto disegnando un side-panel e voglio iterare su una variante modale, come procedo?

R: Passo per passo.

**1. Committa la versione attuale**

```bash
cd muccaWebsiteV2
git add .
git commit -m "side panel per il form"
```

Questo è il punto di riferimento stabile.

**2. Crea una worktree per la variante**

```bash
git worktree add ../mucca-website-modal-panel -b feature/modal-panel
```

- `../mucca-website-modal-panel` → cartella sorella, copia indipendente dei file.
- `-b feature/modal-panel` → nuovo branch, parte da `HEAD` (il commit del side-panel).

**3. Modifica la variante nella nuova cartella**

```bash
cd ../mucca-website-modal-panel
```

Qui sostituisci il side-panel con il modale. La cartella originale resta intatta.

**4. Lancia due server, uno per cartella**

```bash
# terminale 1: side-panel (originale)
cd muccaWebsiteV2
python3 -m http.server 8000

# terminale 2: modale (variante)
cd ../mucca-website-modal-panel
python3 -m http.server 8001
```

**5. Confronta in tab separate**

- `localhost:8000` → side-panel
- `localhost:8001` → modale

Le due versioni vivono fianco a fianco, senza rischiare di modificare l'una lavorando sull'altra.

**6. Dopo la decisione**

Se scegli il modale, lo porti su `main`:

```bash
cd muccaWebsiteV2
git merge feature/modal-panel
```

Poi rimuovi la worktree che non serve più:

```bash
git worktree remove ../mucca-website-modal-panel
```

Se invece tieni il side-panel, rimuovi semplicemente la worktree del modale senza fare merge — il branch resta comunque nella cronologia, recuperabile in futuro.

## D: Posso usare git worktree anche per vedere 2 temi diversi in 2 tab del browser allo stesso tempo?

R: Sì, stesso identico meccanismo — anzi è un caso particolarmente pulito, perché cambiare tema tocca solo `css/tokens.css`, non markup né componenti (vedi `design-system.md`).

```bash
# worktree per il tema B, parte dal commit attuale (tema A)
git worktree add ../mucca-website-tema-scuro -b feature/tema-scuro
```

Nella nuova cartella modifichi solo `css/tokens.css`, lasciando intatto tutto il resto.

```bash
# terminale 1: tema A (originale)
cd muccaWebsiteV2
python3 -m http.server 8000

# terminale 2: tema B (variante)
cd ../mucca-website-tema-scuro
python3 -m http.server 8001
```

Confronto in tab separate: `localhost:8000` vs `localhost:8001`.

Essendo il cambio isolato a un solo file, il diff tra le due worktree è minimo e facile da leggere:

```bash
git diff main feature/tema-scuro -- css/tokens.css
```

Utile per capire esattamente quali token sono cambiati tra le due varianti — cosa che con un componente o un layout intero sarebbe più rumorosa da leggere.

## D: Sono un designer e voglio documentare i miei esperimenti per il cliente. Se tengo il modale su main, posso pubblicare anche il side-panel scartato?

R: Sì. Un branch è solo un'etichetta su un commit: il merge in `main` non lo cancella. Se non elimini il branch scartato, resta disponibile per sempre nel repo.

```bash
git branch    # elenca tutti i branch, incluso quello scartato
```

Per condividerlo:

- **Programmatori**: fai `git push` del branch su un remote (GitHub, GitLab). Possono fare checkout e vedere codice, diff, cronologia.
  ```bash
  git push origin feature/side-panel
  ```
- **Cliente**: probabilmente vuole solo un link da aprire nel browser, non un repo da clonare. Serve un deploy live separato per branch:
  - **Netlify/Vercel**: branch deploy automatico, un URL univoco per ogni branch pushato.
  - **GitHub Pages**: pubblica branch diversi su path diversi dello stesso sito (es. `/side-panel/`, `/modale/`).

GitHub Pages non lo fa automaticamente: pubblica **un solo branch/cartella** come sito. Per ottenere `/side-panel/` e `/modale/` bisogna creare le sottocartelle a mano, dentro il branch pubblicato:

```bash
mkdir -p side-panel modale                             # crea entrambe le sottocartelle in un colpo solo (-p: nessun errore se esistono già)

cp -r ../mucca-website-side-panel/* side-panel/         # copia tutto il contenuto della worktree side-panel dentro la sottocartella
cp -r ../mucca-website-modal-panel/* modale/            # copia tutto il contenuto della worktree modale dentro la sottocartella

git add side-panel modale                               # stage delle due sottocartelle appena popolate
git commit -m "pubblica varianti side-panel e modale"    # commit sul branch che GitHub Pages pubblica (es. gh-pages)
git push origin gh-pages                                # push: da qui GitHub Pages rigenera il sito live
```

Netlify/Vercel invece lo fanno da soli: un URL per branch, senza dover copiare nulla.

Con i link live pronti, puoi creare una pagina di raccolta (Markdown o HTML) con i link alle varianti, screenshot e note sul perché hai scelto una piuttosto che l'altra.

## D: E se mi dimentico di creare un branch prima di iniziare a lavorare sul side-panel, e me ne accorgo solo a lavoro finito?

R: Nessun problema, a patto di accorgertene prima di iniziare l'iterazione successiva (es. il modale).

Il lavoro è comunque salvato nei commit di `main`, manca solo l'etichetta separata. Puoi crearla ora, retroattivamente:

```bash
git branch feature/side-panel
```

Questo comando crea un branch che punta allo stesso commit attuale di `main` — non sposta nulla, non riscrive la cronologia.

Perché funziona solo adesso, e non più tardi:

- Finché non hai iniziato l'iterazione successiva, `main` e `feature/side-panel` puntano allo stesso commit → nessuna perdita.
- Se avessi già iniziato a modificare il codice per il modale direttamente su `main`, dovresti separare a posteriori i commit delle due varianti (possibile con `rebase`/`cherry-pick`, ma più delicato).

Procedura completa da questo punto:

```bash
git branch feature/side-panel                                        # etichetta il lavoro già fatto
git push origin feature/side-panel                                    # pubblicalo per documentazione
git worktree add ../mucca-website-modal-panel -b feature/modal-panel   # parti con la nuova iterazione
```

Per il futuro: creare il branch **prima** di iniziare un esperimento evita questo passaggio di recupero.
